<template>
  <section class="section map-invite">
    <div class="section-inner map-invite-inner" v-reveal>
      <h2>Encontrá tu comunidad</h2>
      <p>Descubrí las parroquias, iglesias y comunidades que forman parte de nuestra Diócesis.</p>
      <RouterLink :to="mapRoute" class="btn btn-primary btn-light">
        Explorar el mapa
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";

defineProps({
  mapRoute: { type: [String, Object], required: true },
});
</script>

<style scoped>
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
</style>