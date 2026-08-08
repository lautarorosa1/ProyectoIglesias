import { createApp } from "vue";
import * as maplibregl from "maplibre-gl";

import ChurchPopup from "./ChurchPopup.vue";
import churchIcon from "@/assets/icons/church-marker.svg";
import churchIcon2 from "@/assets/icons/church-marker-small.svg";

const SECONDARY_OPACITY = 0.45;

function oppositeAnchor(from, to) {
  const dLng = to.lng - from.lng;
  const dLat = to.lat - from.lat;

  if (Math.abs(dLng) > Math.abs(dLat)) {
    return dLng > 0 ? "right" : "left"; // vecino al este -> popup abre a la izq
  }
  return dLat > 0 ? "top" : "bottom"; // vecino al norte -> popup abre hacia abajo
}

function computeAnchor(church, allChurches) {
  if (church.tipo === "secundaria") {
    const parent = allChurches.find(c => c.id === church.parentId);
    return parent ? oppositeAnchor(church, parent) : undefined;
  }

  const secundarias = allChurches.filter(
    c => c.tipo === "secundaria" && c.parentId === church.id
  );

  if (!secundarias.length) return undefined;

  const centroid = {
    lat: secundarias.reduce((s, c) => s + c.lat, 0) / secundarias.length,
    lng: secundarias.reduce((s, c) => s + c.lng, 0) / secundarias.length
  };

  return oppositeAnchor(church, centroid);
}

function createChurchPopup(church, anchor) {
  const container = document.createElement("div");

  createApp(ChurchPopup, { church }).mount(container);

  return new maplibregl.Popup({
    offset: 25,
    maxWidth: "300px",
    className: "church-popup-container",
    anchor
  }).setDOMContent(container);
}

export function createChurchMarker(map, church, allChurches) {
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

  const anchor = computeAnchor(church, allChurches);
  const popup = createChurchPopup(church, anchor);

  const marker = new maplibregl.Marker({ element })
    .setLngLat([church.lng, church.lat])
    .setPopup(popup)
    .addTo(map);

  marker.popup = popup;

  marker.setOpaque = (opaque) => {
    if (!isSecondary) return;
    element.style.opacity = opaque ? String(SECONDARY_OPACITY) : "1";
  };

  return marker;
}