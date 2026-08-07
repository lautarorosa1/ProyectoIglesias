<template>
  <div class="map-wrapper">
    <div class="controls-row">
      <SearchControl
        ref="searchControl"
        :items="searchItems"
        :recent="recentSearches"
        @select="handleSelection"
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

    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as maplibregl from "maplibre-gl";

import SearchControl from "./SearchControl.vue";

import { churches } from "../../data/churches";
import { cities } from "../../data/cities";
import sanJustoBoundary from "../../data/sanJustoBoundary.json";

import { createChurchMarker } from "./ChurchMarker";

const router = useRouter();

const mapContainer = ref(null);
const map = ref(null);
const searchControl = ref(null);

const churchMarkers = new Map();

const recentSearches = ref([]);
const activePopup = ref(null);

let sanJustoBounds = null;

const searchItems = [
  ...cities.map(city => ({
    type: "city",
    name: city.name,
    center: city.center,
    zoom: city.zoom
  })),

  ...churches.map(church => ({
    type: "church",
    name: church.nombre,
    center: [church.lng, church.lat],
    zoom: 16,
    church
  }))
];

function loadRecentSearches() {
  const saved = localStorage.getItem("recentSearches");

  if (saved) {
    recentSearches.value = JSON.parse(saved);
  }
}

function saveSearch(item) {
  const search = {
    name: item.name,
    type: item.type,
    center: item.center,
    zoom: item.zoom,
    church:
      item.type === "church"
        ? churches.find(c => c.nombre === item.name)
        : null
  };

  recentSearches.value = recentSearches.value.filter(
    x => x.name !== item.name
  );

  recentSearches.value.unshift(search);

  recentSearches.value = recentSearches.value.slice(0, 3);

  localStorage.setItem(
    "recentSearches",
    JSON.stringify(recentSearches.value)
  );
}

function handleSelection(item) {
  console.log("ITEM SELECCIONADO:", item);

  if (!map.value) return;

  searchControl.value?.close();

  saveSearch(item);

  if (activePopup.value) {
    activePopup.value.remove();
    activePopup.value = null;
  }

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

  console.log("MARKER ENCONTRADO:", marker);

  if (!marker) {
    console.warn("No existe marker para:", item.church);
    return;
  }

  marker.togglePopup();

  activePopup.value = marker.getPopup();

  activePopup.value.once("close", () => {
    activePopup.value = null;
  });
}

function getBoundsFromGeoJSON(feature) {
  const bounds = new maplibregl.LngLatBounds();

  const coords = feature.geometry.coordinates;
  const type = feature.geometry.type;

  const flat =
    type === "Polygon"
      ? coords.flat(1)
      : coords.flat(2); // MultiPolygon

  flat.forEach(([lng, lat]) => bounds.extend([lng, lat]));

  return bounds;
}

function resetToSanJusto() {
  if (!map.value || !sanJustoBounds) return;

  searchControl.value?.close();

  if (activePopup.value) {
    activePopup.value.remove();
    activePopup.value = null;
  }

  map.value.fitBounds(sanJustoBounds, {
    padding: 20,
    duration: 800
  });
}

onMounted(() => {
  loadRecentSearches();

  window.addEventListener("church-route", event => {
    router.push(`/iglesias/${event.detail}`);
  });

  map.value = new maplibregl.Map({
    container: mapContainer.value,
    style: "https://api.maptiler.com/maps/streets-v2/style.json?key=YXNpv1WfoxF5DLwD3255",
    center: [-62.0, -31.3],
    zoom: window.innerWidth < 768 ? 12 : 13
  });

  map.value.addControl(new maplibregl.NavigationControl(), "top-right");

  map.value.on("click", () => {
    searchControl.value?.close();
  });

  // NUEVO: agregar el contorno de San Justo
  map.value.on("load", () => {
    map.value.addSource("san-justo", {
      type: "geojson",
      data: sanJustoBoundary
    });

    map.value.addLayer({
      id: "san-justo-fill",
      type: "fill",
      source: "san-justo",
      paint: {
        "fill-color": "#2563eb",
        "fill-opacity": 0.06
      }
    });

    map.value.addLayer({
      id: "san-justo-outline",
      type: "line",
      source: "san-justo",
      paint: {
        "line-color": "#2563eb",
        "line-width": 2
      }
    });

    sanJustoBounds = getBoundsFromGeoJSON(sanJustoBoundary);
    map.value.fitBounds(sanJustoBounds, {
      padding: 20,
      duration: 0 // sin animación al cargar
    });
  });

  churches.forEach(church => {
    const marker = createChurchMarker(map.value, church);
    churchMarkers.set(church.id, marker);
  });
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
  width: 100%;
  height: 60vh;
  min-height: 350px;
  max-height: 700px;

  border-radius: var(--radius);
  overflow: hidden;

  border: 1px solid var(--color-border);

  box-shadow: var(--shadow);
}

@media (max-width: 600px) {
  .controls-row {
    width: calc(100% - 30px);
  }
}
</style>