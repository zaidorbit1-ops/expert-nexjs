create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  display_name text not null default '',
  role text not null default 'disabled' check (role in ('admin', 'disabled')),
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.authors (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  feature_image text,
  category_id uuid references public.categories (id) on delete set null,
  author_id uuid not null references public.authors (id) on delete restrict,
  author_name text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  tags text[] not null default '{}',
  meta_title text not null default '',
  meta_description text not null default '',
  meta_keywords text not null default '',
  canonical_url text not null default '',
  views bigint not null default 0 check (views >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_published_at_idx
  on public.posts (published_at desc)
  where status = 'published';
create index if not exists posts_author_id_idx on public.posts (author_id);
create index if not exists posts_category_id_idx on public.posts (category_id);
create index if not exists authors_name_idx on public.authors (name);

create or replace function public.sync_post_author_name()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  update public.posts
  set author_name = new.name
  where author_id = new.id;
  return new;
end;
$$;

drop trigger if exists sync_post_author_name on public.authors;
create trigger sync_post_author_name
  after update of name on public.authors
  for each row execute function public.sync_post_author_name();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.email is null then
    return new;
  end if;
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    lower(new.email),
    coalesce(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do update
    set email = excluded.email,
        display_name = coalesce(nullif(excluded.display_name, ''), public.profiles.display_name);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert or update of email, raw_user_meta_data on auth.users
  for each row execute function public.handle_new_user();

insert into public.profiles (id, email, display_name)
select
  id,
  lower(email),
  coalesce(raw_user_meta_data ->> 'display_name', raw_user_meta_data ->> 'full_name', '')
from auth.users
where email is not null
on conflict (id) do update
  set email = excluded.email,
      display_name = coalesce(nullif(excluded.display_name, ''), public.profiles.display_name);

create or replace function public.current_role()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select role from public.profiles where id = (select auth.uid());
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_role() = 'admin', false);
$$;

create or replace function public.can_write_posts()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_role() = 'admin', false);
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.authors enable row level security;
alter table public.posts enable row level security;

grant select on public.profiles to authenticated;
grant select on public.categories to anon, authenticated;
grant insert, update, delete on public.categories to authenticated;
grant select on public.authors to anon, authenticated;
grant insert, update, delete on public.authors to authenticated;
grant select, insert, update, delete on public.posts to authenticated;
grant select on public.posts to anon;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()));

drop policy if exists "Categories are public" on public.categories;
create policy "Categories are public"
  on public.categories for select to anon, authenticated using (true);
drop policy if exists "Admins manage categories" on public.categories;
create policy "Admins manage categories"
  on public.categories for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Authors are public" on public.authors;
create policy "Authors are public"
  on public.authors for select to anon, authenticated using (true);
drop policy if exists "Admins manage authors" on public.authors;
create policy "Admins manage authors"
  on public.authors for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Published posts are public" on public.posts;
create policy "Published posts are public"
  on public.posts for select to anon, authenticated
  using (status = 'published' and published_at is not null and published_at <= now());
drop policy if exists "Writers can read dashboard posts" on public.posts;
drop policy if exists "Admins can read dashboard posts" on public.posts;
create policy "Admins can read dashboard posts"
  on public.posts for select to authenticated
  using ((select public.is_admin()));
drop policy if exists "Writers create own posts" on public.posts;
drop policy if exists "Admins create posts" on public.posts;
create policy "Admins create posts"
  on public.posts for insert to authenticated
  with check ((select public.is_admin()));
drop policy if exists "Writers update own posts" on public.posts;
drop policy if exists "Admins update posts" on public.posts;
create policy "Admins update posts"
  on public.posts for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
drop policy if exists "Writers delete own posts" on public.posts;
drop policy if exists "Admins delete posts" on public.posts;
create policy "Admins delete posts"
  on public.posts for delete to authenticated
  using ((select public.is_admin()));

create or replace function public.increment_post_views(post_id uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.posts
  set views = views + 1
  where id = post_id
    and status = 'published'
    and published_at is not null
    and published_at <= now();
$$;
revoke all on function public.increment_post_views(uuid) from public;
grant execute on function public.increment_post_views(uuid) to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-images', 'blog-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Blog images are public" on storage.objects;
create policy "Blog images are public"
  on storage.objects for select
  using (bucket_id = 'blog-images');
drop policy if exists "Writers upload blog images" on storage.objects;
drop policy if exists "Admins upload blog images" on storage.objects;
create policy "Admins upload blog images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'blog-images' and (select public.is_admin()));
drop policy if exists "Writers update blog images" on storage.objects;
drop policy if exists "Admins update blog images" on storage.objects;
create policy "Admins update blog images"
  on storage.objects for update to authenticated
  using (bucket_id = 'blog-images' and (select public.is_admin()))
  with check (bucket_id = 'blog-images' and (select public.is_admin()));
drop policy if exists "Writers delete blog images" on storage.objects;
drop policy if exists "Admins delete blog images" on storage.objects;
create policy "Admins delete blog images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'blog-images' and (select public.is_admin()));

-- Bootstrap the first administrator after creating their user under
-- Supabase Dashboard > Authentication > Users:
-- update public.profiles set role = 'admin' where email = 'you@example.com';
