# Shan Creation Website

A 5-page Next.js (App Router + TypeScript + Tailwind CSS) site for Shan Creation, matching your logo/cover branding: dark navy background, blue → purple → pink gradient accents.

Every page runs a persistent, real-time **WebGL 3D background** (Three.js via `@react-three/fiber` + `@react-three/drei`): glossy floating distorted blobs in your brand colors, ambient sparkles, and a camera that gently follows the cursor. It's a single scene mounted once in `layout.tsx`, so it never reloads or flickers when you navigate between pages — the Home page just gets bigger/brighter shapes as the hero moment, other pages get a calmer version so the content stays readable.

