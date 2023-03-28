import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "home",
    path: "/",
    component: () => import("../pages/home.vue"),
    meta: {
      hasNav: true,
    },
  },
  {
    name: "store",
    path: "/store",
    component: () => import("../pages/store.vue"),
    meta: {
      hasNav: true,
    },
  },
  {
    name: "cheat",
    path: "/cheat",
    component: () => import("../pages/cheat.vue"),
    meta: {
      hasNav: true,
    },
  },
  {
    name: "account",
    path: "/account",
    component: () => import("../pages/account.vue"),
    meta: {
      hasNav: true,
    },
  },
  {
    name: "login",
    path: "/login",
    component: () => import("../pages/login/login.vue"),
  },
];
export default routes;
