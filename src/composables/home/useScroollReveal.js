// src/composables/useScrollReveal.js
const revealObserver =
  typeof IntersectionObserver !== "undefined"
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      )
    : null;

export const vReveal = {
  mounted(el) {
    el.classList.add("reveal");
    if (revealObserver) {
      revealObserver.observe(el);
    } else {
      el.classList.add("is-visible");
    }
  },
  unmounted(el) {
    if (revealObserver) revealObserver.unobserve(el);
  },
};