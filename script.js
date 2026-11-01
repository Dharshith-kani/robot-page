// Small, dependency-free motion system for the NHI landing page.
const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
  window.setTimeout(() => loader?.classList.add("is-hidden"), 1250);
});

// Reveal content only as it enters the viewport.
const revealTargets = document.querySelectorAll(
  ".reveal, .word-reveal, .image-reveal"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("in-view"));
}

// Mobile navigation.
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Keep the robot visual subtly responsive to pointer movement on larger screens.
const hero = document.querySelector(".hero");
const heroRobot = document.querySelector(".hero-robot");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (hero && heroRobot && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  hero.addEventListener("pointermove", (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroRobot.style.setProperty("--pointer-x", `${x * 10}px`);
    heroRobot.style.setProperty("--pointer-y", `${y * 8}px`);
    heroRobot.style.translate = `${x * 8}px ${y * 6}px`;
  });

  hero.addEventListener("pointerleave", () => {
    heroRobot.style.translate = "0 0";
  });
}
