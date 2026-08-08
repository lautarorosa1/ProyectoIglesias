import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import ChurchDetailView from "@/views/ChurchDetailView.vue";


const router = createRouter({
  history: createWebHistory(),

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
  ],
});


export default router;