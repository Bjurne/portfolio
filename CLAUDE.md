# Portfolio

Mobile-first personal portfolio SPA. Flagship features: animated route transitions and a
CSS-variable-driven theming system. Built to demonstrate modern frontend practice, kept simple
on purpose (KISS) — don't add abstractions or config beyond what a feature actually needs.

## Stack

- Vite + React 19 + TypeScript
- React Router (data router: `createBrowserRouter`)
- `motion` (`motion/react`) for animation — used for route transitions via `AnimatePresence`
- Tailwind CSS v4, CSS-first config (`@theme` in `src/index.css`)
- Vitest + React Testing Library for tests
- A single Vercel serverless function (`api/contact.ts`) for the contact form — everything else
  is a static SPA, no other backend

## Commands

- `npm run dev` — dev server
- `npm run build` — typecheck (`tsc -b`) + production build
- `npm run lint` — ESLint
- `npm run format` — Prettier, writes in place
- `npm run test` — run tests once (CI mode)
- `npm run test:watch` — Vitest watch mode

Before considering a task done: `npm run lint`, `tsc -b` (via `npm run build` or standalone),
and `npm run test` should all pass.

## Folder structure

```
src/
  app/          App.tsx equivalent pieces: router.tsx (route table), Layout.tsx (Nav + PageTransition + Footer)
  pages/        Routed views — one file per route (Home, About, Projects, ProjectDetail, Contact)
  components/   Reusable UI (Nav, Footer, ThemeToggle, PageTransition)
  theme/        ThemeProvider + theme-context.ts (context/hook split out for react-refresh lint rule)
  data/         Typed content (projects.ts) — edit here to change site content, not in components
  lib/          Small utilities (cn.ts classname helper)
  test/         Vitest setup file
api/
  contact.ts    Vercel Edge Function backing the contact form
```

`src/App.tsx` is the entry component (wraps `ThemeProvider` + `RouterProvider`); routes live in
`src/app/router.tsx`.

## Conventions

- **Styling**: Tailwind utility classes directly in JSX. No CSS Modules, no styled-components.
  Use the `cn()` helper (`src/lib/cn.ts`) for conditional classes, not manual string concatenation.
- **Theming**: colors are CSS custom properties (`--bg`, `--text`, `--accent`, etc.) defined in
  `src/index.css` under `:root` (light) and `[data-theme='dark']`. Tailwind's `@theme` block maps
  `--color-*` tokens onto them, so components use normal utilities (`bg-bg`, `text-accent`, ...)
  and get theming for free — don't hardcode hex colors in components. `ThemeProvider` toggles the
  `data-theme` attribute on `<html>` and persists to `localStorage`.
- **Content**: real content (project entries, bio copy) belongs in `src/data/*.ts` as typed
  objects, not inline in JSX, so pages stay generic and content stays easy to edit.
- **Context + fast refresh**: any React context lives in its own `*-context.ts` file exporting
  the context object and a `useX()` hook; the provider component goes in its own `.tsx` file.
  This satisfies the `react-refresh/only-export-components` lint rule — follow the same split
  for any new context.
- **Motion**: respect `prefers-reduced-motion` for any new animation (see `useReducedMotion` usage
  in `PageTransition.tsx`). Keep animations simple — fades/slides, not elaborate choreography.
- **Path alias**: import from `@/...` (maps to `src/`) rather than long relative paths.

## Testing

Component/behavior smoke tests only — this is a portfolio, not a codebase that needs exhaustive
coverage. Cover: does the route render, does the interactive bit (theme toggle, form) work. See
`src/theme/ThemeProvider.test.tsx` and `src/App.test.tsx` for the pattern.

## Deployment

Targeting Vercel (zero-config for Vite, and `api/contact.ts` is written as a Vercel Edge
Function). Contact form needs `RESEND_API_KEY` and `CONTACT_TO_EMAIL` env vars set in the
Vercel project — see `.env.example`.

## Working with Claude on this repo

- Keep changes mobile-first: check how a new UI piece behaves at ~375px width before considering
  it done, not just on desktop.
- Don't introduce a new dependency for something Tailwind, React Router, or Motion already cover.
- When adding a page, add it to `src/app/router.tsx` and to the `links` array in
  `src/components/Nav.tsx`.
