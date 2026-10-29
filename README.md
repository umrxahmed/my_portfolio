# Umair Ahmed — Portfolio

A dark, minimal portfolio for Mohammed Umair Ahmed, built with React, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

## Stack

- **React 19** + **TypeScript**
- **Vite 8** (Rolldown)
- **Tailwind CSS v4** with custom theme tokens
- **Framer Motion** for entrance and scroll animations
- **React Hook Form** + **Zod** for the contact form
- **Lucide React** for icons

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at the URL printed by Vite (usually `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Content

All copy and links live in [`src/data/portfolioData.ts`](src/data/portfolioData.ts). Update that file to change:

- Profile details, email, and location
- Navigation links and header badges
- Hero headline and calls to action
- Skills, marquee items, and services
- Projects, process steps, and social links
- Footer copy

UI components read from this file, so most content changes do not require touching JSX.

## Contact form

The form validates client-side with Zod and supports two delivery modes:

1. **API endpoint** — set `VITE_CONTACT_ENDPOINT` in `.env.local` to a URL that accepts a JSON `POST` body with `fullName`, `email`, and `message`. Formspree, Getform, Basin, or your own API route all work.
2. **Email fallback** — if no endpoint is configured, submitting opens the visitor's email app with the message pre-filled and addressed to `profileData.email`.

Copy `.env.example` to `.env.local` to get started.

## Project structure

```text
src/
├── components/       # Navbar, Hero, About, Skills, Services,
│                     # SelectedWorks, Process, Contact, Footer
├── data/
│   └── portfolioData.ts  # Central content configuration
├── App.tsx           # Page composition + motion preferences
├── index.css         # Tailwind theme tokens and global styles
└── main.tsx
public/
├── profile.jpg
├── favicon.svg
└── icons.svg
```

## Design tokens

The theme is defined in `src/index.css` using Tailwind v4's `@theme` directive:

- Deep black canvas (`#050505`) with white / `neutral-400` typography
- `font-sans` (Inter) and `font-display` (Syne)
- Glass surfaces use `bg-white/[0.02]`, `border-white/[0.08]`, and `backdrop-blur-sm`

Animations respect the visitor's `prefers-reduced-motion` setting via `MotionConfig` and a CSS media query.

## Deploying

`npm run build` outputs a static site to `dist/`. Deploy that directory to Vercel, Netlify, Cloudflare Pages, or any static host. No server is required unless you want to proxy the contact form through your own endpoint.

## License

Personal portfolio — content and images belong to Mohammed Umair Ahmed.
