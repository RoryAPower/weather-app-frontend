import { createRouter, createWebHistory } from "vue-router";
import Base from "@/layouts/Base.vue";

const routes = [
  {
    path: "/",
    component: Base,
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "weather/:id",
        name: "Weather",
        component: () => import("@/views/Weather.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
