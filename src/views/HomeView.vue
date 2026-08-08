<template>
  <main class="home">

    <section class="hero">
      <h1>
        Mapa de Iglesias
      </h1>

      <p>
        Explora las iglesias de la Diosecis de San Francisco
      </p>
    </section>


    <section class="map-card">
      <ChurchMap />
    </section>

  </main>
</template>

<script setup>
import ChurchMap from "@/components/map/ChurchMap.vue"
</script>
