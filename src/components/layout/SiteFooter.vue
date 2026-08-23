<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <p class="footer-title">Diócesis de San Francisco</p>
        <p class="footer-tagline">Una Iglesia que camina, celebra y crece junto a su comunidad.</p>
      </div>

      <nav class="footer-links" aria-label="Enlaces del sitio">
        <RouterLink :to="{ name: 'home', hash: '#movimiento' }">La Diócesis</RouterLink>
        <RouterLink :to="{ name: 'home', hash: '#agenda' }">Agenda</RouterLink>
        <RouterLink :to="{ name: 'home', hash: '#historia' }">Historia</RouterLink>
        <RouterLink :to="{ name: 'map' }">Mapa de comunidades</RouterLink>
        <RouterLink to="/contacto">Contacto</RouterLink>
      </nav>

      <div class="footer-meta">
        <p>© {{ currentYear }} Diócesis de San Francisco. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from "vue-router";

const currentYear = new Date().getFullYear();
</script>

<style scoped>
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

@media (max-width: 640px) {
  .footer-inner { flex-direction: column; }
}
</style>