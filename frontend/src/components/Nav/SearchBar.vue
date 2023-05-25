<template>
  <div class="search-box">
    <nut-navbar v-if="!isHome" :left-show="true" class="top_nav">
      <template #content>
        <nut-searchbar v-model="searchVal">
          <template v-slot:leftin>
            <i class="iconfont icon-search" />
          </template>
        </nut-searchbar>
      </template>
    </nut-navbar>
    <nut-searchbar v-else v-model="searchVal" @search="search">
      <template v-slot:leftin>
        <i class="iconfont icon-search" />
      </template>
    </nut-searchbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({
  isHome: {
    type: Boolean,
    require: false,
    default: false,
  },
});
const emit = defineEmits(["search"]);
const searchVal = ref("");
const search = () => {
  emit("search", searchVal.value);
  searchVal.value = "";
};
</script>

<style scoped lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
  height: 50px;
  width: 100%;
  background: #ffffff;
  margin-bottom: 10px;
}
</style>
