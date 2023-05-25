<template>
  <div>
    <!--    <nut-navbar-->
    <!--      @on-click-back="onBack"-->
    <!--      :left-show="true"-->
    <!--      class="top_nav"-->
    <!--      title="消息"-->
    <!--    />-->
    <div class="top-nav">
      <div class="title">消息</div>
      <div class="clear">
        <i class="iconfont icon-clear" />
        <span>清除未读</span>
      </div>
    </div>
    <div class="user-list">
      <user-card
        @click="toMsgDetail(v)"
        v-for="v in userList"
        :info="v"
        :key="v.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import UserCard from "@/components/messages/UserCard.vue";
import { store } from "@/store/store";
import service from "@/requset";

const dateCalc = (time: string) => {
  const DAY = 24 * 60 * 60 * 1000;
  const WEEK = 7 * DAY;
  const val = Date.now() - Date.parse(time);
  const token = time.split(" ");
  if (val < DAY) {
    const t = token[1].split(":").map((v) => {
      if (v.length === 1) return "0" + v;
      return v;
    });
    return [t[0], t[1]].join(":");
  }
  if (val < WEEK) return Math.floor(val / DAY);
  return token[0];
};
const init = () => {
  service.get("/msg/list").then((res) => {
    const list = res.data.data;
    userList.value = list.map((v: any) => {
      return {
        id: v.userId,
        name: v.name,
        avatar: v.avatar,
        lastMsg: v.content,
        lastDate: dateCalc(v.time),
      };
    });
    console.log(res);
  });
};
init();
const userList = ref([
  {
    id: 0,
    name: "张伟",
    avatar:
      "https://img12.360buyimg.com/n1/s450x450_jfs/t1/163481/23/35321/74958/6424fa60F45118251/9d9b976e0285bac3.jpg",
    lastMsg: "这个质量怎么样啊",
    lastDate: "两天前",
  },
  {
    id: 1,
    name: "张3",
    avatar:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F13%2F20210613235426_7a793.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685194574&t=207bce71368cfb79cfe474a418ae2085",
    lastMsg: "这个质量怎么样啊",
    lastDate: "两天前",
  },
]);

const router = useRouter();
const toMsgDetail = (user: any) => {
  console.log(user.id);
  store.navTitle = user.name;
  store.userInfo = {
    id: user.id,
    name: user.name,
    avatar: user.avatar,
  };
  router.push({
    name: "message",
    params: {
      id: user.id,
    },
  });
};
</script>

<style scoped lang="scss">
.top-nav {
  $title-height: 32px;
  width: 100%;
  height: $title-height;
  display: flex;
  padding: 10px 10px;
  background: #ffffff;

  .title {
    font-size: 32px;
    line-height: 32px;
  }

  .clear {
    height: 20px;
    padding: 5px 10px;
    background: #e0e0e0;
    color: #888888;
    border-radius: 15px;
    text-align: center;
    align-items: center;
    margin-left: 10px;
  }
}

.user-list {
  padding: 10px;

  :deep(.box) {
    margin-bottom: 20px;
  }
}

.form_box {
  margin: 0 auto;
  width: 70%;
  border-radius: 70px;
  background: #e0e0e0;
  box-shadow: 41px 41px 82px #696969, -41px -41px 82px #ffffff;
}

.cheat_box {
  .msg_input_box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: #ffffff;
    display: flex;
    justify-content: center;
  }
}
</style>
