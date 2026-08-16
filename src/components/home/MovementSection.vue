<template>
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
          <span class="movement-icon">
            <component :is="iconComponents[item.key]" />
          </span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { movementConcepts } from "@/data/diocesis.data.js";
import IconCelebramos from "@/components/home/icons/iconCelebramos.vue";
import IconCompartimos from "@/components/home/icons/iconCompartimos.vue";
import IconServimos from "@/components/home/icons/iconServimos.vue";
import IconCrecemos from "@/components/home/icons/iconCrecemos.vue";

const iconComponents = {
  celebramos: IconCelebramos,
  compartimos: IconCompartimos,
  servimos: IconServimos,
  crecemos: IconCrecemos,
};
</script>

<style scoped>
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

@media (max-width: 1024px) {
  .movement-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .movement-grid { grid-template-columns: 1fr; }
}
</style>