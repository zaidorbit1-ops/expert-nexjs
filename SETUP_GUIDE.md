# Project setup

## Requirements

- Node.js 20.9 or higher
- A Supabase project

## First-time setup

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and set the Supabase project URL, anon
   key, and service-role key.
3. Run [`supabase/schema.sql`](./supabase/schema.sql) in Supabase SQL Editor.
4. Add your email in Supabase Authentication → Users and promote it to admin
   using the SQL note at the bottom of the schema file.
5. Disable public user sign-ups in Supabase Auth settings. The dashboard login
   only requests OTP for existing Supabase Auth accounts.
6. Configure Supabase email OTP template to show `{{ .Token }}` and allow the
   local `/admin/login` redirect URL.
7. Run `npm run dev` and open `http://localhost:3000`.

Keep `.env.local` private. `SUPABASE_SERVICE_ROLE_KEY` is a privileged secret;
it must never be exposed as a `NEXT_PUBLIC_` variable.

## Main areas

- Next.js routes and API: `app/`
- Supabase schema and Row Level Security: `supabase/schema.sql`
- Supabase clients and blog queries: `lib/`
- Blog dashboard: `src/components/admin/AdminDashboard.jsx`
- Public site UI: `src/components/` and `src/site-pages/`
- Global styles and theme: `src/index.css` and `tailwind.config.js`
