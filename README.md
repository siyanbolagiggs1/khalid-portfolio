# Khalid Siyanbola, Portfolio

A single page developer portfolio, built plain HTML/CSS/JS, no build step or framework. Replaces the previous
Vercel hosted portfolio, redesigned from scratch (not just a content refresh) and moved to Render.

## Design

Dark first, mono accented, motion driven. Interactive flourishes are split by input type rather than applied
everywhere blindly:

- **Pointer devices** (`@media (pointer: fine)`, checked in JS too): a custom cursor that expands over links and
  cards, a radial glow in the hero that tracks the mouse, spotlight and 3D tilt on project/skill/stat cards, and
  magnetic buttons that pull slightly toward the cursor.
- **Every device, including touch**: staggered scroll reveal via `IntersectionObserver`, a top scroll progress
  bar, animated count up numbers on the About and Verified Skills stats, and a looping marquee of core tech.
- `prefers-reduced-motion: reduce` turns off the custom cursor, scroll reveal transitions, and the marquee loop,
  content still renders fully, just without the motion.

## What changed from the old (Vercel) portfolio

- Pulse's payments corrected from Stripe Connect to Paystack (Transactions and Transfers APIs), matching the
  live product, Pulse migrated off Stripe a while back.
- Pulse's role model corrected: the old business/promoter split was merged into a single unified user role.
  The portfolio now describes that simplification instead of the old two role system.
- Added the Pulse dashboard/frontend work (role aware navigation, SSE notifications, admin panel) that was
  built but never reflected on the old site, it read backend only despite being a full stack build.
- Added an AI / LLM skills section (Groq and Gemini APIs) for the support assistant built into Pulse, entirely
  missing from the old portfolio.
- Added SQL, and moved WebSocket to the front of the Real-time row.
- Dropped "Angular (fundamentals)" as a listed skill, weak signal for a senior listing.
- Replaced the two Anthropic course completion certificate images with a Verified Skills section citing real
  TestGorilla assessment results (Top 2% GitHub, Top 3% Algorithms, Top 5% Software Engineer), a stronger,
  third party verified signal than course completion badges.
- Added a Resume download link (`assets/Khalid-Siyanbola-Resume.pdf`), matching the corrected resume content.
- All copy reformatted to avoid em dashes.

## Structure

```
khalid-portfolio/
├── index.html                          All page content and sections
├── css/style.css                        Dark theme, cards, marquee, reveal/stagger, reduced-motion support
├── js/main.js                           Cursor, tilt/spotlight, magnetic buttons, scroll reveal, count up
├── assets/Khalid-Siyanbola-Resume.pdf   Downloadable resume, linked from the hero and contact section
├── render.yaml                          Render static site config
└── README.md
```

## Local preview

```bash
npx serve .
```

## Deploying to Render

1. Push this folder to its own GitHub repo.
2. On [render.com](https://render.com), New, then Static Site, connect the repo.
3. Render detects `render.yaml` automatically (Blueprint), or set manually:
   - Build Command: (leave empty)
   - Publish Directory: `.`
4. Deploy. Render gives a free `*.onrender.com` URL right away, a custom domain can be attached later under
   Settings, then Custom Domains.

## Keeping this in sync

If the resume (`Desktop\CV\resume-source.html`) changes, re-export the PDF and copy it into
`assets/Khalid-Siyanbola-Resume.pdf` here, and update the matching project/skills copy in `index.html` so the
two never drift apart again the way the old portfolio did.
