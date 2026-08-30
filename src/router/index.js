import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import ChurchDetailView from "@/views/ChurchDetailView.vue";

const router = createRouter({
  history: createWebHistory(),

  scrollBehavior(to, from, savedPosition) {
    // Navegación con botones atrás/adelante: restaurar posición guardada
    if (savedPosition) {
      return savedPosition;
    }

    // Volviendo del detalle de iglesia con ?city=...: ChurchMap.vue se
    // encarga de hacer scroll a #mapa apenas se monta (onMounted), sin
    // esperar a que el mapa termine de cargar. No dejamos que el router
    // mueva el scroll acá, para no competir con eso.
    if (to.name === "home" && to.query.city) {
      return false;
    }

    // El router.replace interno de useMapInstance (limpia ?city= después
    // de usarlo) es una navegación home -> home. Tampoco debe tocar el
    // scroll: dejamos la página donde ChurchMap ya la puso.
    if (to.name === "home" && from.name === "home") {
      return false;
    }

    // Link con hash (ej: /#agenda): scroll suave al elemento
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }

    // Cualquier otra navegación: arrancar arriba de la página
    return { top: 0 };
  },

  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/iglesias/:id",
      name: "church-detail",
      component: ChurchDetailView,
    },
    {
      path: "/agenda",
      name: "agenda",
      component: () => import("@/views/AgendaView.vue"),
    },
  ],
});

export default router;