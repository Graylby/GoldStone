<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { store } from "@/store/store";
import service from "@/requset";
import { useRoute, useRouter } from "vue-router";
import Stuff from "@/components/Stuff/Stuff.vue";

store.navTitle = "Gray";
const userId = useRoute().params.id;
const router = useRouter();
const followStatus = ref(false);
const stuff = ref(new Array<any>());
const user = reactive({
  name: "Gray",
  label: "金牌用户",
  avatar:
    "https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png",
});
const followStatusStr = computed(() => {
  return followStatus.value ? "已关注" : "关 注";
});
const init = () => {
  service.post("/user/detail", { id: userId }).then((res) => {
    const info = res.data.data;
    user.avatar = info.avatar;
    user.name = info.name;
    user.label = info.label;
    followStatus.value = info.hasFollow;
    stuff.value = info.list.map((v: any) => {
      return {
        id: v.id,
        des: v.des,
        tags: v.tags,
        img: v.img[0],
      };
    });
    console.log(stuff.value);
  });
};
init();
const onFollow = () => {
  const body = {
    id: Number(userId),
  };
  const url = followStatus.value ? "/user/follow/del" : "/user/follow/add";
  service.post(url, body).then((res) => {
    console.log(res);
  });
  followStatus.value = !followStatus.value;
};
const toDetail = (id: number) => {
  router.push({ name: "detail", params: { id: id } });
};
</script>

<template>
  <div class="box">
    <div class="publisher">
      <div class="left">
        <div class="avatar">
          <nut-avatar size="large">
            <nut-image :src="user.avatar" />
          </nut-avatar>
        </div>
        <div class="info">
          <div>{{ user.name }}</div>
          <div>{{ user.label }}</div>
        </div>
      </div>
      <div class="follow">
        <div @click="onFollow" class="follow-btn">{{ followStatusStr }}</div>
      </div>
    </div>
    <div class="content">
      <stuff
        v-for="v in stuff"
        @click="toDetail(v.id)"
        class="stuff"
        :info="v"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  position: absolute;
  top: 52px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: scroll;

  .publisher {
    $avatarSize: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $avatarSize;
    //padding: 10px;

    .left {
      display: flex;
      gap: 10px;
      align-items: center;

      .info {
        div:nth-child(1) {
          $nameFontSize: 24px;
          font-size: $nameFontSize;
          height: $nameFontSize;
        }

        div:nth-child(2) {
          font-size: 10px;
          color: #888888;
        }
      }
    }

    .follow {
      .follow-btn {
        width: 85px;
        font-size: 24px;
        height: 40px;
        line-height: 41px;
        border-radius: 20px;
        background: rgba(128, 128, 128, 0.6);
      }
    }
  }

  .content {
    display: flex;
    padding: 10px;
    gap: 10px;

    .stuff {
      width: calc(50% - 5px);
      border-radius: 20px;
      background: #ffffff;
      box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
    }
  }
}
</style>
