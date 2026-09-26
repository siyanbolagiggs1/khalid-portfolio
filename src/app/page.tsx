import type { CSSProperties } from "react";
import Effects from "@/components/Effects";

const EMAIL = "siyanbolagiggs@gmail.com";
const GITHUB = "https://github.com/siyanbolagiggs1";
const RESUME = "/assets/Khalid-Siyanbola-Resume.pdf";

const butterflies = [
  { left: "8%", top: "18%", dur: "34s", delay: "-2s", size: "34px", hue: "var(--accent)" },
  { left: "82%", top: "12%", dur: "41s", delay: "-11s", size: "26px", hue: "var(--violet)" },
  { left: "20%", top: "64%", dur: "38s", delay: "-24s", size: "30px", hue: "var(--accent)" },
  { left: "68%", top: "76%", dur: "29s", delay: "-6s", size: "24px", hue: "var(--violet)" },
  { left: "45%", top: "38%", dur: "46s", delay: "-18s", size: "32px", hue: "var(--accent)" },
];

const marquee = [
  "Go", "Node.js", "TypeScript", "Next.js", "React Native", "MongoDB",
  "Redis", "Docker", "Paystack", "WebSocket", "Groq", "Gemini",
];

const aboutStats = [
  { value: 4, label: "years building production software" },
  { value: 7, label: "microservices shipped on JustTalk" },
  { value: 3, label: "production projects, solo and team" },
];

type Project = {
  name: string;
  meta: string;
  description: string;
  tags: string[];
  link: { href: string; label: string };
};

const experience: Project[] = [
  {
    name: "expendit",
    meta: "Open Source Contributor · Internship · June 2026 to Present",
    description:
      "Open source expense tracking app, at Cuesoft. Shipped Google Sign-In, schema based input and password validation, a JWT duplicate token fix, expense CRUD fixes, Docker and CORS configuration fixes, replaced hardcoded URLs and SMTP settings with configurable environment variables, and an AI powered financial document processing and transaction insights feature.",
    tags: ["Next.js", "TypeScript", "Go"],
    link: { href: "https://expendit.cuesoft.io/", label: "View live app" },
  },
  {
    name: "JustTalk",
    meta: "Full Stack Developer · March 2022 to March 2026",
    description:
      "Full stack developer on a social messaging and voice casts app. Contributed across seven Node.js/Express/TypeScript microservices (auth, identity, casts, messaging, search, subscriptions, shared data models) and the React Native mobile client. Real time chat over Socket.io, JWT and Google OAuth, a referral system, email verification flows, activity tracking, and media pipelines with ffmpeg and Google Cloud Storage.",
    tags: ["Node.js", "Express", "TypeScript", "MongoDB", "Socket.io", "React Native", "Google Cloud Storage"],
    link: { href: "https://justtalkapp.com/", label: "Visit app site" },
  },
];

const personalProjects: Project[] = [
  {
    name: "Pulse",
    meta: "May 2026 to Present",
    description:
      "A social engagement marketplace: any user can fund a repost campaign, and any user can earn money completing one. Built end to end, a Next.js dashboard with role aware navigation and SSE powered live notifications, an influence scoring and fraud detection engine, Paystack integration for real bank top ups and payouts, and an AI support assistant using the Groq and Gemini APIs. Simplified an earlier business/promoter role split into a single unified user role. Deployed with Docker and CI/CD to Railway and Vercel.",
    tags: ["Next.js", "TypeScript", "Go (Gin)", "MongoDB", "Redis", "Paystack", "Groq & Gemini", "Docker", "n8n"],
    link: { href: "https://pulse-murex-five.vercel.app/", label: "View live app" },
  },
];

const skills = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Go"] },
  {
    group: "Frontend",
    items: ["React", "Next.js", "React Native", "Tailwind CSS", "shadcn/ui", "Zustand", "React Hook Form"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "Go (Gin)", "REST API design", "Microservices", "JSON Schema (Ajv, Joi, Zod)"],
  },
  {
    group: "Data & Infra",
    items: ["MongoDB", "Mongoose", "SQL", "Redis", "Docker", "GitHub Actions CI/CD", "Google Cloud Storage"],
  },
  { group: "Real-time & Auth", items: ["WebSocket", "Socket.io", "Server-Sent Events", "JWT", "OAuth (Google)"] },
  { group: "Payments", items: ["Paystack (Transactions & Transfers)", "Stripe (Payment Intents, Connect)"] },
  { group: "AI / LLM", items: ["Groq API", "Gemini API", "Embeddings & retrieval"] },
  { group: "Automation", items: ["n8n", "HubSpot CRM", "GoHighLevel", "Webhook integrations"] },
];

const verified = [
  { top: 2, label: "GitHub" },
  { top: 3, label: "Algorithms for Software Engineering" },
  { top: 5, label: "Software Engineer" },
];

function Butterfly({ left, top, dur, delay, size, hue, index }: (typeof butterflies)[number] & { index: number }) {
  const style = { left, top, "--dur": dur, "--delay": delay, "--size": size, "--hue": hue } as CSSProperties;
  return (
    <div className={`butterfly b${index + 1}`} style={style}>
      <div className="bfly-inner">
        <svg viewBox="0 0 100 80" className="bfly-svg">
          <g className="wing wing-left">
            <path d="M50 40 C 20 5, -5 15, 10 40 C -5 65, 20 70, 50 40 Z" />
          </g>
          <g className="wing wing-right">
            <path d="M50 40 C 80 5, 105 15, 90 40 C 105 65, 80 70, 50 40 Z" />
          </g>
          <line x1="50" y1="28" x2="50" y2="56" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((t) => (
        <span className="tag" key={t}>
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({ name, meta, description, tags, link }: Project) {
  return (
    <article className="project reveal" data-tilt>
      <div className="project-glow" aria-hidden="true"></div>
      <div className="project-inner">
        <div className="project-head">
          <h3>{name}</h3>
          <span className="project-meta mono">{meta}</span>
        </div>
        <p>{description}</p>
        <Tags items={tags} />
        <a className="project-link" href={link.href} target="_blank" rel="noopener">
          {link.label} &#8599;
        </a>
      </div>
    </article>
  );
}

function ContactLinks({ primaryLabel }: { primaryLabel: string }) {
  return (
    <div className="hero-links reveal">
      <a className="btn btn-primary magnetic" href={`mailto:${EMAIL}`} data-magnetic>
        <span>{primaryLabel}</span>
      </a>
      <a className="btn btn-ghost magnetic" href={GITHUB} target="_blank" rel="noopener" data-magnetic>
        <span>GitHub</span>
      </a>
      <a className="btn btn-ghost magnetic" href={RESUME} target="_blank" rel="noopener" data-magnetic>
        <span>Resume &#8595;</span>
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div className="bg-fixed" aria-hidden="true"></div>

      <div className="butterflies" aria-hidden="true">
        {butterflies.map((b, i) => (
          <Butterfly key={i} index={i} {...b} />
        ))}
      </div>

      <div className="progress-bar" id="progressBar"></div>

      <main>
        {/* HERO */}
        <header className="hero" id="hero">
          <div className="hero-glow" id="heroGlow" aria-hidden="true"></div>
          <div className="hero-inner">
            <p className="mono eyebrow reveal">Full Stack Engineer / Lagos, Nigeria</p>
            <h1 className="hero-name reveal">
              <span className="name-line">Khalid</span>
              <span className="name-line accent-text">Siyanbola</span>
            </h1>
            <p className="tagline reveal">
              I build reliable full stack products end to end, marketplaces, real time systems, and fintech tools,
              using Go, Node.js, React, and React Native.
            </p>
            <ContactLinks primaryLabel="Say hello" />
          </div>
          <div className="scroll-cue reveal" aria-hidden="true">
            <span className="mono">scroll</span>
            <span className="scroll-cue-line"></span>
          </div>
        </header>

        {/* MARQUEE */}
        <div className="marquee-band reveal">
          <div className="marquee-track">
            {[...marquee, ...marquee].flatMap((item, i) => [
              <span key={`t${i}`}>{item}</span>,
              <span key={`d${i}`}>&bull;</span>,
            ])}
          </div>
        </div>

        {/* ABOUT */}
        <section className="section" id="about">
          <p className="mono section-num reveal">01 / About</p>
          <p className="about reveal">
            Four years building production software end to end, from data model to deployed API to UI. I&apos;ve
            shipped REST APIs across seven microservices for a live social app, and independently designed and built
            a two sided marketplace, backend, frontend, payments, and an AI support assistant, on my own. I care about
            clean API contracts, schemas that don&apos;t break downstream consumers, and cutting complexity out of a
            system wherever I find it.
          </p>
          <div className="stat-row">
            {aboutStats.map((s) => (
              <div className="stat-pill reveal" key={s.label}>
                <span className="stat-num mono" data-countup={s.value} data-suffix="">
                  0
                </span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section" id="experience">
          <p className="mono section-num reveal">02 / Experience</p>
          {experience.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </section>

        {/* PERSONAL PROJECT */}
        <section className="section" id="projects">
          <p className="mono section-num reveal">03 / Personal Project</p>
          {personalProjects.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </section>

        {/* SKILLS */}
        <section className="section" id="skills">
          <p className="mono section-num reveal">04 / Skills</p>
          <div className="skills-grid">
            {skills.map((s) => (
              <div className="skill-group reveal" data-tilt key={s.group}>
                <h3 className="mono">{s.group}</h3>
                <Tags items={s.items} />
              </div>
            ))}
          </div>
        </section>

        {/* VERIFIED SKILLS */}
        <section className="section" id="verified">
          <p className="mono section-num reveal">05 / Verified Skills</p>
          <p className="about reveal" style={{ marginBottom: "2.5rem" }}>
            TestGorilla skills assessments, scored against other engineers who took the same tests.
          </p>
          <div className="stats-grid">
            {verified.map((v) => (
              <div className="stat-card reveal" data-tilt key={v.label}>
                <strong className="mono">
                  Top{" "}
                  <span data-countup={v.top} data-suffix="%">
                    0
                  </span>
                </strong>
                <span>{v.label}</span>
              </div>
            ))}
          </div>
          <p className="mono verified-note reveal">top percentile shown, lower is better</p>
        </section>

        {/* CONTACT */}
        <section className="section contact-section" id="contact">
          <p className="mono section-num reveal">06 / Contact</p>
          <h2 className="contact-heading reveal">
            Let&apos;s build
            <br />
            <span className="accent-text">something reliable.</span>
          </h2>
          <ContactLinks primaryLabel={EMAIL} />
        </section>
      </main>

      <footer className="footer">
        <p className="mono">&copy; 2026 Khalid Siyanbola.</p>
      </footer>

      <Effects />
    </>
  );
}
