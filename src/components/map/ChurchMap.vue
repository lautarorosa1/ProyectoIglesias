<template>
  <section id="mapa" class="church-map-section section-gray">
    <div class="church-map-head">
      <h1>Mapa de comunidades</h1>
      <p>Explorá las parroquias, iglesias y comunidades de la Diócesis de San Francisco.</p>
    </div>

    <div class="map-card">
      <div class="map-wrapper">
        <div class="controls-row">
          <SearchControl
            ref="searchControl"
            :items="searchItems"
            :recent="recentSearches"
            @select="handleSelection"
            @focus="deselectChurch"
          />

          <button
            type="button"
            class="reset-button"
            aria-label="Volver a San Justo"
            title="Volver a San Justo"
            @click="resetToSanJusto"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9.5 12 3l9 6.5" />
              <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
            </svg>
          </button>
        </div>

        <ChurchSidebar :church="selectedChurch" @close="closeSidebar" />

        <div class="map-container" :class="{ 'is-loading': mapLoading }">
          <div v-if="mapLoading" class="map-loading-overlay">
            <div class="spinner"></div>
            <p>Cargando mapa...</p>
          </div>

          <div ref="mapContainer" class="map-inner"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import SearchControl from "./SearchControl.vue";
import ChurchSidebar from "./ChurchSideBar.vue";

import { churches } from "../../data/churches";
import { cities } from "../../data/cities";

import { useMapInstance } from "../../composables/map/useMapInstance";
import { useChurchMarkers } from "../../composables/map/useChurchMarkers.js";
import { useChurchConnectors } from "../../composables/map/useChurchConnectors";
import { useRecentSearches } from "../../composables/map/useRecentSearches";
import { useSearchIndex } from "../../composables/map/useSearchIndex";

const route = useRoute();
const router = useRouter();

const searchControl = ref(null);

// --- Sidebar / selección ---
const selectedChurch = ref(null);
let selectedMarker = null;

// --- Búsqueda ---
const { recentSearches, load: loadRecentSearches, save: saveSearch } =
  useRecentSearches(churches);
const searchItems = useSearchIndex(cities, churches);

// --- Mapa base ---
const {
  mapContainer,
  map,
  mapLoading,
  initMap,
  resetToSanJusto: resetMapToSanJusto
} = useMapInstance({
  cities,
  route,
  router,
  onMapClick: () => searchControl.value?.close()
});

// --- Markers y conectores ---
// Nota sobre el orden: useChurchConnectors necesita el mismo Map de
// churchMarkers que crea useChurchMarkers, pero useChurchMarkers necesita
// el callback onMarkerClick que llama a métodos de connectors. Para
// resolver esa dependencia circular, declaramos `connectors` primero y
// lo asignamos después de crear los markers; el callback solo se
// ejecuta con un click real del usuario (mucho después de que
// `connectors` ya esté asignado), así que el closure funciona bien.
let connectors;

const { churchMarkers, createMarkers, updateMarkersVisibility } =
  useChurchMarkers(map, churches, {
    onMarkerClick: selectChurch
  });

connectors = useChurchConnectors(map, churchMarkers, churches);

function selectChurch(church, marker) {
  // Click sobre la misma iglesia ya seleccionada -> cierra
  if (selectedChurch.value?.id === church.id) {
    closeSidebar();
    return;
  }

  // Había otra seleccionada -> le sacamos highlight antes de cambiar
  if (selectedChurch.value) {
    connectors.handleDeselect(selectedChurch.value, selectedMarker);
  }

  selectedChurch.value = church;
  selectedMarker = marker;
  connectors.handleSelect(church, marker);
}

// Solo deselecciona la iglesia (saca highlight y cierra el sidebar),
// sin tocar el buscador. Se usa en @focus de SearchControl: si acá
// llamáramos a closeSidebar() completo, se generaría un loop (ver
// handleFocus en SearchControl.vue), porque closeSidebar cierra el
// buscador y eso volvería a disparar lógica sobre el propio control
// que originó el evento.
function deselectChurch() {
  if (selectedChurch.value) {
    connectors.handleDeselect(selectedChurch.value, selectedMarker);
  }

  selectedChurch.value = null;
  selectedMarker = null;
}

// Cierra todo: buscador + iglesia seleccionada. Para click afuera del
// mapa, reset a San Justo, y selección de una ciudad en el buscador.
function closeSidebar() {
  searchControl.value?.close();
  deselectChurch();
}

function resetToSanJusto() {
  closeSidebar();
  resetMapToSanJusto();
}

function handleSelection(item) {
  if (!map.value) return;

  searchControl.value?.close();
  saveSearch(item);

  map.value.flyTo({
    center: item.center,
    zoom: item.zoom,
    speed: 1.2,
    essential: true
  });

  // Si es ciudad no abre sidebar
  if (item.type !== "church") {
    deselectChurch();
    return;
  }

  const churchId = item.church?.id;

  if (!churchId) {
    console.warn("La búsqueda no tiene church:", item);
    return;
  }

  const marker = churchMarkers.get(churchId);

  if (!marker) {
    console.warn("No existe marker para:", item.church);
    return;
  }

  selectChurch(item.church, marker);
}

onMounted(() => {
  loadRecentSearches();

  window.addEventListener("church-route", event => {
    router.push(`/iglesias/${event.detail}`);
  });

  // Ya no hace falta distinguir "click en marker" vs "click afuera":
  // el click del marker hace stopPropagation en useChurchMarkers.js,
  // así que si este handler se dispara, siempre es un click afuera
  // (mapa vacío, o sobre el propio sidebar si no le pusiste stopPropagation ahí).
  mapContainer.value.addEventListener(
    "click",
    () => closeSidebar(),
    true // fase de captura: corre antes que el click interno de maplibre
  );

  // El callback acá adentro corre en el momento equivalente al que tenía
  // el código original: dentro del handler "load" del mapa, justo antes
  // de esperar a "idle" para sacar el overlay de carga.
  initMap(() => {
    connectors.addConnectorLinesLayer();
    updateMarkersVisibility();
  });

  createMarkers();
});
</script>

<style scoped>
/* Reutiliza los mismos tokens de layout que HomeView (--container-width,
   --space-*) para mantener consistencia visual si se integra ahí. */
.church-map-section {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: 48px 24px;
}

.church-map-head,
.map-card {
  max-width: var(--container-width, 1180px);
  margin-left: auto;
  margin-right: auto;
}

.church-map-head {
  text-align: center;
  margin-bottom: 28px;
}

.church-map-head h1 {
  margin: 0 0 10px;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: var(--dio-primary-900);
}

.church-map-head p {
  max-width: 560px;
  margin: 0 auto;
  color: var(--dio-primary-900);
  font-size: 1.05rem;
  line-height: 1.6;
}

.map-card {
  padding: 12px;
  background: var(--dio-white);
  border-radius: 24px;
  border: 1px solid var(--dio-stone-200);
  box-shadow: 0 10px 30px rgba(58, 18, 32, 0.15);
}

.map-wrapper {
  position: relative;
}

.controls-row {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 9999;

  display: flex;
  align-items: flex-start;
  gap: 8px;
}

@media (max-width: 600px) {
  .controls-row {
    width: auto;
  }

  .reset-button {
    width: 44px;
    height: 44px;
  }
}

.reset-button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;
  flex-shrink: 0;

  border-radius: 12px;
  border: 0;
  background: var(--dio-white);

  cursor: pointer;
  transition: background 0.15s ease;

  box-shadow: 0 4px 15px rgba(58, 18, 32, 0.18);
}

.reset-button:hover {
  background: var(--dio-stone-50);
}

.map-container {
  position: relative;

  width: 100%;
  height: 60vh;
  min-height: 350px;
  max-height: 700px;

  border-radius: var(--radius);
  overflow: hidden;

  border: 1px solid var(--dio-stone-200);

  box-shadow: var(--shadow);

  container-type: inline-size;
  container-name: map;
}

.map-inner {
  width: 100%;
  height: 100%;

  background: var(--dio-stone-50);
  opacity: 0;
  transition: opacity 0.35s ease;
}

.map-container:not(.is-loading) .map-inner {
  opacity: 1;
}

.map-loading-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  background: var(--dio-stone-50);
  color: var(--dio-ink-600);
  font-size: 14px;
}

.spinner {
  width: 32px;
  height: 32px;

  border: 3px solid var(--dio-stone-200);
  border-top-color: var(--dio-gold);
  border-radius: 50%;

  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 600px) {
  .church-map-section {
    padding: 32px 15px;
  }
}

@media (max-width: 768px) {
  .map-card {
    padding: 8px;
    border-radius: 18px;
  }
}
</style>