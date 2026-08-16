<template>
  <section id="obispo" class="section section-gray">
    <div class="section-inner bishop">
      <div
        class="bishop-photo-wrap"
        v-reveal
        role="img"
        :aria-label="bishopMessage.name"
        :style="{
          backgroundImage: `url('${bishopMessage.photo}'), linear-gradient(160deg, var(--dio-primary-500), var(--dio-primary-900))`,
        }"
      ></div>

      <div class="bishop-text" v-reveal>
        <span class="bishop-quote-mark" aria-hidden="true">“</span>
        <p class="bishop-message">{{ bishopMessage.message }}</p>
        <p class="bishop-name">{{ bishopMessage.name }}</p>
        <p class="bishop-role">{{ bishopMessage.role }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { bishopMessage } from "@/data/diocesis.data.js";
</script>

<style scoped>
.bishop {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 48px;
  align-items: center;
}
.bishop-photo-wrap {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--dio-white);
  box-shadow: 0 12px 30px rgba(58, 18, 32, 0.15);
  justify-self: center;
  background-size: cover;
  background-position: center;
}
.bishop-text { position: relative; }
.bishop-quote-mark {
  font-family: var(--dio-font-display);
  font-size: 3.2rem;
  color: var(--dio-gold);
  line-height: 0;
  display: block;
  margin-bottom: 12px;
}
.bishop-message {
  font-family: var(--dio-font-display);
  font-size: 1.2rem;
  line-height: 1.65;
  color: var(--dio-primary-900);
  margin: 0 0 18px;
}
.bishop-name { font-weight: 700; margin: 0; }
.bishop-role { color: var(--dio-ink-600); margin: 2px 0 0; font-size: 0.9rem; }

@media (max-width: 1024px) {
  .bishop { grid-template-columns: 1fr; text-align: center; }
  .bishop-quote-mark { margin-left: auto; margin-right: auto; }
}
</style>