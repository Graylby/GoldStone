<template class="tem-box">
  <div class="box">
    <nut-navbar class="nav" title="发布的闲置">
      <template #right>
        <i @click="addNewStuff" class="iconfont icon-plus" />
      </template>
    </nut-navbar>
    <nut-tabs
      class="stuff-box"
      :auto-height="true"
      v-model="activeTab"
      sticky
      swipeable
    >
      <nut-tab-pane pane-key="0" title="未交易">
        <div class="content">
          <my-stuff
            @onMore="onMore"
            v-for="info in unChange"
            :info="info"
            :done="false"
          />
        </div>
      </nut-tab-pane>
      <nut-tab-pane pane-key="1" title="交易中">
        <div class="content">
          <my-stuff
            @onMore="onMore"
            v-for="info in changing"
            :info="info"
            :done="false"
          />
        </div>
      </nut-tab-pane>
      <nut-tab-pane pane-key="2" title="已交易">
        <div class="content">
          <my-stuff
            @onMore="onMore"
            v-for="info in done"
            :info="info"
            :done="true"
          />
        </div>
      </nut-tab-pane>
    </nut-tabs>
    <nut-backtop :bottom="150" />
  </div>
  <nut-action-sheet
    v-model:visible="isVisible"
    :menu-items="menuItems"
    cancel-txt="取消"
    @choose="chooseItem"
  />
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import MyStuff from "@/components/Stuff/MyStuff.vue";
import { useRouter } from "vue-router";
import service from "@/requset";

const addMyStuff = (type: number, arr: Array<any>) => {
  const list = arr.map((v) => {
    return {
      id: v.id,
      des: v.des,
      img: v.img,
      tags: v.tags,
    };
  });
  switch (type) {
    case 0:
      unChange.push(...list);
      break;
    case 1:
      changing.push(...list);
      break;
    case 2:
      done.push(...list);
      break;
    default:
      break;
  }
};
const init = () => {
  service.get("/stuff/my").then((res) => {
    console.log(res.data.data);
    const data = res.data.data;
    addMyStuff(0, data.unChange);
    addMyStuff(1, data.changing);
    addMyStuff(2, data.done);
  });
};
init();
const activeTab = ref(0);
const unChange = reactive(new Array<any>());
const changing = reactive(new Array<any>());
const done = reactive(new Array<any>());
const isVisible = ref(false);
const router = useRouter();
const menuItems = [{ name: "下架" }];
const choseId = ref(0);
const chooseItem = (item: any) => {
  if (item.name === "下架") {
    service.post("/stuff/del", { id: choseId.value }).then((res) => {
      if (res.data.code === 200) {
        router.go(0);
      }
    });
  }
};
const onMore = (id: number) => {
  isVisible.value = true;
  choseId.value = id;
};
const addNewStuff = () => {
  router.push({
    name: "newStuff",
  });
};
</script>

<style scoped lang="scss">
.iconfont {
  $fontSize: 26px;
  font-size: $fontSize;
  line-height: $fontSize;
  color: #1a1a1a;
  font-weight: bold;
}

.tem-box {
  height: calc(100vh - 81px);
  margin-bottom: 81px;
}

.box {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  .nav {
    margin-bottom: 0;

    :deep(.nut-navbar__title) {
      .title {
        font-weight: bold;
        font-size: 20px;
        line-height: 20px;
      }
    }

    :deep(.nut-navbar__left) {
      width: 20px;
    }
  }

  .stuff-box {
    :deep(.nut-tabs__titles) {
      flex: 1;
    }

    .nut-tab-pane {
      background: #f7f8fa;
      padding-top: 10px;

      :deep(.content) {
        min-height: calc(100vh - 44px - 46px - 81px - 81px);
        margin-bottom: 81px;
      }
    }
  }
}
</style>
