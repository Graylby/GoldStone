<script setup lang="ts">
import { store } from "@/store/store";
import { useRoute } from "vue-router";
import UserCard2 from "@/components/messages/UserCard2.vue";
import { ref } from "vue";
import service from "@/requset";

const route = useRoute();
const list = ref();
store.navTitle = route.params.type === "fans" ? "粉丝列表" : "关注列表";
const init = () => {
  service.post("/user/follow", { type: route.params.type }).then((res) => {
    list.value = res.data.data;
  });
};
init();
</script>

<template>
  <div class="box">
    <user-card2 v-for="info in list" :info="info" class="user" />
  </div>
</template>

<style scoped lang="scss">
.box {
  padding: 20px;

  .user {
    height: 60px;
    padding: 0;
    margin-top: 10px;
  }
}
</style>
