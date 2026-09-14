(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

  // ---------- Scroll progress bar ----------
  const progressBar = document.getElementById("progressBar");
  function updateProgress() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + "%";
  }
  let progressTicking = false;
  window.addEventListener("scroll", () => {
    if (!progressTicking) {
      requestAnimationFrame(() => { updateProgress(); progressTicking = false; });
      progressTicking = true;
    }
  }, { passive: true });
  updateProgress();

  // ---------- Scroll reveal with stagger ----------
  const revealEls = document.querySelectorAll(".reveal");
  const staggerGroups = [
    document.querySelectorAll(".skills-grid .skill-group"),
    document.querySelectorAll(".stats-grid .stat-card"),
    document.querySelectorAll(".stat-row .stat-pill"),
  ];
  staggerGroups.forEach((group) => {
    group.forEach((el, i) => { el.style.setProperty("--stagger", (i * 90) + "ms"); });
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
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // ---------- Count-up numbers ----------
  const countEls = document.querySelectorAll("[data-countup]");
  function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-countup"));
    const suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const duration = 1100;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window) {
    const countIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    countEls.forEach((el) => countIo.observe(el));
  } else {
    countEls.forEach(animateCount);
  }

  // ---------- Butterflies scatter from the cursor (pointer:fine only) ----------
  if (hasFinePointer && !reduceMotion) {
    const REPEL_RADIUS = 150;
    const MAX_PUSH = 70;
    const EASE = 0.16;

    let mx = -9999, my = -9999;
    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
    window.addEventListener("mouseleave", () => { mx = -9999; my = -9999; });

    const flies = Array.from(document.querySelectorAll(".butterfly")).map((el) => ({
      el,
      inner: el.querySelector(".bfly-inner"),
      ox: 0, oy: 0,
    }));

    function butterflyLoop() {
      flies.forEach((f) => {
        const rect = f.el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.hypot(dx, dy);

        let tx = 0, ty = 0;
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
      requestAnimationFrame(butterflyLoop);
    }
    requestAnimationFrame(butterflyLoop);
  }

  // ---------- Pointer-only interactive flourishes ----------
  if (hasFinePointer && !reduceMotion) {
    // Hero glow follows cursor within hero
    const hero = document.getElementById("hero");
    if (hero) {
      hero.addEventListener("mousemove", (e) => {
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty("--gx", ((e.clientX - rect.left) / rect.width) * 100 + "%");
        hero.style.setProperty("--gy", ((e.clientY - rect.top) / rect.height) * 100 + "%");
      });
    }

    // Magnetic buttons
    document.querySelectorAll("[data-magnetic]").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = "translate(0, 0)"; });
    });

    // Tilt + spotlight on project cards and skill/stat cards
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateX = (0.5 - py) * 8;
        const rotateY = (px - 0.5) * 8;
        card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        card.style.setProperty("--mx", (px * 100) + "%");
        card.style.setProperty("--my", (py * 100) + "%");
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(700px) rotateX(0) rotateY(0)";
      });
    });
  }
})();
