# Portfolio redesign — design spec (2026-11-26)

## Intent
Portfolio for **recruiters** (internship / full-time). Current site feels AI-generated ("AI slop") and dark. New site: light, easy on the eyes, professional, and feels alive. English only.

## Goals / non-goals
- Goals: professional light UI; content editable without touching Vue code; per-project case study pages; purposeful motion.
- Non-goals: dark mode (removed), contact form, i18n, CMS admin UI.
- Anti-goals: logo walls, custom cursor, heavy parallax, marquees, generic gradient blobs, three mixed UI kits.

## Visual system
- Palette (cool neutral): bg `#F7F8FA`, surface `#FFFFFF`, text slate (`#0F172A` / `#475569`), border `#E2E8F0`, accent cobalt `#2747D9`, status green.
- Type: Geist (headings + body), Geist Mono (dates, tech tags, labels).
- Real photo (`profile_picture.jpg`), no memoji.
- Skills as grouped text (Frontend / Backend / Mobile / Tools), no logos.

## Structure
- **Home**: Hero (name, "Web & Mobile Developer", pulsing "Open to internship", KL local time, "Currently building…", Resume + Contact buttons) → Selected Work → Experience → Skills → About → Contact (links: email, LinkedIn, GitHub, resume download).
- **Project page** (`/projects/:slug`): banner, problem, role, tech, gallery, links.
- Initial projects: Examination System, MudahJe (web + mobile merged), KPMB Hub, Lost & Found, MariMembaca, FindMovie. Experience uses placeholders.

## Motion (motion-v)
Hero word-by-word reveal; staggered scroll reveals; project card hover (lift, image zoom, arrow nudge); shared-layout card → project banner transition; magnetic Resume/Contact buttons; scroll progress + sticky title on project page. Respect `prefers-reduced-motion` (fall back to short fades). No custom cursor, no parallax.

## Tech
- Vue 3 + Vite + Tailwind 4 + motion-v (+ vue-router for project pages). Remove Nuxt UI, Flowbite, FlyonUI.
- All content in JSON data files (projects, experience, skills, about, socials, resume path). Adding a project = add one JSON entry + images.
- Hosted on Netlify.

## Approaches considered (content management)
- Admin CMS (Decap) — easiest for non-code edits, more setup. Not chosen.
- **JSON data files — chosen**: simple, no extra service.
- Google Sheets — slow, awkward for images. Not chosen.

## Design deliverable
Figma file "Portfolio Redesign 2026": Style page; Home desktop 1440 + mobile 390; Project desktop + mobile; motion annotations; Smart Animate prototype Home → Project. Code starts only after Figma approval.

## Update (same day)
- Figma hit the Starter-plan MCP limit after Style + Home; user chose to design directly in HTML (built straight into the Vue app).
- Added `/projects` page: search, type filter (Web / Mobile; "Web + Mobile" counts as both), tech multi-select, sort (Newest / Oldest / A–Z). Filters sync to the URL. Home shows the newest 4 featured projects.
- Card → banner morph uses the View Transitions API (Chrome/Edge/Safari 18+); other browsers get a plain page change.
