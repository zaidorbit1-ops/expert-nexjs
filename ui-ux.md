# Expert Assignment Writers: UI/UX Implementation Plan

Site: expertassignmentwriters.co.uk
Stack: Next.js (existing)
Scope: Front-end only. Content is the single carried-over asset.

---

## 1. Goal

Rebuild the entire front-end of the website from scratch. The current UI/UX is considered broken, outdated, and inconsistent. The new design should feel premium, modern, and immersive, with a subtle 3D depth effect, smooth motion, and a clear structure that makes the site easy to navigate and convert on.

---

## 2. What Is Kept and What Is Discarded

**Kept:**
- All written content (page copy, headings, service descriptions, FAQs, testimonials, and so on)
- Page URLs and the overall sitemap, so SEO is not disrupted

**Discarded (rebuild from zero):**
- All existing components, layouts, and styles
- The current hero forms, pop-up forms, and contact form
- The current navbar and footer
- The current CTA components (one per page, each different; these must be replaced by one shared system)
- Any existing CSS, Tailwind classes, or animation code

SEO and blog systems are out of scope for this plan. Do not change them unless they break because of the rebuild.

---

## 3. Brand Identity

The brand uses two main colors, both already in use on the live site:
- **Dark blue** (primary): trust, authority, and academic seriousness. Used for headings, navbar, footer, and primary buttons.
- **Gold** (accent): quality and premium feel. Used for highlights, CTA hover states, icons, stats, and small decorative details.

Supporting colors (derived from the two above, not new brand colors):
- Background: white and a very light neutral tint
- Text: dark blue or near-black for body text
- Muted text and borders: light neutral grays with a slight blue tint

There is no existing token file, so the exact values must be taken from the current site before any UI code is written.

Step to follow:
1. Read the exact hex values of dark blue and gold from the live site (browser DevTools computed styles, the logo file, or the current CSS).
2. Document them in a `design-tokens` file as CSS variables and Tailwind theme colors.
3. Use only these values and the derived neutrals. Do not introduce new brand colors.
4. If the site uses more than one shade of blue or gold, list each shade and its role, then confirm the set with the owner before building.

Tone of the brand: trustworthy, academic, premium, reliable, and approachable.

---

## 4. Typography

Font pairing (two families only, for consistency and performance):

| Role | Font | Why |
|---|---|---|
| Headings / display | **Outfit** (Google Fonts) | Geometric, modern, and friendly. Clear at large sizes and feels approachable and trustworthy. |
| Body / UI | **Manrope** (Google Fonts) | Highly legible at small sizes, clean letterforms, and comfortable for long reading. |
| Labels (optional) | **Manrope**, uppercase, letter-spaced | Used for tags, stats, and step numbers. Keeps the system to two families. |

Weights to load:
- Outfit: 500, 600, 700
- Manrope: 400, 500, 600

Type scale (desktop, approximate):
- H1: 64 to 80px, line-height 1.05, tight tracking (-0.02em)
- H2: 44 to 56px, line-height 1.1
- H3: 24 to 32px, line-height 1.25
- Body: 17 to 18px, line-height 1.7
- Labels: 12 to 13px, uppercase, tracking 0.12em
- Max readable line width: 65 to 75 characters

Use `next/font` for both fonts to avoid layout shift.

---

## 5. Libraries

| Purpose | Library |
|---|---|
| Styling | Tailwind CSS (keep, but rebuild the config from the brand tokens) |
| Base UI primitives | shadcn/ui (Radix-based, accessible, unstyled base only) |
| Animation | **Framer Motion** (`motion`) for component and page transitions |
| Scroll animation | **GSAP + ScrollTrigger** for scroll-linked sections |
| Smooth scroll | **Lenis** |
| 3D (hero and accents) | **React Three Fiber** + **@react-three/drei** |
| Icons | **Lucide React** (one icon family only, consistent stroke width) |
| Carousels / sliders | **Embla Carousel** |
| Forms | **React Hook Form** + **Zod** for validation |
| In-view triggers | **react-intersection-observer** |

Performance rule: 3D scenes must be lazy-loaded (`next/dynamic`, `ssr: false`) and must fall back to a static image on mobile and low-power devices.

---

## 6. Motion, Hover, and Themes

**Hover states**
- Buttons: slight lift (translateY -2px), shadow deepening, arrow icon slides right
- Cards: subtle 3D tilt that follows the cursor (max 8 degrees), soft glare overlay
- Links: underline draws from left to right
- Images: slow scale (1.04) on hover

**Entrance animations**
- Sections fade and rise (opacity 0 to 1, y 40 to 0) when they enter the viewport, triggered once
- Headlines reveal line by line (mask reveal)
- Staggered children for grids (80 to 120ms delay between items)

**Page transitions**
- Soft fade and slight blur between routes using Framer Motion's layout and AnimatePresence

**Hero (3D depth)**
- Layered parallax on scroll (background, mid, foreground)
- Optional floating 3D element (abstract shape or document/book form) built with React Three Fiber, subtle and slow-moving
- Mouse-reactive depth on desktop only

**Themes**
- Light theme as default
- Dark theme with a toggle in the navbar
- All colors defined as CSS variables so both themes update instantly

**Accessibility**
- Respect `prefers-reduced-motion`: disable parallax, 3D movement, and tilt; keep simple fades
- Minimum contrast 4.5:1 for body text
- Visible focus rings on every interactive element

---

## 7. Component System (Build These First)

Build these once and reuse them across all pages. Do not create per-page variants.

1. **Navbar**: sticky, blurs on scroll, logo left, links center, one primary CTA right, mobile drawer with staggered link animation
2. **Hero**: one reusable component with props for headline, subheadline, primary CTA, and optional 3D/visual slot. Hero forms are removed. Lead capture moves to a dedicated section or the contact page.
3. **Section wrapper**: consistent vertical spacing (96px desktop, 64px mobile), max width container, entrance animation built in
4. **Button**: variants (primary, secondary, ghost), sizes (sm, md, lg), icon support, hover and focus states
5. **Card**: default, featured, and tilt variants
6. **CTA banner**: ONE component used at the bottom of every page, with props for heading, text, and button. No per-page custom CTA designs.
7. **Contact form**: ONE form component, used on the contact page and in any modal. Multi-step is optional. Clear labels, inline validation, success and error states.
8. **Modal / pop-up**: ONE modal component, used for the enquiry form. Clean, focused, with focus trap and Escape to close.
9. **Footer**: four-column layout, newsletter-free, with navigation, services, legal links, and contact info
10. **Icon set**: Lucide only, used consistently
11. **FAQ accordion**: animated open and close, keyboard accessible
12. **Testimonial slider**: Embla-based, with autoplay pausing on hover
13. **Stats / trust bar**: animated number counters triggered on view
14. **Process steps**: numbered, connected by a line that draws on scroll

---

## 8. Page-by-Page Build Order

Build **one page at a time**. After each page is complete, stop, send the page for review, and wait for approval before starting the next page.

Suggested order (confirm against the actual routes in the project):
1. Home
2. Services overview
3. Individual service pages (build the template once, then populate)
4. About
5. Pricing / how it works (if these exist)
6. Blog listing and article layout (visual layer only; content and SEO logic are not changed)
7. Contact
8. 404 and utility pages

---

## 9. Per-Page Verification Checklist

Before reporting a page as done, confirm each item:

- [ ] Uses only the approved tokens (colors, fonts, spacing)
- [ ] Uses only the shared components listed in Section 7
- [ ] Original content is preserved (no copy lost or changed without noting it)
- [ ] Responsive at 375px, 768px, 1024px, and 1440px with no horizontal scroll
- [ ] Hover, focus, and active states work on all interactive elements
- [ ] Animations play once and respect reduced-motion
- [ ] No console errors or hydration warnings
- [ ] Images are optimized with `next/image` and have alt text
- [ ] Headings follow one H1 per page and a logical H2/H3 order
- [ ] Lighthouse: Performance and Accessibility at 90+ on mobile
- [ ] Dark theme checked

Report back with: a short summary, the list of components used, any content changes, and screenshots or a preview link.

---

---

## 11. Approval Flow

1. Agent completes Home and reports.
2. Owner reviews and gives feedback.
3. Agent fixes issues on Home only.
4. Owner approves Home.
5. Agent moves to the next page in the build order.
6. Repeat until every page is approved.

No page is considered finished until the owner has verified it.