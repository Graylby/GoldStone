<template>
  <div class="box">
    <div class="content"></div>
    <div class="edit-area"></div>
  </div>
</template>

<script setup lang="ts">
import { store } from "@/store/store";

console.log(store);
</script>

<style scoped lang="scss">
.box {
  position: absolute;
  top: 52px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
  }

  .edit-area {
    height: 60px;
  }
}
</style>
