<script setup lang="ts">
import NavMenu from "./components/NavMenu.vue";</script>

<template>
  <router-view/>
  <nav-menu v-if="this.$route.meta.hasNav"/>

</template>

<style scoped>

</style>
