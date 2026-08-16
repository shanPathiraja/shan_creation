# Shan Creation Website

A 5-page Next.js (App Router + TypeScript + Tailwind CSS) site for Shan Creation, matching your logo/cover branding: dark navy background, blue → purple → pink gradient accents.

Every page runs a persistent, real-time **WebGL 3D background** (Three.js via `@react-three/fiber` + `@react-three/drei`): glossy floating distorted blobs in your brand colors, ambient sparkles, and a camera that gently follows the cursor. It's a single scene mounted once in `layout.tsx`, so it never reloads or flickers when you navigate between pages — the Home page just gets bigger/brighter shapes as the hero moment, other pages get a calmer version so the content stays readable.

Pages: Home, Services (with pricing), Portfolio, About, Contact.

## Before you launch

1. **Facebook link** — open `lib/site.ts` and replace the `facebook` URL with your real Shan Creation Page URL.
2. **Email** — same file, confirm the `email` field is the address you want inquiries sent to.
3. **Portfolio links** — `lib/site.ts` → `portfolio` array currently links to your personal project demos (Creative Paradise, Wilpattu Wilds, Nexus, Solara, FitTrack) as capability proof, since Shan Creation doesn't have client work yet. Swap these out for real client projects as you land them — just add a screenshot to `/public/portfolio` and update the `gradient` card to an `<Image>` if you'd rather show real screenshots instead of gradient cards.
4. **Pricing** — same file, `pricing` array, adjust numbers as needed.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Deploy

This is a standard Next.js app — deploys to Vercel in about a minute:

```bash
npm install -g vercel
vercel
```

Or connect the folder as a GitHub repo and import it at vercel.com — same flow you already use for your other projects.

## Notes

- The contact form doesn't use a backend — it opens the visitor's email client with the message pre-filled (`mailto:`). If you want it to submit silently without opening email, swap `ContactForm.tsx` to POST to a form service (e.g. Formspree) or a Next.js API route — happy to help wire that up later.
- Logo assets are already in `/public` (`logo.png` transparent, `logo-square.png`, `cover.png`).
- Colors/gradient live in `tailwind.config.ts` under `brand` and `navy` — change them there to restyle the whole site at once.

## About the WebGL background

`components/WebGLBackground.tsx` is the 3D scene, rendered once in `app/layout.tsx` so it persists across all pages (no remount/flicker on navigation). It reads the current route and swaps in a bigger/brighter set of shapes on Home vs. a calmer set everywhere else.

A few things worth knowing:

- **`<Environment preset="city">`** (for the glossy reflections on the blobs) fetches a small HDRI from drei's CDN at runtime, in the visitor's browser — this needs internet access on the visitor's end (normal for any deployed site) but means the very first load fetches an extra ~100–200KB asset. If you'd rather not depend on that CDN, delete the `<Environment />` line — the blobs still look good with just the two lights.
- **Performance**: `dpr={[1, 1.5]}` caps rendering resolution for performance, and `Sparkles` count is lower on non-Home pages. If it feels heavy on low-end phones, lower `count` in `WebGLBackground.tsx` or wrap the whole component in a check that disables it on `prefers-reduced-motion`.
- I couldn't run a real WebGL renderer in my build environment to visually preview this (no headless browser available there), so double-check it in your browser after `npm run dev` — if any shape looks off (position/scale), the values are in `HOME_BLOBS` / `PAGE_BLOBS` at the top of `WebGLBackground.tsx` and are easy to nudge.
- Every `.tsx`/`.ts` file in this project was run through a TypeScript syntax check before delivery, so there shouldn't be any typos/syntax errors — but this doesn't replace an actual `npm run build`.
