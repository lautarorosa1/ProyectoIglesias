import { createChurchMarker } from "../../lib/map/ChurchMarker";
import { SECONDARY_VISIBLE_ZOOM } from "./constants"

/**
 * Crea los markers de iglesias sobre el mapa y controla su visibilidad
 * según el zoom (las secundarias solo se muestran a partir de cierto nivel).
 *
 * No conoce connector-lines ni highlight: eso se resuelve afuera via
 * los callbacks onPopupOpen / onPopupClose.
 *
 * @param {import('vue').Ref} map - ref al mapa de maplibre (de useMapInstance)
 * @param {Array} churches - lista completa de iglesias
 * @param {Object} [callbacks]
 * @param {Function} [callbacks.onPopupOpen] - (church, marker, popup) => void
 * @param {Function} [callbacks.onPopupClose] - (church, marker, popup) => void
 */
export function useChurchMarkers(map, churches, { onPopupOpen, onPopupClose } = {}) {
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
   * Crea todos los markers y los deja listos (incluye listeners de
   * popup y de zoom). Llamar justo después de que map.value exista
   * (no hace falta esperar al evento "load" del mapa).
   */
  function createMarkers() {
    churches.forEach(church => {
      const marker = createChurchMarker(map.value, church, churches);
      churchMarkers.set(church.id, marker);

      const popup = marker.getPopup();

      popup.on("open", () => {
        onPopupOpen?.(church, marker, popup);
      });

      popup.on("close", () => {
        onPopupClose?.(church, marker, popup);
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