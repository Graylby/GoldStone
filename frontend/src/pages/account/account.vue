<template>
  <div class="account-box">
    <div class="user-info">
      <nut-avatar size="large">
        <nut-image :src="avatar" />
      </nut-avatar>
      <div class="user-name">
        <p>{{ user.name }}</p>
        <p>{{ user.tag }}</p>
      </div>
    </div>
    <div class="info-menu">
      <div v-for="(v, i) in infoMenu" :key="i" @click="to(v.type)">
        <p>{{ v.val }}</p>
        <p>{{ v.name }}</p>
      </div>
    </div>
    <div class="order-menu">
      <div class="box">
        <div class="title item">我的交易</div>
        <!--        <div class="all item">全部</div>-->
      </div>
      <div class="recent-order">
        <order-card v-for="o in orders" :order-info="o" />
      </div>
    </div>
    <div class="menu"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import OrderCard from "@/components/Order/OrderCard.vue";
import { useRouter } from "vue-router";
import service from "@/requset";

const router = useRouter();
const user = reactive({
  name: "Gray尘离",
  tag: "金牌用户",
});
const avatar = ref(
  "https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
);
const orders = reactive(new Array<any>());
const infoMenu = ref([
  {
    name: "收藏",
    val: 0,
    type: "",
  },
  {
    name: "历史浏览",
    val: 0,
    type: "",
  },
  {
    name: "关注",
    val: 3,
    type: "following",
  },
  {
    name: "粉丝",
    val: 6,
    type: "fans",
  },
]);
const init = () => {
  service.get("/order/info").then((res) => {
    const data = res.data.data;
    user.name = data.name;
    user.tag = data.label;
    avatar.value = data.avatar;
    infoMenu.value[2].val = data.following;
    infoMenu.value[3].val = data.follower;
    orders.push(...data.list);
  });
};
init();
const to = (type: string) => {
  if (type !== "") {
    router.push({ name: "follow", params: { type: type } });
  }
};
</script>

<style scoped lang="scss">
p {
  margin: 0;
}

.account-box {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;

  .user-info {
    display: flex;
    align-items: center;

    .user-name {
      margin-left: 15px;

      p:nth-child(1) {
        font-size: 20px;
        font-weight: bold;
        text-align: left;
      }

      p:nth-child(2) {
        color: #888888;
        font-size: 10px;
        text-align: left;
      }
    }
  }

  .info-menu {
    display: flex;
    width: 100%;
    padding: 20px 0;
    justify-content: space-between;

    div {
      width: 64px;
    }
  }

  .order-menu {
    box-sizing: border-box;
    width: 100%;
    max-height: 600px;
    overflow: scroll;
    padding: 10px;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;

    .box {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .item {
        margin: 0 10px;
      }
    }

    .recent-order {
      //height: 30px;
    }
  }
}
</style>
