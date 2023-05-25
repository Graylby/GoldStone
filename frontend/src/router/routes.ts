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
    path: "/detail/:id",
    component: () => import("../pages/home/stuffDetail.vue"),
    meta: {
      hasNav: true,
    },
  },
  {
    name: "user",
    path: "/user/:id",
    component: () => import("../pages/account/user.vue"),
    meta: {
      hasNav: true,
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
    name: "stuffEdit",
    path: "/stuff/edit",
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
    name: "message",
    path: "/message/:id",
    component: () => import("../pages/messages/messages.vue"),
    meta: {
      hasNav: true,
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
    name: "follow",
    path: "/follow/:type",
    component: () => import("../pages/account/follow.vue"),
    meta: {
      hasNav: true,
    },
  },
  {
    name: "login",
    path: "/login",
    component: () => import("../pages/login/login.vue"),
  },
  {
    name: "register",
    path: "/register",
    component: () => import("../pages/login/register.vue"),
  },
  {
    name: "adminLogin",
    path: "/admin/login",
    component: () => import("../pages/admin/login.vue"),
  },
  {
    name: "admin",
    path: "/admin",
    component: () => import("../pages/admin/home.vue"),
    children: [
      {
        name: "dashboard",
        path: "/admin/dashboard",
        component: () => import("../pages/admin/dashboard.vue"),
      },
      {
        name: "service",
        path: "/admin/service",
        component: () => import("../pages/admin/service.vue"),
      },
      {
        name: "users",
        path: "/admin/users",
        component: () => import("../pages/admin/users.vue"),
      },
    ],
  },
];
export default routes;
