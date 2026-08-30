<template>
  <main class="church-detail">
    <section class="church-card">
      <div class="church-icon">
        <img 
            :src="churchIcon"
            alt="Iglesia"
        />
      </div>

      <h1>
        {{ church.nombre }}
      </h1>

      <div class="church-info">
        <p>
          Próximamente podrás ver aquí la historia, imágenes, ubicación y detalles de esta iglesia.
        </p>
      </div>

      <button @click="goBack">
        Volver al mapa
      </button>
    </section>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { churches } from "@/data/churches";
import churchIcon from "@/assets/icons/church-marker.svg";

const route = useRoute();
const router = useRouter();

const church = churches.find(
  (church) => church.id === Number(route.params.id)
);

function goBack() {
  router.push({ name: "home", query: { city: church.ciudad } });
}
</script>