import { createChurchMarker } from "../../lib/map/ChurchMarker";
import { SECONDARY_VISIBLE_ZOOM } from "./constants"

/**
 * Crea los markers de iglesias sobre el mapa y controla su visibilidad
 * según el zoom (las secundarias solo se muestran a partir de cierto nivel).
 *
 * No conoce sidebar ni connector-lines: eso se resuelve afuera via
 * el callback onMarkerClick.
 *
 * @param {import('vue').Ref} map - ref al mapa de maplibre (de useMapInstance)
 * @param {Array} churches - lista completa de iglesias
 * @param {Object} [callbacks]
 * @param {Function} [callbacks.onMarkerClick] - (church, marker) => void
 */
export function useChurchMarkers(map, churches, { onMarkerClick } = {}) {
  const churchMarkers = new Map();

  function updateMarkersVisibility() {
    if (!map.value) return;

    const currentZoom = map.value.getZoom();

    churchMarkers.forEach((marker, churchId) => {
      const church = churches.find(c => c.id === churchId);
      const el = marker.getElement();

      if (church.tipo === "principal") {
        el.style.display = "block";
        return;
      }

      // Es secundaria: solo visible si hay suficiente zoom
      el.style.display = currentZoom >= SECONDARY_VISIBLE_ZOOM ? "block" : "none";
    });
  }

  /**
   * Crea todos los markers y los deja listos (incluye listener de
   * click y de zoom). Llamar justo después de que map.value exista
   * (no hace falta esperar al evento "load" del mapa).
   */
  function createMarkers() {
    churches.forEach(church => {
      const marker = createChurchMarker(map.value, church);
      churchMarkers.set(church.id, marker);

      marker.getElement().addEventListener("click", event => {
        event.stopPropagation();
        onMarkerClick?.(church, marker);
      });
    });

    map.value.on("zoom", updateMarkersVisibility);
  }

  return {
    churchMarkers,
    createMarkers,
    updateMarkersVisibility
  };
}