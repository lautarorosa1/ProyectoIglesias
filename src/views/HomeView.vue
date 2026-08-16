<template>
  <main class="home">

    <!-- ============================================================ -->
    <!-- 1. HERO -->
    <!-- ============================================================ -->
    <section class="hero">
      <div class="hero-bg" aria-hidden="true"></div>

      <div class="hero-content">
        <p class="hero-eyebrow">Diócesis de San Francisco · Córdoba</p>
        <h1 class="hero-title">Diócesis de San Francisco</h1>
        <p class="hero-tagline">
          Una Iglesia que camina, celebra y crece junto a su comunidad.
        </p>

        <div class="hero-actions">
          <button class="btn btn-primary" @click="scrollToId('movimiento')">
            Conocé la Diócesis
          </button>
          <RouterLink :to="mapRoute" class="btn btn-ghost">
            Encontrá tu comunidad
          </RouterLink>
        </div>
      </div>

      <button class="hero-scroll-cue" @click="scrollToId('movimiento')" aria-label="Desplazarse hacia abajo">
        <span></span>
      </button>
    </section>

    <!-- ============================================================ -->
    <!-- 2. UNA DIÓCESIS EN MOVIMIENTO -->
    <!-- ============================================================ -->
    <section id="movimiento" class="section section-light">
      <div class="section-inner">
        <h2 class="section-title" v-reveal>Una Diócesis en movimiento</h2>

        <div class="movement-path" aria-hidden="true">
          <svg viewBox="0 0 800 40" preserveAspectRatio="none" class="movement-path-svg">
            <path d="M0,20 C 150,0 250,40 400,20 C 550,0 650,40 800,20" />
          </svg>
        </div>

        <div class="movement-grid">
          <article
            v-for="(item, i) in movementConcepts"
            :key="item.key"
            class="movement-card"
            v-reveal
            :style="{ transitionDelay: `${i * 90}ms` }"
          >
            <span class="movement-icon" v-html="movementIcons[item.key]"></span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- 3. HOY EN NUESTRA IGLESIA -->
    <!-- ============================================================ -->
    <section id="agenda" class="section section-gray">
      <div class="section-inner">
        <div class="section-head">
          <h2 class="section-title" v-reveal>Hoy en nuestra Iglesia</h2>
          <p class="section-subtitle" v-reveal>
            Lo que se vive en la Diócesis, día a día.
          </p>
        </div>

        <div class="agenda-grid">
          <article
            v-for="(event, i) in diocesisAgenda"
            :key="event.tag"
            class="agenda-card"
            v-reveal
            :style="{ transitionDelay: `${i * 90}ms` }"
          >
            <span class="agenda-tag" :class="`agenda-tag--${i}`">{{ event.tag }}</span>
            <p class="agenda-date">{{ event.date }}</p>
            <h3 class="agenda-title">{{ event.title }}</h3>
            <p class="agenda-place">📍 {{ event.place }}</p>
            <p class="agenda-description">{{ event.description }}</p>
          </article>
        </div>
        <p class="data-note">Datos de ejemplo — se reemplazarán por la agenda real.</p>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- 4. UNA DIÓCESIS, MUCHAS COMUNIDADES -->
    <!-- ============================================================ -->
    <section id="comunidades" class="section section-deep">
      <div class="section-inner">
        <p class="section-lead" v-reveal>
          Parroquias, iglesias, capillas y comunidades que forman parte de una misma Iglesia.
        </p>

        <div class="stats-grid">
          <div
            v-for="stat in diocesisStats"
            :key="stat.key"
            class="stat-card"
            v-reveal
            v-count-up="stat.value"
          >
            <span class="stat-value">0</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
        <p class="data-note data-note--light">Valores de ejemplo, editables en diocesis.data.js.</p>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- 5. CONOCÉ NUESTRA HISTORIA -->
    <!-- ============================================================ -->
    <section id="historia" class="section section-light">
      <div class="section-inner">
        <h2 class="section-title" v-reveal>Conocé nuestra historia</h2>

        <ol class="timeline">
          <li
            v-for="(hito, i) in diocesisTimeline"
            :key="i"
            class="timeline-item"
            v-reveal
            :class="{ 'is-open': openTimelineIndex === i }"
          >
            <button class="timeline-marker" @click="toggleTimeline(i)" :aria-expanded="openTimelineIndex === i">
              <span class="timeline-year">{{ hito.year }}</span>
            </button>
            <div class="timeline-body">
              <button class="timeline-heading" @click="toggleTimeline(i)">
                <h3>{{ hito.title }}</h3>
                <span class="timeline-toggle">{{ openTimelineIndex === i ? "–" : "+" }}</span>
              </button>
              <p v-show="openTimelineIndex === i" class="timeline-description">{{ hito.description }}</p>
            </div>
          </li>
        </ol>
        <p class="data-note">Hitos de ejemplo — reemplazar por la historia real de la Diócesis.</p>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- 6. UN MENSAJE DEL OBISPO -->
    <!-- ============================================================ -->
    <section id="obispo" class="section section-gray">
      <div class="section-inner bishop">
        <div
          class="bishop-photo-wrap"
          v-reveal
          role="img"
          :aria-label="bishopMessage.name"
          :style="{ backgroundImage: `url('${bishopMessage.photo}'), linear-gradient(160deg, var(--dio-primary-500), var(--dio-primary-900))` }"
        ></div>

        <div class="bishop-text" v-reveal>
          <span class="bishop-quote-mark" aria-hidden="true">“</span>
          <p class="bishop-message">{{ bishopMessage.message }}</p>
          <p class="bishop-name">{{ bishopMessage.name }}</p>
          <p class="bishop-role">{{ bishopMessage.role }}</p>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- 7. ¿QUÉ ESTÁS BUSCANDO? -->
    <!-- ============================================================ -->
    <section id="buscas" class="section section-light">
      <div class="section-inner">
        <h2 class="section-title" v-reveal>¿Qué estás buscando?</h2>

        <div class="looking-grid">
          <RouterLink
            v-for="(card, i) in lookingForCards"
            :key="card.key"
            :to="card.to"
            class="looking-card"
            v-reveal
            :style="{ transitionDelay: `${i * 80}ms` }"
          >
            <span class="looking-emoji" aria-hidden="true">{{ card.emoji }}</span>
            <h3>{{ card.title }}</h3>
            <p>{{ card.description }}</p>
            <span class="looking-arrow" aria-hidden="true">→</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- 8. INVITACIÓN AL MAPA (sin mostrar el mapa completo) -->
    <!-- ============================================================ -->
    <section class="section map-invite">
      <div class="section-inner map-invite-inner" v-reveal>
        <h2>Encontrá tu comunidad</h2>
        <p>Descubrí las parroquias, iglesias y comunidades que forman parte de nuestra Diócesis.</p>
        <RouterLink :to="mapRoute" class="btn btn-primary btn-light">
          Explorar el mapa
        </RouterLink>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- 9. FOOTER -->
    <!-- ============================================================ -->
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <p class="footer-title">Diócesis de San Francisco</p>
          <p class="footer-tagline">Una Iglesia que camina, celebra y crece junto a su comunidad.</p>
        </div>

        <nav class="footer-links" aria-label="Enlaces del sitio">
          <a href="#movimiento">La Diócesis</a>
          <a href="#agenda">Agenda</a>
          <a href="#historia">Historia</a>
          <RouterLink :to="mapRoute">Mapa de comunidades</RouterLink>
          <RouterLink to="/contacto">Contacto</RouterLink>
        </nav>

        <div class="footer-meta">
          <p>© {{ currentYear }} Diócesis de San Francisco. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>

  </main>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import { RouterLink } from "vue-router";
import {
  diocesisStats,
  diocesisAgenda,
  diocesisTimeline,
  bishopMessage,
  movementConcepts,
  lookingForCards,
} from "@/data/diocesis.data.js";

/**
 * Ruta del mapa: usa la nueva vista "map" (/mapa) agregada al router,
 * que envuelve tu componente ChurchMap existente sin modificarlo.
 * Ver router/index.js y views/MapView.vue.
 */
const mapRoute = { name: "map" };

const currentYear = new Date().getFullYear();

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// --- Timeline interactivo -------------------------------------------------
const openTimelineIndex = ref(0);
function toggleTimeline(i) {
  openTimelineIndex.value = openTimelineIndex.value === i ? -1 : i;
}

// --- Iconos simples (SVG en línea, sin dependencias externas) -------------
const movementIcons = {
  celebramos: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M24 6v14"/><path d="M14 30c2-6 6-10 10-10s8 4 10 10"/><path d="M10 30h28"/><path d="M12 30v10h24V30"/></svg>`,
  compartimos: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="14" cy="24" r="4"/><circle cx="34" cy="12" r="4"/><circle cx="34" cy="36" r="4"/><path d="M17.5 22l13-8"/><path d="M17.5 26l13 8"/></svg>`,
  servimos: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M24 30s-10-6.5-10-14a6 6 0 0 1 10-4.5A6 6 0 0 1 34 16c0 7.5-10 14-10 14z"/><path d="M14 34h20"/><path d="M18 40h12"/></svg>`,
  crecemos: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M24 40V20"/><path d="M24 20c0-6 4-10 10-10 0 6-4 10-10 10z"/><path d="M24 26c0-5-4-9-9-9 0 5 4 9 9 9z"/></svg>`,
};

// --- Directiva local: revelar al hacer scroll ------------------------------
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

const vReveal = {
  mounted(el) {
    el.classList.add("reveal");
    if (revealObserver) {
      revealObserver.observe(el);
    } else {
      // Sin soporte de IntersectionObserver: mostrar directamente
      el.classList.add("is-visible");
    }
  },
  unmounted(el) {
    if (revealObserver) revealObserver.unobserve(el);
  },
};

// --- Directiva local: contador animado -------------------------------------
const vCountUp = {
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

onBeforeUnmount(() => {
  if (revealObserver) revealObserver.disconnect();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap");

/* ==========================================================================
   Design tokens — Diócesis de San Francisco
   Estos tokens se agregan con prefijo "--dio-" para no pisar variables
   globales existentes (--container-width, --space-*). Si ya tenés
   colores institucionales definidos globalmente, reemplazá estos valores
   por esas variables.
   ========================================================================== */
.home {
  /* Paleta: vino profundo (color litúrgico, más "iglesia" que un azul
     corporativo) + piedra cálida (como interior de templo) + dorado
     envejecido como detalle, nunca como color dominante. */
  --dio-primary-900: #3a1220; /* vino muy oscuro — fondos profundos, texto sobre claro */
  --dio-primary-700: #6d2436; /* vino medio — degradés, hovers */
  --dio-primary-500: #a04a58; /* vino claro / terracota rosado — acentos medios */
  --dio-white: #fffdfb;
  --dio-stone-50: #f6f1e8; /* piedra clara cálida (fondos de sección) */
  --dio-stone-200: #e7dccb; /* piedra media (bordes) */
  --dio-ink-600: #6e6156; /* texto secundario cálido, no gris frío */
  --dio-gold: #b3823a; /* dorado envejecido, como bronce */
  --dio-gold-soft: #d9b673;

  --dio-font-display: "Fraunces", "Georgia", serif;
  --dio-font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  width: 100%;
  overflow-x: hidden;
  font-family: var(--dio-font-body);
  color: var(--dio-primary-900);
}

@media (prefers-reduced-motion: reduce) {
  .home * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}

/* ---------- layout helpers ---------- */
.section-inner {
  width: 100%;
  max-width: var(--container-width, 1180px);
  margin: 0 auto;
  padding: 0 var(--space-md, 20px);
}

.section {
  padding: clamp(56px, 8vw, 96px) 0;
}
.section-light { background: var(--dio-white); }
.section-gray { background: var(--dio-stone-50); }
.section-deep {
  background: linear-gradient(160deg, var(--dio-primary-900), var(--dio-primary-700));
  color: var(--dio-white);
}

.section-head { text-align: center; margin-bottom: 40px; }
.section-title {
  position: relative;
  font-family: var(--dio-font-display);
  font-weight: 700;
  font-size: clamp(1.7rem, 3.4vw, 2.5rem);
  text-align: center;
  margin: 0 0 26px;
  padding-bottom: 18px;
  letter-spacing: -0.01em;
  color: var(--dio-primary-900);
}
.section-title::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 44px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--dio-gold), var(--dio-gold-soft));
}
.section-subtitle { text-align: center; color: var(--dio-ink-600); font-size: 1.05rem; margin: 0; }
.section-lead {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 48px;
  font-size: 1.15rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.data-note {
  text-align: center;
  margin-top: 28px;
  font-size: 0.8rem;
  color: var(--dio-ink-600);
  font-style: italic;
}
.data-note--light { color: rgba(255, 255, 255, 0.65); }

/* ---------- buttons ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.98rem;
  text-decoration: none;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  min-height: 48px;
}
.btn:active { transform: translateY(1px) scale(0.98); }
.btn-primary {
  background: var(--dio-gold);
  color: var(--dio-primary-900);
  box-shadow: 0 8px 20px rgba(179, 130, 58, 0.28);
}
.btn-primary:hover { box-shadow: 0 12px 26px rgba(179, 130, 58, 0.38); transform: translateY(-2px); }
.btn-ghost {
  background: rgba(255, 255, 255, 0.08);
  color: var(--dio-white);
  border-color: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(4px);
}
.btn-ghost:hover { background: rgba(255, 255, 255, 0.18); transform: translateY(-2px); }
.btn-light {
  background: var(--dio-white);
  color: var(--dio-primary-900);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
.btn-light:hover { transform: translateY(-2px); }

/* ---------- scroll reveal ---------- */
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.is-visible { opacity: 1; transform: translateY(0); }

/* ==========================================================================
   1. HERO
   ========================================================================== */
.hero {
  position: relative;
  min-height: min(88vh, 780px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--dio-white);
  padding: 100px 20px 60px;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  /* Capas, de arriba a abajo: velo azul para legibilidad del texto,
     foto real (si existe /images/hero-comunidad.jpg en /public), y
     degradé institucional de respaldo. Si la foto no existe, el
     navegador simplemente no pinta esa capa y se ve el degradé —
     nunca rompe el build ni muestra un ícono de imagen rota. */
  background-image:
    linear-gradient(180deg, rgba(58, 18, 32, 0.45) 0%, rgba(58, 18, 32, 0.8) 100%),
    url("/images/hero-comunidad.jpg"),
    linear-gradient(155deg, var(--dio-primary-900) 0%, var(--dio-primary-700) 55%, var(--dio-primary-500) 100%);
  background-size: cover;
  background-position: center;
}
.hero-content { position: relative; max-width: 720px; }
.hero-eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--dio-gold-soft);
  margin: 0 0 18px;
  font-weight: 600;
}
.hero-title {
  font-family: var(--dio-font-display);
  font-weight: 700;
  font-size: clamp(2.4rem, 6.5vw, 4.2rem);
  line-height: 1.05;
  margin: 0 0 18px;
  letter-spacing: -0.01em;
  color: var(--dio-white);
  background: linear-gradient(180deg, #ffffff 20%, var(--dio-gold-soft) 145%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-tagline {
  font-size: clamp(1.05rem, 2vw, 1.3rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.92);
  max-width: 560px;
  margin: 0 auto 36px;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
}
.hero-scroll-cue {
  position: absolute;
  bottom: 26px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 46px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  padding: 0;
}
.hero-scroll-cue span {
  display: block;
  width: 4px;
  height: 8px;
  margin: 8px auto 0;
  background: var(--dio-gold-soft);
  border-radius: 999px;
  animation: scrollCue 1.8s ease-in-out infinite;
}
@keyframes scrollCue {
  0% { transform: translateY(0); opacity: 1; }
  70% { transform: translateY(14px); opacity: 0; }
  100% { transform: translateY(14px); opacity: 0; }
}

/* ==========================================================================
   2. UNA DIÓCESIS EN MOVIMIENTO
   ========================================================================== */
.movement-path { max-width: 640px; margin: 0 auto 8px; opacity: 0.35; }
.movement-path-svg { width: 100%; height: 30px; }
.movement-path-svg path { fill: none; stroke: var(--dio-gold); stroke-width: 2; stroke-dasharray: 6 8; }

.movement-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 24px;
}
.movement-card {
  background: var(--dio-white);
  border: 1px solid var(--dio-stone-200);
  border-radius: 20px;
  padding: 28px 22px;
  text-align: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.movement-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 34px rgba(58, 18, 32, 0.12);
  border-color: transparent;
}
.movement-icon {
  display: inline-flex;
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: var(--dio-stone-50);
  color: var(--dio-primary-700);
  margin-bottom: 16px;
}
.movement-icon :deep(svg) { width: 28px; height: 28px; }
.movement-card h3 {
  font-family: var(--dio-font-display);
  font-size: 1.15rem;
  margin: 0 0 8px;
}
.movement-card p { margin: 0; color: var(--dio-ink-600); font-size: 0.92rem; line-height: 1.5; }

/* ==========================================================================
   3. HOY EN NUESTRA IGLESIA
   ========================================================================== */
.agenda-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.agenda-card {
  background: var(--dio-white);
  border-radius: 18px;
  padding: 26px;
  border: 1px solid var(--dio-stone-200);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.agenda-card:hover { transform: translateY(-4px); box-shadow: 0 14px 30px rgba(58, 18, 32, 0.1); }
.agenda-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 5px 12px;
  border-radius: 999px;
  margin-bottom: 14px;
  color: var(--dio-white);
  background: var(--dio-primary-500);
}
.agenda-tag--1 { background: var(--dio-primary-700); }
.agenda-tag--2 { background: var(--dio-gold); color: var(--dio-primary-900); }
.agenda-date { font-size: 0.82rem; color: var(--dio-ink-600); margin: 0 0 6px; }
.agenda-title { font-family: var(--dio-font-display); font-size: 1.15rem; margin: 0 0 6px; }
.agenda-place { font-size: 0.88rem; color: var(--dio-primary-700); margin: 0 0 10px; }
.agenda-description { font-size: 0.9rem; color: var(--dio-ink-600); line-height: 1.5; margin: 0; }

/* ==========================================================================
   4. ESTADÍSTICAS
   ========================================================================== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  text-align: center;
}
.stat-card {
  padding: 20px 10px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
}
.stat-value {
  display: block;
  font-family: var(--dio-font-display);
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  color: var(--dio-gold-soft);
}
.stat-label {
  display: block;
  margin-top: 6px;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
}

/* ==========================================================================
   5. TIMELINE
   ========================================================================== */
.timeline {
  list-style: none;
  margin: 40px 0 0;
  padding: 0;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.timeline::before {
  content: "";
  position: absolute;
  left: 74px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: var(--dio-stone-200);
}
.timeline-item {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 18px;
  padding: 14px 0;
}
.timeline-marker {
  position: relative;
  z-index: 1;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid var(--dio-gold);
  background: var(--dio-white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease;
}
.timeline-item.is-open .timeline-marker { background: var(--dio-gold); }
.timeline-year { font-size: 0.72rem; font-weight: 700; color: var(--dio-primary-900); }
.timeline-body { padding-top: 6px; }
.timeline-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
}
.timeline-heading h3 {
  font-family: var(--dio-font-display);
  font-size: 1.1rem;
  margin: 0;
  color: var(--dio-primary-900);
}
.timeline-toggle {
  font-size: 1.3rem;
  color: var(--dio-gold);
  line-height: 1;
}
.timeline-description {
  margin: 10px 0 0;
  color: var(--dio-ink-600);
  font-size: 0.92rem;
  line-height: 1.6;
}

/* ==========================================================================
   6. MENSAJE DEL OBISPO
   ========================================================================== */
.bishop {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 48px;
  align-items: center;
}
.bishop-photo-wrap {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--dio-white);
  box-shadow: 0 12px 30px rgba(58, 18, 32, 0.15);
  justify-self: center;
  background-size: cover;
  background-position: center;
}
.bishop-text { position: relative; }
.bishop-quote-mark {
  font-family: var(--dio-font-display);
  font-size: 3.2rem;
  color: var(--dio-gold);
  line-height: 0;
  display: block;
  margin-bottom: 12px;
}
.bishop-message {
  font-family: var(--dio-font-display);
  font-size: 1.2rem;
  line-height: 1.65;
  color: var(--dio-primary-900);
  margin: 0 0 18px;
}
.bishop-name { font-weight: 700; margin: 0; }
.bishop-role { color: var(--dio-ink-600); margin: 2px 0 0; font-size: 0.9rem; }

/* ==========================================================================
   7. ¿QUÉ ESTÁS BUSCANDO?
   ========================================================================== */
.looking-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.looking-card {
  position: relative;
  display: block;
  background: var(--dio-stone-50);
  border-radius: 20px;
  padding: 28px 22px 24px;
  text-decoration: none;
  color: var(--dio-primary-900);
  border: 1px solid transparent;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease;
}
.looking-card:hover {
  transform: translateY(-6px);
  background: var(--dio-white);
  border-color: var(--dio-stone-200);
  box-shadow: 0 18px 34px rgba(58, 18, 32, 0.12);
}
.looking-emoji { font-size: 1.8rem; display: block; margin-bottom: 14px; }
.looking-card h3 { font-family: var(--dio-font-display); font-size: 1.1rem; margin: 0 0 8px; }
.looking-card p { margin: 0; font-size: 0.88rem; color: var(--dio-ink-600); line-height: 1.5; }
.looking-arrow {
  position: absolute;
  top: 24px;
  right: 22px;
  color: var(--dio-gold);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.looking-card:hover .looking-arrow { opacity: 1; transform: translateX(0); }

/* ==========================================================================
   8. INVITACIÓN AL MAPA
   ========================================================================== */
.map-invite {
  background: linear-gradient(150deg, var(--dio-primary-700), var(--dio-primary-500));
  color: var(--dio-white);
  text-align: center;
}
.map-invite-inner { max-width: 560px; }
.map-invite h2 {
  font-family: var(--dio-font-display);
  font-size: clamp(1.7rem, 3.4vw, 2.3rem);
  margin: 0 0 14px;
}
.map-invite p { margin: 0 0 28px; color: rgba(255, 255, 255, 0.9); line-height: 1.6; }

/* ==========================================================================
   9. FOOTER
   ========================================================================== */
.site-footer {
  background: var(--dio-primary-900);
  color: rgba(255, 255, 255, 0.85);
  padding: 44px 0 26px;
}
.footer-inner {
  max-width: var(--container-width, 1180px);
  margin: 0 auto;
  padding: 0 var(--space-md, 20px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
}
.footer-title { font-family: var(--dio-font-display); font-size: 1.15rem; margin: 0 0 6px; color: var(--dio-white); }
.footer-tagline { font-size: 0.85rem; max-width: 280px; color: rgba(255, 255, 255, 0.65); margin: 0; }
.footer-links { display: flex; flex-wrap: wrap; gap: 18px; align-items: center; }
.footer-links a { color: rgba(255, 255, 255, 0.85); text-decoration: none; font-size: 0.9rem; }
.footer-links a:hover { color: var(--dio-gold-soft); }
.footer-meta { width: 100%; margin-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.12); padding-top: 18px; font-size: 0.78rem; color: rgba(255, 255, 255, 0.55); }

/* ==========================================================================
   RESPONSIVE
   ========================================================================== */
@media (max-width: 1024px) {
  .movement-grid { grid-template-columns: repeat(2, 1fr); }
  .agenda-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .looking-grid { grid-template-columns: repeat(2, 1fr); }
  .bishop { grid-template-columns: 1fr; text-align: center; }
  .bishop-quote-mark { margin-left: auto; margin-right: auto; }
}

@media (max-width: 640px) {
  .hero { min-height: 92vh; padding: 90px 18px 56px; }
  .hero-actions { flex-direction: column; width: 100%; }
  .hero-actions .btn { width: 100%; }

  .movement-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
  .looking-grid { grid-template-columns: 1fr; }

  .timeline::before { left: 29px; }
  .timeline-item { grid-template-columns: 44px 1fr; gap: 12px; }
  .timeline-marker { width: 44px; height: 44px; }
  .timeline-year { font-size: 0.62rem; }

  .footer-inner { flex-direction: column; }
}
</style>