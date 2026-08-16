<template>
  <main class="map-view">
    <div class="map-view-head">
      <RouterLink :to="{ name: 'home' }" class="back-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5" />
          <path d="M11 18 5 12l6-6" />
        </svg>
        Volver al inicio
      </RouterLink>
      <h1>Mapa de comunidades</h1>
      <p>Explorá las parroquias, iglesias y comunidades de la Diócesis de San Francisco.</p>
    </div>

    <section class="map-card">
      <ChurchMap />
    </section>
  </main>
</template>

<script setup>
import { RouterLink } from "vue-router";
import ChurchMap from "@/components/map/ChurchMap.vue";
</script>

<style scoped>
/* Reutiliza los mismos tokens de layout que HomeView (--container-width,
   --space-*) para mantener consistencia visual entre ambas vistas. */
.map-view {
  width: 100%;
  max-width: var(--container-width, 1180px);
  margin: 0 auto;
  padding: var(--space-lg, 40px) var(--space-md, 20px);
}

.map-view-head {
  text-align: center;
  margin-bottom: 28px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  padding: 8px 16px 8px 12px;
  border-radius: 999px;
  background: #f6f1e8;
  border: 1px solid #e7dccb;
  color: #6d2436;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.back-link svg {
  width: 15px;
  height: 15px;
  transition: transform 0.2s ease;
}
.back-link:hover {
  background: #fffdfb;
  border-color: #a04a58;
  transform: translateY(-1px);
}
.back-link:hover svg {
  transform: translateX(-3px);
}

.map-view-head h1 {
  margin: 0 0 10px;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: #3a1220;
}

.map-view-head p {
  max-width: 560px;
  margin: 0 auto;
  color: #6e6156;
  font-size: 1.05rem;
  line-height: 1.6;
}

.map-card {
  padding: 12px;
  background: white;
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .map-view {
    padding: 20px 15px;
  }
  .map-card {
    padding: 8px;
    border-radius: 18px;
  }
}
</style>