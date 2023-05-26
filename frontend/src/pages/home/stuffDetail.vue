<template>
  <div class="box">
    <div class="publisher">
      <div class="left">
        <div class="avatar" @click="toUserInfo">
          <nut-avatar size="large">
            <nut-image :src="publisher.avatar" />
          </nut-avatar>
        </div>
        <div class="info">
          <div>{{ publisher.name }}</div>
          <div>{{ publisher.label }}</div>
        </div>
      </div>
      <div class="follow">
        <i @click="toChat" class="iconfont icon-hi" />
        <div @click="onFollow" class="follow-btn">{{ followStatusStr }}</div>
      </div>
    </div>
    <div class="des">{{ des }}</div>
    <div class="tags">
      <div v-for="item in tags">{{ item }}</div>
    </div>
    <div class="img">
      <nut-image v-for="v in img" :src="v" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { store } from "@/store/store";
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import service from "@/requset";

const router = useRouter();
const route = useRoute();
store.navTitle = "宝贝详情";
const followStatus = ref(false);
const publisher = reactive({
  name: "",
  label: "",
  avatar:
    "https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png",
  id: 0,
});
const des = ref("这是一段描述");
const tags = ref(["99新", "女生自用"]);
const img = ref([
  "https://img12.360buyimg.com/n1/s450x450_jfs/t1/163481/23/35321/74958/6424fa60F45118251/9d9b976e0285bac3.jpg",
]);
const followStatusStr = computed(() => {
  return followStatus.value ? "已关注" : "关 注";
});
const init = () => {
  service.post("/stuff/detail", { id: route.params.id }).then((res) => {
    const info = res.data.data;
    publisher.name = info.name;
    publisher.avatar = info.avatar;
    publisher.label = info.label;
    publisher.id = info.id;
    des.value = info.des;
    tags.value = info.tags;
    img.value = info.img;
    followStatus.value = info.hasFollow;
    console.log(res);
  });
};
init();
const onFollow = () => {
  const body = {
    id: publisher.id,
  };
  const url = followStatus.value ? "/user/follow/del" : "/user/follow/add";
  service.post(url, body).then((res) => {
    console.log(res);
  });
  followStatus.value = !followStatus.value;
};
const toUserInfo = () => {
  router.push({ name: "user", params: { id: publisher.id } });
};
const toChat = () => {
  router.push({ name: "message", params: { id: publisher.id } });
};
</script>

<style scoped lang="scss">
.box {
  display: flex;
  flex-direction: column;
  padding: 10px;
  //width: 100%;
  //div {
  //  margin-top: 10px;
  //}
  //
  //div:nth-child(1) {
  //  margin: 0;
  //}

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
      display: flex;
      gap: 10px;
      align-items: center;

      .iconfont {
        font-size: 30px;
      }

      .icon-hi::before {
        color: rgba(128, 128, 128, 0.8);
      }

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

  .des {
    text-align: left;
    margin-top: 10px;
  }

  .tags {
    margin: 10px 0;
    display: flex;
    gap: 5px;

    div {
      //margin-top: 10px;
      height: 20px;
      line-height: 21px;
      border-radius: 20px;
      padding: 5px 8px;
      background: rgba(128, 128, 128, 0.4);
    }
  }

  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
  }
}
</style>
