<template>
  <div class="map-wrapper">

    <SearchControl
      ref="searchControl"
      :items="searchItems"
      :recent="recentSearches"
      @select="handleSelection"
    />

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

import { createChurchMarker } from "./ChurchMarker";



const router = useRouter();



const mapContainer = ref(null);

const map = ref(null);

const searchControl = ref(null);



const churchMarkers = new Map();



const recentSearches = ref([]);



const activePopup = ref(null);





const searchItems = [

  ...cities.map(city => ({

    type:"city",

    name:city.name,

    center:city.center,

    zoom:city.zoom

  })),



  ...churches.map(church => ({

    type:"church",

    name:church.nombre,

    center:[

      church.lng,

      church.lat

    ],

    zoom:16,

    church:church

  }))

];







function loadRecentSearches(){


  const saved =
    localStorage.getItem(
      "recentSearches"
    );


  if(saved){

    recentSearches.value =
      JSON.parse(saved);

  }


}









function saveSearch(item){


  const search = {

    name:item.name,

    type:item.type,

    center:item.center,

    zoom:item.zoom,

    church:

      item.type === "church"

      ? churches.find(
          c => c.nombre === item.name
        )

      : null

  };



  recentSearches.value =

    recentSearches.value.filter(

      x => x.name !== item.name

    );




  recentSearches.value.unshift(search);



  recentSearches.value =

    recentSearches.value.slice(0,3);




  localStorage.setItem(

    "recentSearches",

    JSON.stringify(
      recentSearches.value
    )

  );


}









function handleSelection(item){


  console.log(
    "ITEM SELECCIONADO:",
    item
  );



  if(!map.value)
    return;




  searchControl.value?.close();




  saveSearch(item);






  if(activePopup.value){

    activePopup.value.remove();

    activePopup.value = null;

  }







  map.value.flyTo({


    center:item.center,


    zoom:item.zoom,


    speed:1.2,


    essential:true


  });









  // Si es ciudad no abre popup

  if(item.type !== "church")
    return;








  const churchId =

  item.church?.id;


if(!churchId){

  console.warn(
    "La búsqueda no tiene church:",
    item
  );

  return;

}



const marker =

  churchMarkers.get(

    churchId

  );






  console.log(

    "MARKER ENCONTRADO:",

    marker

  );






  if(!marker){


    console.warn(

      "No existe marker para:",

      item.church

    );


    return;

  }









  marker.togglePopup();





  activePopup.value =

    marker.getPopup();





  activePopup.value.once(

    "close",

    ()=>{


      activePopup.value = null;


    }

  );



}









onMounted(()=>{



  // Limpiar búsquedas viejas
  // Descomentar solo una vez si hay problemas
  // localStorage.removeItem("recentSearches")



  loadRecentSearches();







  window.addEventListener(

    "church-route",

    event => {


      router.push(

        `/iglesias/${event.detail}`

      );


    }

  );








  map.value =

    new maplibregl.Map({



      container:

        mapContainer.value,



      style:

      "https://api.maptiler.com/maps/streets-v2/style.json?key=YXNpv1WfoxF5DLwD3255",




      center:[

        -62.08596,

        -31.42757

      ],




      zoom:

        window.innerWidth < 768

        ? 12

        : 13


    });









  map.value.addControl(

    new maplibregl.NavigationControl(),

    "top-right"

  );








  map.value.on(

    "click",

    ()=>{

      searchControl.value?.close();

    }

  );









  churches.forEach(church=>{



    const marker =

      createChurchMarker(

        map.value,

        church

      );




    churchMarkers.set(

      church.id,

      marker

    );



  });






});



</script>







<style scoped>


.map-wrapper{

  position:relative;

}



.map-container{


  width:100%;


  height:60vh;


  min-height:350px;


  max-height:700px;



  border-radius:var(--radius);


  overflow:hidden;



  border:1px solid var(--color-border);



  box-shadow:var(--shadow);



}



</style>