<template>
  <div class="account-box">
    <div class="user-info">
      <nut-avatar size="large">
        <img
          src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
        />
      </nut-avatar>
      <div class="user-name">
        <p>{{ user.name }}</p>
        <p>{{ user.tag }}</p>
      </div>
    </div>
    <div class="info-menu">
      <div v-for="(v, i) in infoMenu" :key="i">
        <p>{{ v.val }}</p>
        <p>{{ v.name }}</p>
      </div>
    </div>
    <div class="order-menu">
      <div class="box">
        <div class="title item">我的交易</div>
        <div class="all item">全部</div>
      </div>
      <div class="recent-order">
        <order-card />
      </div>
    </div>
    <div class="menu"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import OrderCard from "@/components/Order/OrderCard.vue";

const user = reactive({
  name: "Gray尘离",
  tag: "金牌用户",
});
const infoMenu = ref([
  {
    name: "收藏",
    val: 0,
  },
  {
    name: "历史浏览",
    val: 7,
  },
  {
    name: "关注",
    val: 3,
  },
  {
    name: "粉丝",
    val: 6,
  },
]);
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
      height: 30px;
    }
  }
}
</style>
