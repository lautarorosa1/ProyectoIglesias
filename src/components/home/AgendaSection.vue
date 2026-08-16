<template>
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
</template>

<script setup>
import { diocesisAgenda } from "@/data/diocesis.data.js";
</script>

<style scoped>
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

@media (max-width: 1024px) {
  .agenda-grid { grid-template-columns: 1fr; }
}
</style>