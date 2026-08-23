/**
 * Maneja la fuente/layer "connector-lines" (las líneas punteadas entre
 * una iglesia principal y sus secundarias) y el highlight que se activa
 * al abrir un popup.
 *
 * Expone handlePopupOpen / handlePopupClose, pensados para pasarse
 * directamente como callbacks a useChurchMarkers.
 *
 * @param {import('vue').Ref} map - ref al mapa de maplibre (de useMapInstance)
 * @param {Map} churchMarkers - Map<churchId, marker> (de useChurchMarkers)
 * @param {Array} churches - lista completa de iglesias
 */

import { SECONDARY_VISIBLE_ZOOM } from "./constants"

export function useChurchConnectors(map, churchMarkers, churches) {
  function addConnectorLinesLayer() {
    map.value.addSource("connector-lines", {
      type: "geojson",
      data: { type: "FeatureCollection", features: [] }
    });

    map.value.addLayer({
      id: "connector-lines-layer",
      type: "line",
      source: "connector-lines",
      minzoom: SECONDARY_VISIBLE_ZOOM, // <-- clave: la layer no se renderiza por debajo de este zoom
      layout: { "line-cap": "round" },
      paint: {
        "line-color": "#2563eb",
        "line-width": 2,
        "line-dasharray": [2, 2],
        "line-opacity": 0.8
      }
    });
  }

  function buildConnectorLines(primaryChurch) {
    const secundarias = churches.filter(
      c => c.tipo === "secundaria" && c.parentId === primaryChurch.id
    );

    return {
      type: "FeatureCollection",
      features: secundarias.map(sec => ({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [sec.lng, sec.lat],
            [primaryChurch.lng, primaryChurch.lat]
          ]
        },
        properties: { secondaryId: sec.id, primaryId: primaryChurch.id }
      }))
    };
  }

  function setSecondariesOpacity(parentId, opaque) {
    churches
      .filter(c => c.tipo === "secundaria" && c.parentId === parentId)
      .forEach(c => {
        churchMarkers.get(c.id)?.setOpaque(opaque);
      });
  }

  function highlightPrimary(church) {
    if (!map.value?.getSource("connector-lines")) return;

    map.value.getSource("connector-lines").setData(buildConnectorLines(church));
    setSecondariesOpacity(church.id, false); // false = ya no opaca
  }

  function clearPrimaryHighlight(church) {
    if (map.value?.getSource("connector-lines")) {
      map.value
        .getSource("connector-lines")
        .setData({ type: "FeatureCollection", features: [] });
    }

    setSecondariesOpacity(church.id, true); // true = vuelve a opacarse
  }

  function highlightSecondaryConnector(church) {
    if (!map.value?.getSource("connector-lines")) return;

    const parent = churches.find(c => c.id === church.parentId);
    if (!parent) return;

    map.value.getSource("connector-lines").setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [church.lng, church.lat],
              [parent.lng, parent.lat]
            ]
          },
          properties: { secondaryId: church.id, primaryId: parent.id }
        }
      ]
    });
  }

  function clearConnectorLine() {
    if (map.value?.getSource("connector-lines")) {
      map.value
        .getSource("connector-lines")
        .setData({ type: "FeatureCollection", features: [] });
    }
  }

  // --- Callbacks para engancharse a useChurchMarkers ---

  function handlePopupOpen(church, marker) {
    if (church.tipo === "principal") {
      highlightPrimary(church);
    } else {
      marker.setOpaque(false);
      highlightSecondaryConnector(church);
    }
  }

  function handlePopupClose(church, marker) {
    if (church.tipo === "principal") {
      clearPrimaryHighlight(church);
    } else {
      marker.setOpaque(true);
      clearConnectorLine();
    }
  }

  return {
    addConnectorLinesLayer,
    handlePopupOpen,
    handlePopupClose
  };
}