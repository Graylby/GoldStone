import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";

const NutUIResolver = () => {
  return (name) => {
    if (name.startsWith("Nut")) {
      const partialName = name.slice(3);
      return {
        name: partialName,
        from: "@nutui/nutui",
        sideEffects: `@nutui/nutui/dist/packages/${partialName.toLowerCase()}/style`,
      };
    }
  };
};
export default defineConfig({
  plugins: [
    vue(),
    //    element 自动导入
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(), NutUIResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@nutui/nutui/dist/styles/variables.scss";`,
      },
    },
  },
  server: {
    host: "0.0.0.0",
    // https: {
    //   key: fs.readFileSync("keys/localhost+1-key.pem"), // 读取我们上面生成的公钥
    //   cert: fs.readFileSync("keys/localhost+1.pem"), // 读取我们上面生成的证书
    // },
    proxy: {
      "/api": {
        // target: "http://127.0.0.1:7001",
        target: "http://82.156.23.40:7001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
