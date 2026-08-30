import { ref } from "vue";
import * as maplibregl from "maplibre-gl";

import sanJustoBoundary from "../../data/sanJustoBoundary.json";

// TODO: mover a variable de entorno (import.meta.env.VITE_MAPTILER_KEY)
// en vez de tenerla hardcodeada acá. La dejamos igual por ahora para
// no cambiar comportamiento en este paso de la refactor.
const MAPTILER_STYLE_URL =
  "https://api.maptiler.com/maps/streets-v2/style.json?key=YXNpv1WfoxF5DLwD3255";

function getBoundsFromGeoJSON(feature) {
  const bounds = new maplibregl.LngLatBounds();

  const coords = feature.geometry.coordinates;
  const type = feature.geometry.type;

  const flat = type === "Polygon" ? coords.flat(1) : coords.flat(2); // MultiPolygon

  flat.forEach(([lng, lat]) => bounds.extend([lng, lat]));

  return bounds;
}

/**
 * Crea y configura la instancia base del mapa: estilo, boundary de
 * San Justo, vista inicial (según ?city= en la ruta) y estado de loading.
 *
 * No maneja markers de iglesias ni connector-lines: eso vive en
 * useChurchMarkers y useChurchConnectors, que se enganchan al `map`
 * que este composable expone.
 *
 * @param {Object} options
 * @param {Array} options.cities - lista de ciudades (data/cities.js)
 * @param {Object} options.route - instancia de vue-router (useRoute())
 * @param {Object} options.router - instancia de vue-router (useRouter())
 * @param {Function} [options.onMapClick] - callback al clickear el mapa (ej. cerrar buscador)
 */
export function useMapInstance({ cities, route, router, onMapClick }) {
  const mapContainer = ref(null);
  const map = ref(null);
  const mapLoading = ref(true);

  let sanJustoBounds = null;

  function resetToSanJusto() {
    if (!map.value || !sanJustoBounds) return;

    map.value.fitBounds(sanJustoBounds, {
      padding: 55,
      duration: 800
    });
  }

  function setInitialView() {
  sanJustoBounds = getBoundsFromGeoJSON(sanJustoBoundary);

  const targetCityName = route.query.city ?? null;
  const targetCity = targetCityName
    ? cities.find(c => c.name === targetCityName)
    : null;

  if (targetCity) {
    map.value.jumpTo({
      center: targetCity.center,
      zoom: targetCity.zoom
    });
    router.replace({ query: {}, hash: route.hash });
  } else {
    map.value.fitBounds(sanJustoBounds, {
      padding: 55,
      duration: 0
    });
  }
}

  function addSanJustoBoundaryLayer() {
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
  }

  /**
   * Crea el mapa. mapContainer.value debe existir (llamar en onMounted,
   * con el ref ya montado en el template).
   *
   * @param {Function} [onIdle] - callback extra a correr una vez que el
   *   mapa terminó de renderizar (tiles + fitBounds), antes de sacar
   *   el overlay de loading. Útil para que otros composables (markers)
   *   corran su estado inicial en el momento justo.
   */
  function initMap(onIdle) {
    map.value = new maplibregl.Map({
      container: mapContainer.value,
      style: MAPTILER_STYLE_URL,
      center: [-62.0, -31.3],
      zoom: window.innerWidth < 768 ? 12 : 13
    });

    if (onMapClick) {
      map.value.on("click", onMapClick);
    }

    map.value.on("load", () => {
      addSanJustoBoundaryLayer();
      setInitialView();

      onIdle?.();

      map.value.once("idle", () => {
        mapLoading.value = false;
      });
    });
  }

  return {
    mapContainer,
    map,
    mapLoading,
    initMap,
    resetToSanJusto
  };
}