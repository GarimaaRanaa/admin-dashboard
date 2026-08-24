# Frontend Developer #1 — Universal Admin Dashboard Theme

This is your ready-to-run Next.js starter. It already contains the shared project
architecture used by all 6 theme products, plus a working homepage.

## 1. Setup (do this first)

```bash
npm install
npm run dev
```

Open http://localhost:3000 — if you see a homepage with a header and footer, setup worked.

## 2. Read the guideline

Open **Frontend-Dev1-Guideline.docx** in this folder before writing any code.
It explains TypeScript basics, the folder structure, and gives a full working example
for each of your 3 required components.

## 3. Project Goal

A reusable Admin UI System that every other project (Restaurant, News, Listing, SaaS, Corporate) can plug into — build it once, use it everywhere.

## 4. Homepage Section Order

Navbar → Sidebar → Page Header → KPI Cards → Charts → Recent Activity → Recent Records → Quick Actions

## 5. Inner Pages To Build

- Login / Register / Forgot Password
- Dashboard
- Users
- Roles & Permissions
- Categories
- Content
- Media
- Notifications
- Reports
- Analytics
- Settings
- Profile

## 6. Your 3 Required Components

Stub files already exist in `src/components/project/` with the props typed out for you.
Fill in the JSX using the full example in the guideline docx.

- **DataTable** — A reusable table with sorting, pagination, and search — used on every admin list page.
- **Sidebar** — A collapsible navigation sidebar that renders menu items based on the logged-in user's role.
- **Modal** — A reusable dialog/modal — used for confirmations, forms, and previews across the app.

## 7. Where Things Live

- `src/config/theme.ts` — brand name, colors, feature flags (the ONLY place client branding should live)
- `src/components/ui/` — generic reusable pieces (Button, Card, EmptyState, LoadingSpinner)
- `src/components/layout/` — Navbar, Footer
- `src/components/sections/` — homepage sections (Hero is already built as an example)
- `src/components/project/` — your 3 project-specific components (stubs waiting for you)
- `src/data/` — mock data to build against before the backend is ready
- `src/services/api.ts` — where all backend calls should go through

## 8. Timeline

40 working days, 8 hours/day. Full week-by-week breakdown is in the guideline docx, Part E.

## 9. If You Get Stuck

Report the problem like this (also in the guideline docx):

```
Problem: <what's not working>
What I tried: <steps you took>
Error: <exact error message>
Screenshot: attached
```

This is a beginner-friendly starter — every core file has a one-line comment at the top
explaining its job. Read that comment before editing any file.
