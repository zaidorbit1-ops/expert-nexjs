# Supabase and dashboard setup

The Next.js application uses Supabase for blog data, email OTP sign-in, and
featured image storage; a separate Express/MySQL server is no longer used.

1. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
   `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.
2. Run [`supabase/schema.sql`](./supabase/schema.sql) once in the Supabase SQL
   Editor.
   For an existing blog database, run
   [`supabase/migrations/20261013_authors_are_editorial_names.sql`](./supabase/migrations/20261013_authors_are_editorial_names.sql)
   instead to add the author-name list and migrate existing article bylines.
3. Add your email under Supabase **Authentication → Users** and promote it to
   the initial administrator with the SQL statement documented in the schema.
4. Disable public sign-ups in Supabase Auth settings so only Auth users you
   explicitly add or invite can request a code.
5. Configure Supabase email OTP templates to include `{{ .Token }}`, and allow
   `http://localhost:3000/admin/login` in Authentication URL settings.
6. Run `npm run dev`, visit `/admin/login`, and verify your emailed OTP.

The admin dashboard supports post drafts/publishing, formatted rich-text
authoring with Markdown storage, featured-image uploads, SEO metadata,
categories, and author display names. Author names are editorial bylines only;
they do not create Supabase accounts or login access. Administrator access
continues to be controlled by the `profiles.role` field and Supabase RLS.

The contact/order form proxy is retained separately. Configure
`CRM_WEBSITE_ID` and `CRM_INTEGRATION_SECRET` to keep forwarding those forms to
the existing CRM.
