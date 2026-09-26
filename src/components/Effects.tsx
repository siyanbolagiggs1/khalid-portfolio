"use client";

import { useEffect } from "react";

// Scroll progress, reveal, count up, butterfly scatter, and pointer flourishes.
// Renders nothing; attaches behavior to the server rendered markup.
export default function Effects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(
      target: Window | HTMLElement,
      type: K,
      fn: (e: WindowEventMap[K]) => void,
      opts?: AddEventListenerOptions
    ) => {
      target.addEventListener(type, fn as EventListener, opts);
      cleanups.push(() => target.removeEventListener(type, fn as EventListener, opts));
    };

    // ---------- Scroll progress bar ----------
    const progressBar = document.getElementById("progressBar");
    const updateProgress = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      if (progressBar) progressBar.style.width = pct + "%";
    };
    let progressTicking = false;
    on(
      window,
      "scroll",
      () => {
        if (!progressTicking) {
          requestAnimationFrame(() => {
            updateProgress();
            progressTicking = false;
          });
          progressTicking = true;
        }
      },
      { passive: true }
    );
    updateProgress();

    // ---------- Scroll reveal with stagger ----------
    const revealEls = document.querySelectorAll<HTMLElement>(".reveal");
    [".skills-grid .skill-group", ".stats-grid .stat-card", ".stat-row .stat-pill"].forEach((sel) => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el, i) => {
        el.style.setProperty("--stagger", i * 90 + "ms");
      });
    });

    if ("IntersectionObserver" in window && !reduceMotion) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    } else {
      revealEls.forEach((el) => el.classList.add("in"));
    }

    // ---------- Count-up numbers ----------
    const countEls = document.querySelectorAll<HTMLElement>("[data-countup]");
    const animateCount = (el: HTMLElement) => {
      const target = parseFloat(el.getAttribute("data-countup") ?? "0");
      const suffix = el.getAttribute("data-suffix") || "";
      if (reduceMotion) {
        el.textContent = target + suffix;
        return;
      }
      const duration = 1100;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      const countIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target as HTMLElement);
              countIo.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      countEls.forEach((el) => countIo.observe(el));
      cleanups.push(() => countIo.disconnect());
    } else {
      countEls.forEach(animateCount);
    }

    if (hasFinePointer && !reduceMotion) {
      // ---------- Butterflies scatter from the cursor ----------
      const REPEL_RADIUS = 150;
      const MAX_PUSH = 70;
      const EASE = 0.16;

      let mx = -9999;
      let my = -9999;
      on(window, "mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
      });
      on(document.documentElement, "mouseleave", () => {
        mx = -9999;
        my = -9999;
      });

      const flies = Array.from(document.querySelectorAll<HTMLElement>(".butterfly")).map((el) => ({
        el,
        inner: el.querySelector<HTMLElement>(".bfly-inner"),
        ox: 0,
        oy: 0,
      }));

      let rafId = 0;
      const butterflyLoop = () => {
        flies.forEach((f) => {
          const rect = f.el.getBoundingClientRect();
          const dx = rect.left + rect.width / 2 - mx;
          const dy = rect.top + rect.height / 2 - my;
          const dist = Math.hypot(dx, dy);

          let tx = 0;
          let ty = 0;
          if (dist < REPEL_RADIUS && dist > 0.01) {
            const force = 1 - dist / REPEL_RADIUS;
            tx = (dx / dist) * force * MAX_PUSH;
            ty = (dy / dist) * force * MAX_PUSH;
            f.el.classList.toggle("startled", force > 0.35);
          } else {
            f.el.classList.remove("startled");
          }

          f.ox += (tx - f.ox) * EASE;
          f.oy += (ty - f.oy) * EASE;
          if (f.inner) f.inner.style.transform = `translate(${f.ox.toFixed(1)}px, ${f.oy.toFixed(1)}px)`;
        });
        rafId = requestAnimationFrame(butterflyLoop);
      };
      rafId = requestAnimationFrame(butterflyLoop);
      cleanups.push(() => cancelAnimationFrame(rafId));

      // ---------- Hero glow follows cursor within hero ----------
      const hero = document.getElementById("hero");
      if (hero) {
        on(hero, "mousemove", (e) => {
          const rect = hero.getBoundingClientRect();
          hero.style.setProperty("--gx", ((e.clientX - rect.left) / rect.width) * 100 + "%");
          hero.style.setProperty("--gy", ((e.clientY - rect.top) / rect.height) * 100 + "%");
        });
      }

      // ---------- Magnetic buttons ----------
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((btn) => {
        on(btn, "mousemove", (e) => {
          const rect = btn.getBoundingClientRect();
          const relX = e.clientX - rect.left - rect.width / 2;
          const relY = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
        });
        on(btn, "mouseleave", () => {
          btn.style.transform = "translate(0, 0)";
        });
      });

      // ---------- Tilt + spotlight on cards ----------
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
        on(card, "mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width;
          const py = (e.clientY - rect.top) / rect.height;
          const rotateX = (0.5 - py) * 8;
          const rotateY = (px - 0.5) * 8;
          card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
          card.style.setProperty("--mx", px * 100 + "%");
          card.style.setProperty("--my", py * 100 + "%");
        });
        on(card, "mouseleave", () => {
          card.style.transform = "perspective(700px) rotateX(0) rotateY(0)";
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
