<template>
  <div class="card_box">
    <div class="img_box"></div>
    <div class="text_box"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.card_box {
  padding: 0 10px;
  display: flex;

  .img_box {
    aspect-ratio: 1;
    height: 100px;
  }

  .text_box {
    flex: 1;
  }
}
</style>
