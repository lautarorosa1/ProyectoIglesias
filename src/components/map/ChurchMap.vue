<template>
  <div class="map-wrapper">
    <div class="controls-row">
      <SearchControl
        ref="searchControl"
        :items="searchItems"
        :recent="recentSearches"
        @select="handleSelection"
        @focus="closeActivePopup"
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

    <div class="map-container" :class="{ 'is-loading': mapLoading }">
      <div v-if="mapLoading" class="map-loading-overlay">
        <div class="spinner"></div>
        <p>Cargando mapa...</p>
      </div>

      <div ref="mapContainer" class="map-inner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import SearchControl from "./SearchControl.vue";

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
const activePopup = ref(null);

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

function closeActivePopup() {
  if (activePopup.value) {
    activePopup.value.remove();
    activePopup.value = null;
  }
}

// --- Markers y conectores ---
// Nota sobre el orden: useChurchConnectors necesita el mismo Map de
// churchMarkers que crea useChurchMarkers, pero useChurchMarkers necesita
// los callbacks de popup que llaman a los métodos de connectors. Para
// resolver esa dependencia circular, declaramos `connectors` primero y
// lo asignamos después de crear los markers; los callbacks solo se
// ejecutan cuando el usuario abre/cierra un popup (mucho después de que
// `connectors` ya esté asignado), así que el closure funciona bien.
let connectors;

const { churchMarkers, createMarkers, updateMarkersVisibility } =
  useChurchMarkers(map, churches, {
    onPopupOpen: (church, marker, popup) => {
      activePopup.value = popup;
      connectors.handlePopupOpen(church, marker);
    },
    onPopupClose: (church, marker, popup) => {
      if (activePopup.value === popup) {
        activePopup.value = null;
      }
      connectors.handlePopupClose(church, marker);
    }
  });

connectors = useChurchConnectors(map, churchMarkers, churches);

function resetToSanJusto() {
  searchControl.value?.close();
  closeActivePopup();
  resetMapToSanJusto();
}

function handleSelection(item) {

  if (!map.value) return;

  searchControl.value?.close();

  saveSearch(item);

  closeActivePopup();

  map.value.flyTo({
    center: item.center,
    zoom: item.zoom,
    speed: 1.2,
    essential: true
  });

  // Si es ciudad no abre popup
  if (item.type !== "church") return;

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

  marker.togglePopup();

  // Ya no hace falta setear activePopup acá:
  // el callback onPopupOpen (de useChurchMarkers) se encarga de eso.
}

onMounted(() => {
  loadRecentSearches();

  window.addEventListener("church-route", event => {
    router.push(`/iglesias/${event.detail}`);
  });

  mapContainer.value.addEventListener(
    "click",
    event => {
      const markerEl = event.target.closest(".church-marker");

      if (markerEl) {
        let clickedMarker = null;
        churchMarkers.forEach(marker => {
          if (marker.getElement() === markerEl) clickedMarker = marker;
        });

        // Si es el mismo marker del popup activo, dejamos que su propio
        // toggle se encargue de cerrarlo (no interferimos).
        if (clickedMarker && clickedMarker.popup === activePopup.value) {
          return;
        }
      }

      closeActivePopup();
    },
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
  background: white;

  cursor: pointer;
  transition: background 0.15s ease;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.18);
}

.reset-button:hover {
  background: #f5f5f5;
}

.map-container {
  position: relative;

  width: 100%;
  height: 60vh;
  min-height: 350px;
  max-height: 700px;

  border-radius: var(--radius);
  overflow: hidden;

  border: 1px solid var(--color-border);

  box-shadow: var(--shadow);

  container-type: inline-size;
  container-name: map;
}

.map-inner {
  width: 100%;
  height: 100%;

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

  background: #f5f5f5;
  color: #666;
  font-size: 14px;
}

.spinner {
  width: 32px;
  height: 32px;

  border: 3px solid #ddd;
  border-top-color: #2563eb;
  border-radius: 50%;

  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 600px) {
  .controls-row {
    width: calc(100% - 30px);
  }
}
</style>