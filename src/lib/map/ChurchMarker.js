import * as maplibregl from "maplibre-gl";

import churchIcon from "@/assets/icons/church-marker.svg";
import churchIcon2 from "@/assets/icons/church-marker-small.svg";

const SECONDARY_OPACITY = 0.45;

export function createChurchMarker(map, church) {
  const isSecondary = church.tipo === "secundaria";

  const element = document.createElement("div");
  element.className = isSecondary
    ? "church-marker church-marker--secondary"
    : "church-marker church-marker--principal";

  const img = document.createElement("img");
  img.src = isSecondary ? churchIcon2 : churchIcon;
  img.alt = church.nombre;

  element.appendChild(img);

  if (isSecondary) {
    element.style.opacity = String(SECONDARY_OPACITY);
    element.style.transition = "opacity 0.25s ease";
  }

  const marker = new maplibregl.Marker({ element })
    .setLngLat([church.lng, church.lat])
    .addTo(map);

  marker.setOpaque = (opaque) => {
    if (!isSecondary) return;
    element.style.opacity = opaque ? String(SECONDARY_OPACITY) : "1";
  };

  return marker;
}