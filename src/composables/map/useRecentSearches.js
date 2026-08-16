import { ref } from "vue";

const STORAGE_KEY = "recentSearches";
const MAX_ITEMS = 3;

/**
 * Maneja el historial de búsquedas recientes (ciudades e iglesias)
 * persistido en localStorage.
 *
 * @param {Array} churches - lista completa de iglesias (data/churches.js)
 */
export function useRecentSearches(churches) {
  const recentSearches = ref([]);

  function load() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      recentSearches.value = JSON.parse(saved);
    }
  }

  function save(item) {
    const search = {
      name: item.name,
      type: item.type,
      center: item.center,
      zoom: item.zoom,
      // Usamos item.church directamente (ya viene correcto desde
      // useSearchIndex) en vez de volver a buscar por nombre, porque
      // hay iglesias homónimas en ciudades distintas (ej. "San Roque"
      // en San Francisco y en Quebracho Herrado) y find() por nombre
      // siempre devolvía la primera coincidencia del array.
      church: item.type === "church" ? item.church : null
    };

    const withoutDuplicate = recentSearches.value.filter(
      x => x.name !== item.name
    );

    recentSearches.value = [search, ...withoutDuplicate].slice(0, MAX_ITEMS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches.value));
  }

  return { recentSearches, load, save };
}