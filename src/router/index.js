import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/marvel",
      name: "marvel",
      component: () => import("../views/MarvelView.vue"),
    },
    {
      path: "/marvel/:id",
      name: "character",
      component: () => import("../views/MarvelCharacterDetailsView.vue"),
    },
  ],
});

export default router;
