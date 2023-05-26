import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
import Cookie from "js-cookie";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const token = Cookie.get("token");
  if (to.name === "register") next();
  else if (to.name !== "login" && token === undefined) next({ name: "login" });
  else next();
});
export default router;
