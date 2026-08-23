<template>
  <div class="church-popup">
    <div class="church-popup__header">
      <div class="church-popup__title">
        
        <h3 class="church-popup__name">{{ church.nombre }}</h3>
      </div>
      <button
        class="church-popup__close"
        type="button"
        aria-label="Cerrar"
        @click="close"
      >
        ✕
      </button>
    </div>

    <div class="church-popup__meta">
      <span class="church-popup__tag">
        {{ church.tipo === "principal" ? "Principal" : "Secundaria" }}
      </span>
      <span class="church-popup__city">{{ church.ciudad }}</span>
    </div>

    <p class="church-popup__desc">{{ church.descripcion }}</p>

    <button class="church-popup__cta" @click="goToChurch">
      Ver información
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  church: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["close"]);

function goToChurch() {
  window.dispatchEvent(
    new CustomEvent("church-route", {
      detail: props.church.id
    })
  );
}

function close() {
  emit("close");
}
</script>

<style scoped>
.church-popup {
  width: 280px;
  padding: 18px 20px 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fafaf9 100%);
  border: 1px solid rgba(20, 20, 30, 0.06);
  border-radius: 16px;
  font-family: "Segoe UI", system-ui, -apple-system, Arial, sans-serif;
  color: #17171f;
  box-shadow:
    0 1px 2px rgba(20, 20, 30, 0.04),
    0 8px 24px rgba(20, 20, 30, 0.08),
    0 16px 40px rgba(20, 20, 30, 0.06);
}

.church-popup__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.church-popup__title {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.church-popup__name {
  margin: 0;
  font-size: 16.5px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.church-popup__close {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 8px;
  background: rgba(59, 26, 2, 0.137);
  color: var(--dio-primary-900);
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
}

.church-popup__close:hover {
  background: var(--dio-primary-900);
  color: #ffffff;
  transform: scale(1.05);
}

.church-popup__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.church-popup__city {
  font-size: 11.5px;
  font-weight: 600;
  color: #6b6b78;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.church-popup__tag {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border: none;
  border-radius: 999px;
  color: var(--dio-primary-900);
  background: rgba(59, 26, 2, 0.137);
}

.church-popup__desc {
  margin: 0 0 16px;
  font-size: 13.5px;
  line-height: 1.55;
  color: #3a3a45;
}

.church-popup__cta {
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 10px;
  background: var(--dio-primary-900);;
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(76, 58, 143, 0.28);
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
}

.church-popup__cta:hover {
  filter: brightness(1.08);
  box-shadow: 0 6px 16px rgba(76, 58, 143, 0.34);
}

.church-popup__cta:active {
  transform: translateY(0);
}

.church-popup__cta:focus-visible {
  outline: 2px solid #6c4fd6;
  outline-offset: 2px;
}
</style>