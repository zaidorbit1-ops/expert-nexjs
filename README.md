# Expert Assignment Writers UK

This is a Next.js App Router site. Supabase provides the blog database,
email-OTP authentication, and featured-image storage. The `/admin` dashboard
lets administrators create and edit articles, categories, and public author
bylines. Author bylines are names only; they do not have accounts or login access.

## Setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and set the Supabase project URL, anon
   key, and service-role key. The service-role key is server-only; never expose
   it to the browser or commit it.
3. Open the Supabase SQL Editor and run [`supabase/schema.sql`](./supabase/schema.sql).
   It creates the profiles, categories, authors, posts, RLS policies, view
   counter, and public image bucket. It also adds profile records for existing
   Auth users. If the blog schema is already installed, apply
   [`supabase/migrations/20261013_authors_are_editorial_names.sql`](./supabase/migrations/20261013_authors_are_editorial_names.sql)
   instead; it migrates existing post bylines to the new authors table.
4. In Supabase **Authentication → Users**, make sure your own email is present.
   Promote your account to the initial administrator by running the final
   `UPDATE public.profiles ...` statement at the bottom of `supabase/schema.sql`
   with your email.
5. In **Authentication → Settings**, disable public sign-ups. Users must be
   added/invited to the Supabase Auth user list before they can use OTP login.
   The login screen also requests OTP with account creation disabled.
6. In **Authentication → URL Configuration**, set the local Site URL to
   `http://localhost:3000` and allow `/admin/login` as a redirect URL.
7. In **Authentication → Email Templates**, make sure the email OTP template
   includes `{{ .Token }}` so the six-digit code can be entered on the login
   screen. Supabase OTP delivery also depends on your project’s email settings.
8. Set `CRM_WEBSITE_ID` and `CRM_INTEGRATION_SECRET` in `.env.local` if website
   contact/order forms should continue forwarding to the existing CRM.
9. Run `npm install` and `npm run dev`, then open `http://localhost:3000`.

Only existing Supabase Auth users can request an OTP; the sign-in flow does not
create accounts. Only administrator accounts can sign in to the CMS. Authors
are display names managed by an administrator and are not Auth users.

## Writing a blog

Visit `/admin/login`, request an email code, and verify it. In the dashboard,
choose **Write an article** to enter a title, URL slug, excerpt, formatted
article content, category, author name, tags, featured image, and SEO metadata.
Text pasted from Word or Google Docs keeps supported formatting; content is
stored as Markdown for the public renderer. Save as a draft or publish. A
published article is available at `/blog/{slug}` with metadata rendered
server-side.

Featured images use the Supabase Storage `blog-images` bucket. Blog article
content is Markdown and is rendered with unsafe raw HTML disabled.

## Commands

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm start` serves the production build.
- `npm test -- --watchAll=false` runs the existing form test.

## Existing content and uploads

The former MySQL connection, schema, and Express API have been removed. This
switch does not automatically copy existing MySQL articles or local image files
into Supabase. Export/import any existing content separately, then upload
featured images to Supabase Storage from the dashboard.
