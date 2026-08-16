<template>
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
</template>

<script setup>
import { RouterLink } from "vue-router";
import { lookingForCards } from "@/data/diocesis.data.js";
</script>

<style scoped>
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

@media (max-width: 1024px) {
  .looking-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .looking-grid { grid-template-columns: 1fr; }
}
</style>