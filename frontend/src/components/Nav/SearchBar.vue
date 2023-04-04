<template>
  <div class="search-box">
    <nut-navbar v-if="!isHome" @on-click-back="onBack" :left-show="true" class="top_nav" :title="targetName">
      <template #content>
        <nut-searchbar v-model="searchVal">
          <template v-slot:leftin>
            <i class="iconfont icon-search"/>
          </template>
        </nut-searchbar>
      </template>
    </nut-navbar>
    <nut-searchbar v-else v-model="searchVal">
      <template v-slot:leftin>
        <i class="iconfont icon-search"/>
      </template>
    </nut-searchbar>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

defineProps({
  isHome: {
    type: Boolean,
    require: false,
    default: false,
  }
})
const searchVal = ref('')
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
