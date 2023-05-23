import {createApp} from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import './assets/iconfont.css';
import '@nutui/nutui/dist/style.css';
import './style.css';
import App from './App.vue';
import router from './router';

// const socket = io("http://127.0.0.1:7001", { path: "/socketIo" });
// const socket = io("http://82.156.23.40:7001", { path: "/socketIo" });
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// app.provide("socket", socket);
app.use(router);
app.mount("#app");
