import { createApp } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./style.css";
import "./assets/iconfont.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import App from "./App.vue";
import router from "./router";
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:7001", { path: "/socketIo" });
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.provide("socket", socket);
app.use(router);
app.mount("#app");
