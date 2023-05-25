<template>
  <div class="box">
    <div class="content" :ref="bubble">
      <msg-bubble
        v-for="(v, i) in msg"
        :msg="v.msg"
        :is-me="v.isMe"
        :key="i"
        :id="`bubble-${v.id}`"
      />
    </div>
    <div class="edit-area">
      <div class="input" @keydown.enter="onsubmit()">
        <nut-input
          v-model="myMsg"
          placeholder="想跟Ta聊点什么..."
          confirm-type="send"
        />
      </div>
      <div class="gen-order" @click="onGenOrder">
        <i class="iconfont icon-plus" />
      </div>
    </div>
    <div class="gen-order-box">
      <div class="stuff">
        <stuff
          v-for="v in myStuff"
          :info="v"
          :key="v.id"
          class="stuff-item"
          @click="addCart('me', v)"
        />
      </div>
      <div class="mid">
        <div class="order">
          <stuff
            v-if="myChangeStuff"
            :info="myChangeStuff"
            class="stuff-item"
          />
        </div>
        <div class="submit">
          <nut-button @click="genOrder" :disabled="canChange" type="primary"
            >发起交换
          </nut-button>
        </div>
        <div class="order">
          <stuff
            v-if="otherChangeStuff"
            :info="otherChangeStuff"
            class="stuff-item"
          />
        </div>
      </div>
      <div class="stuff">
        <stuff
          v-for="v in otherStuff"
          :info="v"
          :key="v.id"
          class="stuff-item"
          @click="addCart('other', v)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { store } from "@/store/store";
import MsgBubble from "@/components/messages/MsgBubble.vue";
import { computed, inject, nextTick, reactive, ref } from "vue";
import Stuff from "@/components/Stuff/Stuff.vue";
import service from "@/requset";
import { useRoute } from "vue-router";
import { showToast } from "@nutui/nutui";

const route = useRoute();
const socket: any = inject("socket");
const isOnGenOrder = ref(false);
const msg = reactive(new Array<any>());
const bubble = ref(null);
const myStuff = reactive(new Array<any>());
const otherStuff = reactive(new Array<any>());
const myChangeStuff = ref({ id: 0 });
const otherChangeStuff = ref({ id: 0 });
console.log(store);
const myMsg = ref("");

const canChange = computed(() => {
  return !Boolean(myChangeStuff.value && otherChangeStuff.value);
});
const init = () => {
  const id = route.params.id;
  socket.emit("login", route.params.id);
  socket.on("getLoginId", (res: any) => {
    service.post("/msg/online", { id: res });
  });
  socket.on("receive", (res: any) => {
    msg.push({
      id: Date.now(),
      date: new Date(),
      isMe: false,
      msg: res,
    });
    nextTick(() => {
      console.log(`bubble-${msg[msg.length - 1].id}`);
      const el = document.getElementById(`bubble-${msg[msg.length - 1].id}`);
      el && el.scrollIntoView();
    });
  });
  service.post("/msg/record", { id: id }).then((res) => {
    const list = res.data.data;
    msg.push(...list);
    nextTick(() => {
      const el = document.getElementById(`bubble-${msg[msg.length - 1].id}`);
      el && el.scrollIntoView();
    });
  });
  service.post("/stuff/change", { id: route.params.id }).then((res) => {
    const data = res.data.data;
    myStuff.push(
      ...data.myStuff.map((v: any) => {
        v.img = v.img[0];
        return v;
      })
    );
    otherStuff.push(
      ...data.otherStuff.map((v: any) => {
        v.img = v.img[0];
        return v;
      })
    );
  });
};
init();
const onsubmit = () => {
  service
    .post("/msg/send", {
      id: route.params.id,
      msg: myMsg.value,
    })
    .then(() => {
      msg.push({
        id: Date.now(),
        date: new Date(),
        isMe: true,
        msg: myMsg.value,
      });
      myMsg.value = "";
      nextTick(() => {
        console.log(`bubble-${msg[msg.length - 1].id}`);
        const el = document.getElementById(`bubble-${msg[msg.length - 1].id}`);
        el && el.scrollIntoView();
      });
    });
};
const onGenOrder = () => {
  myChangeStuff.value = { id: 0 };
  otherChangeStuff.value = { id: 0 };
  const el = document.querySelector(".gen-order-box");
  const icon = document.querySelector(".gen-order");
  el &&
    (isOnGenOrder.value
      ? el.setAttribute("style", "height: 0;transform: translateY(0);")
      : el.setAttribute("style", "height: 400px;transform: translateY(10px)"));
  icon &&
    (isOnGenOrder.value
      ? icon.setAttribute("style", "transform: rotate(0);")
      : icon.setAttribute("style", "transform: rotate(-135deg);"));
  isOnGenOrder.value = !isOnGenOrder.value;
};
const addCart = (type: string, stuff: any) => {
  switch (type) {
    case "me":
      myChangeStuff.value = Object.assign(stuff);
      break;
    case "other":
      otherChangeStuff.value = Object.assign(stuff);
      break;
    default:
      break;
  }
};
const genOrder = () => {
  // console.log(otherChangeStuff.value.id);
  service
    .post("/order/generate", {
      id: route.params.id,
      stuff: otherChangeStuff.value && otherChangeStuff.value.id,
      myStuff: myChangeStuff.value && myChangeStuff.value.id,
    })
    .then((res) => {
      if (res.data.code === 200) {
        showToast.text("交换发起成功");
        onGenOrder();
      }
    });
};
</script>

<style scoped lang="scss">
.stuff-item {
  margin: 10px 0;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 5px 5px 10px #bebebe, -5px -5px 10px #ffffff;
}

.box {
  position: absolute;
  top: 52px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    padding: 20px;
    overflow: scroll;

    div {
      margin-top: 20px;
    }

    div:first-child {
      margin-top: 0;
    }
  }

  .edit-area {
    box-sizing: border-box;
    height: 60px;
    padding: 10px;
    display: flex;
    gap: 10px;

    .input {
      flex: 1;
    }

    .gen-order {
      width: 40px;
      transition: all 1s;

      .iconfont {
        font-size: 40px;
        line-height: 40px;
      }
    }
  }

  .gen-order-box {
    height: 0;
    transition: height 1s;
    transform: translateY(10px);
    display: flex;
    padding: 10px;

    .stuff {
      flex: 5;
      overflow: scroll;
      padding: 5px 20px;
    }

    .mid {
      flex: 5;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 5px 10px;

      .order {
        flex: 2;
      }

      .submit {
        flex: 1;
        padding: 9.5px 0;
      }
    }
  }
}
</style>
