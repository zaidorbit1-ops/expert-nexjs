begin;

create table if not exists public.authors (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.authors enable row level security;
grant select on public.authors to anon, authenticated;
grant insert, update, delete on public.authors to authenticated;

drop policy if exists "Authors are public" on public.authors;
create policy "Authors are public"
  on public.authors for select to anon, authenticated using (true);
drop policy if exists "Admins manage authors" on public.authors;
create policy "Admins manage authors"
  on public.authors for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

alter table public.posts drop constraint if exists posts_author_id_fkey;

insert into public.authors (name)
select distinct coalesce(
  nullif(btrim(p.author_name), ''),
  nullif(btrim(profile.display_name), ''),
  profile.email,
  'Expert Assignment Writers'
)
from public.posts p
left join public.profiles profile on profile.id = p.author_id
on conflict (name) do nothing;

update public.posts p
set author_id = author.id,
    author_name = author.name
from public.authors author
where author.name = coalesce(
    nullif(btrim(p.author_name), ''),
    (
      select coalesce(nullif(btrim(profile.display_name), ''), profile.email)
      from public.profiles profile
      where profile.id = p.author_id
    ),
    'Expert Assignment Writers'
  );

alter table public.posts
  add constraint posts_author_id_fkey
  foreign key (author_id) references public.authors (id) on delete restrict;

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

alter table public.profiles alter column role set default 'disabled';
update public.profiles set role = 'disabled' where role = 'writer';
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check check (role in ('admin', 'disabled'));

create or replace function public.can_write_posts()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_role() = 'admin', false);
$$;

drop policy if exists "Writers can read dashboard posts" on public.posts;
drop policy if exists "Admins can read dashboard posts" on public.posts;
create policy "Admins can read dashboard posts"
  on public.posts for select to authenticated using ((select public.is_admin()));
drop policy if exists "Writers create own posts" on public.posts;
drop policy if exists "Admins create posts" on public.posts;
create policy "Admins create posts"
  on public.posts for insert to authenticated with check ((select public.is_admin()));
drop policy if exists "Writers update own posts" on public.posts;
drop policy if exists "Admins update posts" on public.posts;
create policy "Admins update posts"
  on public.posts for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
drop policy if exists "Writers delete own posts" on public.posts;
drop policy if exists "Admins delete posts" on public.posts;
create policy "Admins delete posts"
  on public.posts for delete to authenticated using ((select public.is_admin()));

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

commit;
