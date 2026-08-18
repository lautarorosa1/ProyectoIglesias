<template>
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
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { churches } from "../../data/churches";
import { cities } from "../../data/cities";

const diocesisStats = computed(() => {
  const totalComunidades = churches.length;
  const parroquias = churches.filter((c) => c.tipo === "principal").length;
  const capillas = churches.filter((c) => c.tipo === "secundaria").length; //toma las iglesias secundarias como capillas
  const localidades = cities.length;

  return [
    { key: "comunidades", value: totalComunidades, label: "Comunidades" },
    { key: "parroquias", value: parroquias, label: "Parroquias" },
    { key: "capillas", value: capillas, label: "Capillas" },
    { key: "localidades", value: localidades, label: "Localidades" },
  ];
});
</script>

<style scoped>
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

@media (max-width: 1024px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .stats-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
}
</style>