<template>
  <div class="stuff-box">
    <nut-image class="img" :src="info.img"/>
    <p class="des">{{ info.des }}</p>
    <p class="degree">{{ info.degree }}</p>
  </div>
</template>

<script setup lang="ts">
import {StuffInfo} from '../interface';

defineProps<{
  info: StuffInfo
}>()
</script>

<style scoped lang="scss">
.stuff-box {
  .img :deep(.nut-img) {
    border-radius: 20px 20px 0 0;
  }

  .des {
    text-align: left;
    padding: 0 10px;
    margin: 0;
  }

  .degree {
    text-align: left;
    margin: 0;
    padding: 0 10px 10px;
    color: #888888;
  }
}
</style>
