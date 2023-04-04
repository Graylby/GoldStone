<template>
  <div class="nav-box">
    <nut-navbar @on-click-back="onBack" :title="title">
      <template #left>
        <i class="iconfont icon-back"/>
      </template>
      <template #right>
        <span style="width: 20px"/>
      </template>
    </nut-navbar>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {store} from "@/store/store";

const router = useRouter()
const title = store.navTitle;
const onBack = () => {
  router.back();
}
</script>

<style scoped lang="scss">
$fontSize: 20px;
.nav-box {
  position: sticky;
  top: 0;
  z-index: 999;
  height: 50px;
  width: 100%;
  background: #ffffff;
  margin-bottom: 10px;

  .nut-navbar {
    :deep(.nut-navbar__left) {
      color: #1a1a1a;

      .iconfont {
        font-size: $fontSize;
        height: $fontSize;
        line-height: $fontSize;
      }
    }

    :deep(.nut-navbar__title) {
      font-weight: bold;

      .title {
        font-size: $fontSize;
        height: $fontSize;
        line-height: $fontSize;
      }
    }
  }
}
</style>
