<template>

  <div class="church-popup">

    <div class="church-popup-header">

      <img
        src="@/assets/icons/church-marker.svg"
        alt="Iglesia"
      />

      <h3>
        {{ church.nombre }}
      </h3>

    </div>


    <p>
      {{ church.descripcion }}
    </p>


    <button @click="goToChurch">
      Ver información
    </button>


  </div>

</template>



<script setup>


const props = defineProps({

  church:{
    type:Object,
    required:true
  }

});



function goToChurch(){

  window.dispatchEvent(

    new CustomEvent(
      "church-route",
      {
        detail:props.church.id
      }
    )

  );

}


</script>