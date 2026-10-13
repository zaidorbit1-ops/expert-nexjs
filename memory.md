# Home Page UI/UX Completion Notes

## Status

The Home page UI/UX rebuild is complete. The existing Next.js routes and SEO metadata logic were left in place. Only the Home page was rebuilt; other public pages retain their existing page content while using the new shared site header and footer.

## Design direction

- Premium, editorial academic-support style, designed mobile-first.
- Confirmed brand colors: navy `#0D3055`, deeper blues `#082438` and `#081829`, gold `#CFA049` and `#C89545`.
- Neutral backgrounds, borders and text colors are derived neutrals.
- Outfit headings and Manrope body text are loaded with `next/font`.
- Light theme only; the dark-theme toggle and dark-theme token overrides were removed.
- Motion uses Framer Motion and respects `prefers-reduced-motion`.
- Focus rings, semantic headings, labeled controls and keyboard-accessible menus/dialogs are included.

## Home page structure

The page is composed in this order:

1. Hero
2. University trust bar
3. Animated stats
4. Subject-service cards
5. Academic support features
6. Simple 4-Step Process
7. Home academic guidance content
8. Student testimonials carousel
9. FAQ accordion
10. Shared CTA banner

Existing Home copy, testimonial text, FAQ copy and step descriptions were carried over. The Home guidance copy remains in its existing content source and is presented through a new visual treatment.

## Graphical elements

- **Hero:** An original CSS/Lucide illustration represents an assignment brief, outline, evidence, referencing, and a book/draft underneath. It uses layered paper, checkmarks, status labels, navy/gold accents and restrained parallax/pointer depth; it does not depend on an external stock photo.
- **Page-specific artwork:** Home and About retain their own distinct hero visuals. The Services hero uses a subject-network diagram connecting a brief to representative study areas; do not reuse the Home, About, or Services hero artwork on future pages. Design each upcoming page's illustration around that page's subject and message. Keep illustrative labels and content inside the main graphic; do not add floating overlay cards around it.
- **Accounting page:** The hero uses its own ledger/trial-balance illustration. Its closing accuracy strip must remain visible within the white panel at all responsive sizes. Accounting guidance is presented as three connected stages before the accuracy section, not appended after the FAQ.
- **Business Management page:** Business guidance is presented as a three-stage card sequence after management coverage and before the workflow. Avoid the old repeated “Business guidance · 01/02/03” headings.
- **Process section:** Four student-facing stages are shown as connected steps with custom miniature illustrations for submitting a brief, matching an expert, reviewing work, and final delivery. The connector draws into view; the cards stack on smaller screens.
- **Service and feature cards:** Shared card styling with restrained hover elevation, pointer tilt, and a soft glare effect where enabled.
- **Statistics:** Counters animate once when scrolled into view.
- **Testimonials:** Embla carousel with keyboard-operable previous/next buttons; no forced autoplay.
- **FAQ:** Keyboard-operable accordion with animated expansion.

## Shared UI and behavior

- Replaced the public-site header/footer and enquiry popup in `app/site-chrome.js`.
- The fixed header has a highly opaque, strong-blur white background so the logo remains clear while scrolling; the logo has no separate white tile.
- Desktop subject navigation opens a designed mega-menu on hover, focus, or click. Mobile navigation has its own subject list.
- WhatsApp and “Start your brief” actions appear together in the desktop header.
- Footer subject links use a consistent grid; the address is one line; the phone row has a phone icon.
- The enquiry dialog is built with Radix Dialog and contains a polished two-column layout on larger screens, a single-column form on small screens, focus trapping, Escape-to-close and focus restoration.
- The form uses React Hook Form and Zod and posts to the existing `/api/forms/send` endpoint.
- Popup auto-open waits five seconds after a fresh load. The timer is restarted on route changes, but the dialog's in-memory guard prevents repeated auto-opens after it has opened once during the current app session. Reloading the page resets that guard. Header/hero/CTA buttons can still open it manually.

## Main implementation files

- `src/design-system/design-tokens.css` — brand, neutral, typography, spacing, radius, shadow and motion tokens.
- `tailwind.config.js` — Tailwind aliases and design scale.
- `src/index.css` — global styles, focus treatment, reduced-motion fallback and link underline.
- `app/layout.js` — Outfit and Manrope `next/font` setup; existing metadata remains unchanged.
- `app/site-chrome.js` — new shared public-site shell.
- `src/design-system/` — Navbar, Footer, Hero, Section, Button, Card, CTA banner, ContactForm, EnquiryDialog, StatsBar, TrustBar, ServicesGrid, WhyUs, ProcessSteps, HomeGuidance, TestimonialSlider and FAQAccordion.
- `src/site-pages/Home.jsx` — Home page composition using the new shared components.

## Dependencies added

- `@radix-ui/react-dialog`
- `@hookform/resolvers`
- `react-hook-form`
- `zod` (v3, selected for compatibility with the existing toolchain)
- `embla-carousel-react`

## Validation

- `npm run build` passed and all existing app routes were generated successfully.
- Home was inspected in a browser; it has one H1 and no horizontal overflow was measured at the checked viewport widths.
- The four-step cards were checked at mobile and desktop sizes.
- Dialog open/close and keyboard behavior, theme removal, reduced-motion preference, and browser console were checked during development. A third-party chat widget may add its own page content.
- Lighthouse scores and a full manual keyboard audit have not been recorded.

## Remaining subject pages and Contact

- Redesigned Finance, Law, Nursing, Psychology, Economics, Engineering and Computer Science assignment pages with a shared editorial structure, subject-specific copy, topic coverage, testimonial sections, FAQs and CTA banner.
- Each subject page has its own central illustration motif (financial chart, legal scales, clinical trace, psychology network, economics curves, engineering blueprint or code sequence). Illustrative labels stay within the main frame; no detached floating copy cards are used.
- Added a three-stage, page-specific guidance sequence to the shared editorial content renderer for these subject pages.
- Rebuilt Contact with the shared breadcrumb and navy/gold visual system, a single-column-responsive contact form, contact links and a contained enquiry illustration. Preserved the existing form fields, CRM result event, confirmation/error states, contact details and contact FAQs.
- Kept existing route wrappers and SEO metadata logic intact while pointing the seven subject routes to their new shared page renderer.
- The production build passed. Runtime inspection confirmed one H1 and one contact form on Contact, and no horizontal overflow at the browser viewport used for the check. A pre-existing Framer Motion hydration mismatch warning remains; full 375/768/1024/1440 breakpoint testing and Lighthouse scores are still outstanding.
- Follow-up refinement: replaced the repeated “Build the analysis / 01 Assess” hero-graphic copy with page-specific headlines, labels, metrics and stage markers; each subject graphic now has its own subject motif and frame silhouette. Reworked the subject feature section into a full-width panel, placing its checklist alongside the heading and proof points beneath when present. Production build passed after the refinement.
- Illustration fit fix: compressed the hero graphic’s internal vertical spacing and adjusted its responsive aspect ratios/frame insets so the bottom summary and metrics remain inside the white frame on Finance, Law, Nursing and Psychology. Verified all four routes render their three stages and complete summary within the illustration bounds; no horizontal overflow at the checked viewport. Production build passed.
