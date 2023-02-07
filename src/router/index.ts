import { createRouter, createWebHistory } from "vue-router";
import Base from "@/layouts/Base.vue";
import { useUserStore } from "@/stores/useUserStore";

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

router.beforeEach(async (to) => {
  const store = useUserStore();
  if (!store.isUserLoggedIn && to.name !== "Login") {
    return { name: "Login" };
  }
});

export default router;
