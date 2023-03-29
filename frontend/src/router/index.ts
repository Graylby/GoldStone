import {
  createRouter,
  createWebHashHistory,
  onBeforeRouteUpdate,
} from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
onBeforeRouteUpdate((to) => {
  console.log("---", to);
});
export default router;
