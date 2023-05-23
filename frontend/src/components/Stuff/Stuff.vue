<template>
  <div class="stuff-box">
    <nut-image class="img" :src="info.img" />
    <p class="des">{{ info.des }}</p>
    <p class="tag">
      <nut-tag v-for="v in info.tags" color="#E9E9E9" textColor="#999999">
        {{ v }}
      </nut-tag>
    </p>
  </div>
</template>

<script setup lang="ts">
import { StuffInfo } from "../../interface";

defineProps<{
  info: StuffInfo;
}>();
</script>

<style scoped lang="scss">
.stuff-box {
  .img :deep(.nut-img) {
    border-radius: 20px 20px 0 0;
  }

  .des {
    text-align: left;
    padding: 10px 10px 0 10px;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .tag {
    text-align: left;
    margin: 0;
    padding: 5px 10px 10px;
    color: #888888;

    .nut-tag {
      margin-right: 5px;
    }
  }
}
</style>
