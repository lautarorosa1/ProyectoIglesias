import { createApp } from "vue";
import * as maplibregl from "maplibre-gl";

import ChurchPopup from "./ChurchPopup.vue";
import churchIcon from "@/assets/icons/church-marker.svg";


function createChurchPopup(church){

  const container =
    document.createElement("div");


  createApp(
    ChurchPopup,
    {
      church
    }
  )
  .mount(container);



  return new maplibregl.Popup({

    offset:25,

    maxWidth:"300px",

    className:"church-popup-container"

  })
  .setDOMContent(container);

}



export function createChurchMarker(map, church){


  const element =
    document.createElement("div");


  element.className =
    "church-marker";



  const img =
    document.createElement("img");


  img.src = churchIcon;

  img.alt = church.nombre;


  element.appendChild(img);




  const popup =
    createChurchPopup(church);




  const marker =
    new maplibregl.Marker({

      element

    })
    .setLngLat([

      church.lng,

      church.lat

    ])
    .setPopup(popup)
    .addTo(map);




  // guardamos el popup directamente
  marker.popup = popup;



  return marker;

}