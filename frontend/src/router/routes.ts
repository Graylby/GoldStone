import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "home",
    path: "/",
    component: () => import("../pages/home/home.vue"),
    meta: {
      hasTabBar: true,
    },
  },
  {
    name: "detail",
    path: "/detail",
    component: () => import("../pages/home/stuffDetail.vue"),
    meta: {
      hasInfo: true,
    },
  },
  {
    name: "store",
    path: "/store",
    component: () => import("../pages/store/store.vue"),
    meta: {
      hasTabBar: true,
    },
  },
  {
    name: "newStuff",
    path: "/store/new",
    component: () => import("../pages/store/newStuff.vue"),
  },
  {
    name: "cheat",
    path: "/cheat",
    component: () => import("../pages/messages/cheat.vue"),
    meta: {
      hasTabBar: true,
    },
  },
  {
    name: "account",
    path: "/account",
    component: () => import("../pages/account/account.vue"),
    meta: {
      hasTabBar: true,
    },
  },
  {
    name: "login",
    path: "/login",
    component: () => import("../pages/login/login.vue"),
  },
];
export default routes;
