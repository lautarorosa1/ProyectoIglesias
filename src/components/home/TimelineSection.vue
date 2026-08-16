<template>
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
          <button
            class="timeline-marker"
            @click="toggleTimeline(i)"
            :aria-expanded="openTimelineIndex === i"
          >
            <span class="timeline-year">{{ hito.year }}</span>
          </button>
          <div class="timeline-body">
            <button class="timeline-heading" @click="toggleTimeline(i)">
              <h3>{{ hito.title }}</h3>
              <span class="timeline-toggle">{{ openTimelineIndex === i ? "–" : "+" }}</span>
            </button>
            <p v-show="openTimelineIndex === i" class="timeline-description">
              {{ hito.description }}
            </p>
          </div>
        </li>
      </ol>
      <p class="data-note">Hitos de ejemplo — reemplazar por la historia real de la Diócesis.</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { diocesisTimeline } from "@/data/diocesis.data.js";

const openTimelineIndex = ref(0);

function toggleTimeline(i) {
  openTimelineIndex.value = openTimelineIndex.value === i ? -1 : i;
}
</script>

<style scoped>
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

@media (max-width: 640px) {
  .timeline::before { left: 29px; }
  .timeline-item { grid-template-columns: 44px 1fr; gap: 12px; }
  .timeline-marker { width: 44px; height: 44px; }
  .timeline-year { font-size: 0.62rem; }
}
</style>