<!-- src/views/AgendaView.vue -->
<template>
  <section class="section">
    <div class="section-inner">
      <div class="section-head">
        <h1 class="section-title" v-reveal>Agenda de la Diócesis</h1>
        <p class="section-subtitle" v-reveal>
          Todos los próximos eventos de nuestra comunidad.
        </p>
      </div>

      <div v-if="loading" class="agenda-loading">Cargando agenda...</div>
      <div v-else-if="error" class="agenda-error">
        No se pudo cargar la agenda. Intentá recargar la página.
      </div>
      <div v-else-if="agenda.length === 0" class="agenda-empty">
        Por ahora no hay eventos programados.
      </div>

      <div v-else class="agenda-grid">
        <article
          v-for="(event, i) in agenda"
          :key="event.title + event.date"
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
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useGoogleCalendar } from "@/composables/useGoogleCalendar.js";

const { agenda, loading, error, fetchAgenda } = useGoogleCalendar(50); // traé más eventos acá
onMounted(fetchAgenda);
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

.agenda-loading,
.agenda-error,
.agenda-empty {
  text-align: center;
  padding: 60px 20px;
  font-size: 1rem;
  color: var(--dio-ink-600);
}
.agenda-error {
  color: var(--dio-primary-700);
}

@media (max-width: 1024px) {
  .agenda-grid { grid-template-columns: 1fr; }
}
@media (min-width: 1025px) and (max-width: 1280px) {
  .agenda-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>