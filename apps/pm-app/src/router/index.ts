import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/products", // Redirect root to products
  },
  {
    path: "/auth/login",
    name: "login",
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: "/auth/register",
    name: "register",
    component: () => import("../views/auth/Register.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/products/Products.vue"),
    // children: [
    //   {
    //     path: "settings",
    //     name: "settings",
    //     component: () => import("../views/products/Settings.vue"),
    //   },
    // ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  const isAuthenticated = localStorage.getItem("accessToken");
  const publicRoutes = ["login", "register"];

  if (!publicRoutes.includes(to.name as string) && !isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
