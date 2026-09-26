# Khalid Siyanbola, Portfolio

A single page developer portfolio built with Next.js and TypeScript, exported as a static site and hosted on
Render.

## Design

Dark first, mono accented, motion driven. Interactive flourishes are split by input type:

- **Pointer devices** (`pointer: fine`): a radial glow in the hero that tracks the mouse, spotlight and 3D tilt
  on project/skill/stat cards, magnetic buttons, and ambient butterflies that scatter from the cursor.
- **Every device, including touch**: staggered scroll reveal, a top scroll progress bar, count up numbers on the
  About and Verified Skills stats, and a looping marquee of core tech.
- `prefers-reduced-motion: reduce` turns off the motion; content still renders fully.

## Structure

```
khalid-portfolio/
├── src/app/layout.tsx          Fonts (Inter, JetBrains Mono) and share metadata
├── src/app/page.tsx            All page content and sections
├── src/app/globals.css         Dark theme, cards, marquee, reveal/stagger, reduced-motion support
├── src/app/icon.svg            Favicon
├── src/components/Effects.tsx  Tilt/spotlight, magnetic buttons, butterflies, scroll reveal, count up
├── public/assets/              Resume PDF and Open Graph image
├── design/og-image-source.html HTML source the OG image was rendered from
├── render.yaml                 Render static site config
└── README.md
```

## Local development

```bash
npm install
npm run dev
```

`npm run build` writes the static site to `out/`.

## Deploying to Render

Render picks up `render.yaml` (Blueprint), or set manually on a Static Site:

- Build Command: `npm ci && npm run build`
- Publish Directory: `out`

## Keeping this in sync

If the resume (`Desktop\CV\resume-source.html`) changes, re-export the PDF into
`public/assets/Khalid-Siyanbola-Resume.pdf` and update the matching copy in `src/app/page.tsx`.
