// src/composables/useCountUp.js
export const vCountUp = {
  mounted(el, binding) {
    const target = Number(binding.value) || 0;
    const span = el.querySelector(".stat-value");
    if (!span) return;

    const animate = () => {
      const duration = 1200;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        span.textContent = Math.round(eased * target).toLocaleString("es-AR");
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (typeof IntersectionObserver !== "undefined") {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate();
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
    } else {
      animate();
    }
  },
};