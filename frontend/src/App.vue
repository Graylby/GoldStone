<script setup lang="ts">
import NavMenu from "./components/Nav/NavMenu.vue";
import NavInfo from "@/components/Nav/NavInfo.vue";</script>

<template>
  <nav-info v-if="this.$route.meta.hasNav"/>
  <router-view/>
  <nav-menu v-if="this.$route.meta.hasTabBar"/>

</template>

<style scoped>

</style>
