<template>
  <div class="box">
    <div class="menu-item" v-for="m in menus" @click="onChangeActive(m)" :key="m.id">
      <div class="inner-item">
        <nut-badge :hidden="m.hasBadge" :value="8" :color="badgeColor">
          <i :class="'iconfont icon-'+m.icon"/>
        </nut-badge>
        <span>{{ m.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {computed, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

interface Menu {
  id: string,
  name: string,
  icon: string,
  hasBadge: boolean
}

const router = useRouter();
const route = useRoute()
const badgeColor = 'linear-gradient(315deg, rgba(73,143,242,1) 0%,rgba(73,101,242,1) 100%)'
const menusInfo = [
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
]
const activeIndex = ref('home')
const menus = computed(() => {
  return menusInfo.map(v => {
    const menu = <Menu>{
      id: v.id,
      name: v.name,
      icon: '',
    }
    menu.icon = v.id === activeIndex.value ? v.activeIcon : v.icon;
    menu.hasBadge = v.id !== 'cheat'
    return menu;
  })
})

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
  $iconSize: 40px;
  $menuHeight: 80px;
  position: fixed;
  bottom: 0;
  left: 0;
  height: $menuHeight;
  width: 100%;
  display: flex;
  border-top: solid 1px gainsboro;
  backdrop-filter: saturate(50%) blur(8px);
  -webkit-backdrop-filter: saturate(50%) blur(4px);

  .menu-item {
    flex-grow: 1;


    .inner-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: $menuHeight;

      .iconfont {
        height: $iconSize;
        width: $iconSize;
        font-size: $iconSize;
        line-height: $iconSize;
      }
    }

  }
}
</style>
