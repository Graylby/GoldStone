<script setup lang="ts">
import NavMenu from "./components/Nav/NavMenu.vue";
import NavInfo from "@/components/Nav/NavInfo.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const hasNav = computed(() => {
  return route.meta.hasNav;
});
const hasTabBar = computed(() => {
  return route.meta.hasTabBar;
});
</script>

<template>
  <nav-info v-if="hasNav" />
  <router-view />
  <nav-menu v-if="hasTabBar" />
</template>

<style scoped></style>
