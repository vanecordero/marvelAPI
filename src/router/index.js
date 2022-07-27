import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "marvel",
      component: () => import("../views/MarvelView.vue"),
    },
    {
      path: "/character/:id",
      name: "character",
      component: () => import("../views/MarvelCharacterDetailsView.vue"),
    },
  ],
});

export default router;
