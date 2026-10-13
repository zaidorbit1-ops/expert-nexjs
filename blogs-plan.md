# Implementation Plan: Complete Blog CMS for Expert Assignment Writers

## 1. Project Overview

**Website:** Expert Assignment Writers  
**Framework:** Existing Next.js application  
**Database:** Supabase PostgreSQL  
**Authentication:** Supabase Email OTP  
**File Storage:** Supabase Storage  
**Target Market:** United Kingdom

### Objective

Implement a complete blog management system within the existing Expert Assignment Writers website, including:

- A private, authenticated blog administration dashboard.
- Supabase-powered database and authentication.
- Category and author management.
- A complete blog creation and editing system.
- A rich text editor with formatted copy-and-paste support.
- Featured image uploads.
- Blog publishing, editing, and deletion.
- Public blog listing and article detail pages.
- Automatic Table of Contents generation.
- On-page SEO and technical SEO.
- Blog analytics.
- Database migrations, security policies, and setup documentation.

This must be a fully functional implementation, not merely a UI prototype or a collection of disconnected pages.

## 2. Mandatory Existing UI/UX Guidelines

The entire website has already undergone a UI/UX redesign.

The existing project contains the following design reference files:

- `memory.md`
- `UI/UX MD` (the existing UI/UX Markdown reference file)

**Before implementing anything, locate and read both files in full.** If the actual filename or location differs, inspect the project repository and identify the correct files. Do not assume their contents or create replacement design rules.

These files are the authoritative references for the project's existing design system, visual direction, component conventions, layout patterns, typography, spacing, colors, and other documented UI/UX requirements.

### Mandatory requirements

- Follow the documented UI/UX exactly for the public blog listing and blog detail pages.
- Follow the same established design system and applicable component conventions for the administration dashboard.
- Treat the admin dashboard as part of the same redesigned website, not as an unrelated third-party admin template.
- Reuse existing layouts, components, design tokens, and patterns wherever appropriate.
- Maintain consistency across the public website, blog pages, login screen, editor, and administration dashboard.
- Do not independently invent a new design system or introduce arbitrary colors, typography, spacing, components, or visual effects.
- Do not undo or modify the existing redesign unnecessarily.
- If a requirement is not covered by the reference files, extend the existing design system consistently instead of introducing a conflicting style.
- Keep dashboard-specific and blog-specific CSS appropriately scoped to prevent conflicts with the existing website theme.

The design references govern presentation. This implementation plan governs functionality and technical architecture.

## 3. Inspect the Existing Project Before Implementation

Before making changes:

1. Inspect the existing Next.js version, routing structure, and application architecture.
2. Read `memory.md` and the UI/UX Markdown reference file.
3. Review existing layouts, components, CSS, design tokens, and shared utilities.
4. Identify the current website routes and existing service pages.
5. Check existing authentication, backend integrations, environment configuration, and dependencies.
6. Determine the appropriate Supabase integration for the current application architecture.

Implement the blog system within the existing project. Do not unnecessarily rebuild the website, replace its routing architecture, or break existing functionality.

## 4. Supabase Integration and Database Migrations

Use Supabase PostgreSQL as the primary database for blog content and related records.

Implement Supabase using appropriate server-side and browser clients compatible with the installed Next.js version.

### Required database tables

**A. Categories**

- `id`
- `name`
- `slug`
- `description`
- `created_at`
- `updated_at`

Support creating, editing, listing, searching, and safely deleting categories. Category slugs must be unique.

**B. Authors**

- `id`
- `name`
- `slug`
- `biography`
- `avatar_url`
- `designation`
- `created_at`
- `updated_at`

Support author management and author selection within the blog editor.

**C. Blogs**

- `id`
- `title`
- `slug`
- `excerpt`
- `content`
- `featured_image_url`
- `featured_image_alt`
- `category_id`
- `author_id`
- `status`
- `published_at`
- `meta_title`
- `meta_description`
- `canonical_url`
- `created_at`
- `updated_at`

Use appropriate foreign keys, indexes, unique constraints, validation, and timestamps.

The `status` field must support at least `draft` and `published`. Published content must have a valid unique slug.

Choose and document a consistent storage format for rich text content, such as structured editor JSON or sanitized HTML.

**D. Blog Analytics**

Implement a suitable analytics schema for recording blog page views, privacy-conscious unique visits, timestamps, and available traffic-source information.

Keep analytics records separate from editorial content and avoid collecting unnecessary personal information.

### Migration deliverables

Provide a complete, ordered Supabase SQL migration file or migration set that includes:

- Required tables.
- Foreign keys and constraints.
- Indexes.
- Appropriate database functions or triggers where necessary.
- Row Level Security (RLS) policies.
- Storage policies where supported by SQL.
- Any required analytics database objects.

Include setup instructions explaining how to apply the migration through the Supabase SQL Editor or the project's migration workflow.

The migration must be repeatable where practical and must not destructively overwrite existing production data.

Do not assume that creating tables automatically configures authentication, email delivery, or Storage access. Document any dashboard configuration that must be completed separately.

## 5. Supabase Email OTP Authentication

Create a dedicated login flow for authorized blog administrators.

### Authentication workflow

1. The administrator enters an email address.
2. Supabase sends a one-time code.
3. The administrator enters the code.
4. Supabase verifies the code and establishes an authenticated session.
5. The administrator is redirected to the protected dashboard.

Requirements:

- Use Supabase email OTP authentication.
- Support invalid, expired, and incorrect codes.
- Provide resend-code functionality with appropriate cooldowns.
- Handle loading, success, and error states.
- Support session persistence and logout.
- Protect dashboard pages and server-side mutations.
- Restrict access to explicitly authorized administrator accounts.

This is a private CMS. Do not allow unrestricted public registration or grant administrative access simply because someone can verify an email address.

Provide the necessary Supabase Auth configuration instructions, including any email-template or OTP settings required for the chosen authentication flow.

## 6. Supabase Storage for Featured Images

Use a dedicated Supabase Storage bucket for blog featured images.

**Required image dimensions: 1200 × 630 pixels.**

Implement:

- Image upload and preview.
- Image replacement and removal.
- Image type and size validation.
- Appropriate Storage access policies.
- Unique storage paths.
- Image URL persistence in the database.
- Featured-image alt text.
- Safe cleanup of unused images.
- Appropriate responsive image rendering on the public website.

Preserve the image aspect ratio. Provide a crop or adjustment mechanism when an uploaded image does not match the required dimensions.

Include bucket configuration and relevant Storage policies in the migration or documented setup steps.

## 7. Blog Categories Management

Create a functional Categories section within the admin dashboard.

Features:

- List categories.
- Create categories.
- Edit names, slugs, and descriptions.
- Search and sort records.
- Show associated blog counts.
- Prevent duplicate slugs.
- Prevent accidental deletion of categories currently assigned to articles, or provide a safe reassignment workflow.

Connect every action to Supabase. Do not use hardcoded example records as production data.

## 8. Blog Management and Rich Text Editor

Create a Blogs section with a dedicated listing page and an Add New Blog action.

The listing must support:

- Search by title.
- Filtering by status, category, and author.
- Sorting by creation date and last update.
- Pagination.
- Draft and published status.
- Editing, previewing, publishing, unpublishing, and deleting articles.

Use server-side pagination and filtering where appropriate.

### Blog editor fields

Include:

- Title.
- URL slug.
- Excerpt.
- Rich text content.
- Featured image.
- Image alt text.
- Category dropdown.
- Author dropdown.
- Draft or published status.
- Publication date.
- SEO title.
- Meta description.
- Canonical URL where necessary.

### Rich text editor

Use a mature editor such as Tiptap with suitable extensions, or another compatible, maintained rich text editor.

Support:

- H2, H3, and H4 headings.
- Paragraphs.
- Bold, italic, underline, and strikethrough.
- Ordered and unordered lists.
- Nested lists where supported.
- Text alignment.
- Hyperlinks.
- Blockquotes.
- Tables.
- Images where appropriate.
- Horizontal dividers.
- Undo and redo.
- Clear formatting.

### Formatted copy-and-paste support

This is a mandatory requirement.

When content is pasted from Microsoft Word, Google Docs, or a website, preserve supported formatting, including headings, paragraphs, bold text, lists, links, alignment, and tables where possible.

Implement appropriate clipboard parsing, HTML sanitization, and unsupported-markup handling.

Pasted content must retain its meaningful structure both inside the editor and after publication. Do not reduce formatted documents to a single plain-text paragraph.

Test formatting preservation using representative content from Word, Google Docs, and web pages.

### Save and publish workflow

- Save Draft.
- Publish.
- Update an existing article.
- Preview the public-facing article.
- Show save status and validation errors.
- Warn about unsaved changes.
- Prevent duplicate submissions.
- Preserve