<template>
  <div class="box">
    <div class="menu-item" v-for="m in menus" @click="onChangeActive(m)" :key="m.id">
      <i v-if="activeIndex !== m.id" :class="'iconfont icon-'+m.icon"/>
      <i v-else :class="'iconfont icon-'+m.activeIcon"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

interface Menu {
  id: string,
  name: string,
  icon: string,
  activeIcon: string,
}

const router = useRouter();
const route = useRoute()
const menus = ref([
  {
    id: 'home',
    name: '首页',
    icon: 'home',
    activeIcon: 'home-fill',
  },
  {
    id: 'store',
    name: '仓库',
    icon: 'store',
    activeIcon: 'store-fill',
  },
  {
    id: 'cheat',
    name: '聊天',
    icon: 'cheat',
    activeIcon: 'cheat-fill',
  },
  {
    id: 'account',
    name: '我的',
    icon: 'account',
    activeIcon: 'account-fill',
  },
])
const activeIndex = ref('home')

const onChangeActive = (menu: Menu) => {
  if (activeIndex.value === menu.id) return;
  activeIndex.value = menu.id;
  router.push({
    name: menu.id
  })
}
const init = () => {
  const name = String(route.name)
  activeIndex.value = name;
  console.log(route.name)
}
watch(
    () => route.name,
    (newName: any) => {
      activeIndex.value = newName
    }
)
init();
</script>

<style scoped lang="scss">
.box {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 80px;
  width: 100%;
  display: flex;
  border-top: solid 1px gainsboro;
  backdrop-filter: saturate(50%) blur(4px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);
  $iconSize: 40px;
  $menuHeight: 80px;

  .menu-item {
    flex-grow: 1;

    .iconfont {
      font-size: $iconSize;
      line-height: $menuHeight;
    }
  }
}
</style>
