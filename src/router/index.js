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
    // Link con hash (ej: /#agenda): scroll suave al elemento,
    // excepto al volver desde el detalle de iglesia, que salta directo
    if (to.hash) {
      const instant = from.name === "church-detail";
      return { el: to.hash, behavior: instant ? "auto" : "smooth" };
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