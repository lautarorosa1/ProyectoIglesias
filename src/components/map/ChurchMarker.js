import { createApp } from "vue";
import * as maplibregl from "maplibre-gl";

import ChurchPopup from "./ChurchPopup.vue";
import churchIcon from "@/assets/icons/church-marker.svg";
import churchIcon2 from "@/assets/icons/church-marker-small.svg";

const SECONDARY_OPACITY = 0.45;

function createChurchPopup(church) {
  const container = document.createElement("div");

  createApp(ChurchPopup, { church }).mount(container);

  return new maplibregl.Popup({
    offset: 25,
    maxWidth: "300px",
    className: "church-popup-container"
  }).setDOMContent(container);
}

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

  // Las secundarias arrancan "apagadas"
  if (isSecondary) {
    element.style.opacity = String(SECONDARY_OPACITY);
    element.style.transition = "opacity 0.25s ease";
  }

  const popup = createChurchPopup(church);

  const marker = new maplibregl.Marker({ element })
    .setLngLat([church.lng, church.lat])
    .setPopup(popup)
    .addTo(map);

  marker.popup = popup;

  // El mapa usa esto para iluminar/apagar la secundaria
  // cuando se selecciona (o deselecciona) su principal.
  marker.setOpaque = (opaque) => {
    if (!isSecondary) return;
    element.style.opacity = opaque ? String(SECONDARY_OPACITY) : "1";
  };

  return marker;
}