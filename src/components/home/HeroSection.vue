<template>
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
        
      </div>
    </div>

    <button class="hero-scroll-cue" @click="scrollToId('movimiento')" aria-label="Desplazarse hacia abajo">
      <span></span>
    </button>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useScrollToId } from "@/composables/home/useScrollToId";

defineProps({
  mapRoute: { type: [String, Object], required: true },
});

const { scrollToId } = useScrollToId();
</script>

<style scoped>
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

@media (max-width: 640px) {
  .hero { min-height: 92vh; padding: 90px 18px 56px; }
  .hero-actions { flex-direction: column; width: 100%; }
  .hero-actions .btn { width: 100%; }
}
</style>