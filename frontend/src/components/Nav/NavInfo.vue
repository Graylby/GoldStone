<template>
  <div class="nav-box">
    <nut-navbar @on-click-back="onBack" :title="title">
      <template #left>
        <i class="iconfont icon-back" />
      </template>
      <template #right>
        <span style="width: 20px" />
      </template>
    </nut-navbar>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { store } from "@/store/store";
import { ref, watch } from "vue";

const router = useRouter();
const title = ref(store.navTitle);
const onBack = () => {
  router.back();
};
watch(
  () => store.navTitle,
  async (newTitle) => {
    title.value = newTitle;
  }
);
</script>

<style scoped lang="scss">
$fontSize: 32px;
.nav-box {
  position: sticky;
  top: 0;
  z-index: 999;
  height: 32px;
  padding: 10px;
  background: #ffffff;
  box-shadow: #888888;
  //border-bottom: solid #fefefe 1px;
  //margin-bottom: 10px;

  .nut-navbar {
    height: $fontSize;
    margin: 0;
    padding: 0;
    box-shadow: none;
    background: #ffffff;

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
        font-size: calc($fontSize - 7px);
        height: $fontSize;
        line-height: $fontSize;
      }
    }
  }
}
</style>
