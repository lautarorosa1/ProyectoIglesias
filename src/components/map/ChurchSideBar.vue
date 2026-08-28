<template>
  <Transition name="sidebar-fade">
    <aside v-if="church" class="church-sidebar" :key="church.id">
      <div class="church-sidebar__header">
        <h3 class="church-sidebar__name">{{ church.nombre }}</h3>
        <button
          class="church-sidebar__close"
          type="button"
          aria-label="Cerrar"
          @click="close"
        >
          ✕
        </button>
      </div>

      <div class="church-sidebar__meta">
        <span class="church-sidebar__tag">
          {{ church.tipo === "principal" ? "Principal" : "Secundaria" }}
        </span>
        <span class="church-sidebar__city">{{ church.ciudad }}</span>
      </div>

      <p class="church-sidebar__desc">{{ church.descripcion }}</p>

      <button class="church-sidebar__cta" @click="goToChurch">
        Ver información
      </button>
    </aside>
  </Transition>
</template>

<script setup>
const props = defineProps({
  church: {
    type: Object,
    default: null
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
.church-sidebar {
  position: absolute;
  inset: 0 auto 0 0;
  z-index: 500; /* por debajo del controls-row (9999) */

  width: 320px;
  max-width: calc(100% - 24px);
  height: 100%;
  overflow-y: auto;

  padding: 84px 20px 20px; /* deja lugar arriba para el buscador */
  box-sizing: border-box;

  background: linear-gradient(180deg, #ffffff 0%, #fafaf9 100%);
  border-right: 1px solid rgba(20, 20, 30, 0.06);
  border-top-left-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  box-shadow:
    0 1px 2px rgba(20, 20, 30, 0.04),
    8px 0 24px rgba(20, 20, 30, 0.08),
    16px 0 40px rgba(20, 20, 30, 0.06);

  font-family: "Segoe UI", system-ui, -apple-system, Arial, sans-serif;
  color: #17171f;
}

.church-sidebar__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.church-sidebar__name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.church-sidebar__close {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: rgba(59, 26, 2, 0.137);
  color: var(--dio-primary-900);
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
}

.church-sidebar__close:hover {
  background: var(--dio-primary-900);
  color: #ffffff;
  transform: scale(1.05);
}

.church-sidebar__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.church-sidebar__city {
  font-size: 11.5px;
  font-weight: 600;
  color: #6b6b78;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.church-sidebar__tag {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  color: var(--dio-primary-900);
  background: rgba(59, 26, 2, 0.137);
}

.church-sidebar__desc {
  margin: 0 0 16px;
  font-size: 13.5px;
  line-height: 1.55;
  color: #3a3a45;
}

.church-sidebar__cta {
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 10px;
  background: var(--dio-primary-900);
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(76, 58, 143, 0.28);
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
}

.church-sidebar__cta:hover {
  filter: brightness(1.08);
  box-shadow: 0 6px 16px rgba(76, 58, 143, 0.34);
}

.church-sidebar__cta:focus-visible {
  outline: 2px solid #6c4fd6;
  outline-offset: 2px;
}

/* Aparición simple en el mismo lugar: solo fade, sin desplazamiento */
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: opacity 0.2s ease;
}
.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
}
</style>