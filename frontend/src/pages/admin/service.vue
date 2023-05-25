<template>
  <div class="box">
    <div class="list">
      <el-table @row-click="onChoose" :data="list" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="name" label="用户名称" />
        <el-table-column prop="des" label="投诉信息" />
      </el-table>
    </div>
    <div class="cheat">
      <div class="header">
        <div>{{ title }}</div>
      </div>
      <div class="content" :ref="bubble">
        <msg-bubble
          v-for="(v, i) in msg"
          :msg="v.msg"
          :is-me="v.isMe"
          :key="i"
          :id="`bubble-${v.id}`"
        />
      </div>
      <div class="option">
        <el-input class="input"></el-input>
        <el-button class="input">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";
import service from "@/requset";
import MsgBubble from "@/components/messages/MsgBubble.vue";

const msg = reactive(new Array<any>());
const bubble = ref(null);
const init = () => {
  service.get("/order/badOrder").then((res) => {
    list.push(...res.data.data);
  });
};
init();
const onChoose = (row: any) => {
  title.value = row.name;
  msg.splice(0, msg.length);
  service.post("/msg/record2", { id1: row.id1, id2: row.id2 }).then((res) => {
    const list = res.data.data;
    msg.push(...list);
    nextTick(() => {
      const el = document.getElementById(`bubble-${msg[msg.length - 1].id}`);
      el && el.scrollIntoView();
    });
  });
};
const title = ref();
const list = reactive(new Array<any>());
</script>

<style scoped lang="scss">
.box {
  display: flex;

  .list {
    width: 300px;
    margin-right: 10px;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;

    .el-table {
      margin-top: 20px;
    }

    *::-webkit-scrollbar {
      display: none;
    }
  }

  .cheat {
    flex: 1;
    border-radius: 20px;
    padding: 20px 0;
    background: #ffffff;
    box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
    display: flex;
    flex-direction: column;

    .header {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
    }

    .content {
      flex: 1;
      padding: 20px;
      background: #f7f8fa;
      overflow: hidden;
    }

    .option {
      height: 60px;
      display: flex;
      padding: 0 20px;
      gap: 10px;

      .input {
        margin: 10px 0;
        height: 40px;
      }

      .el-button {
        width: 100px;
      }
    }
  }
}
</style>
