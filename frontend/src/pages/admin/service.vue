<template>
  <div class="box">
    <div class="list">
      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="name" label="用户名称" />
        <el-table-column prop="des" label="投诉信息" />
      </el-table>
    </div>
    <div class="cheat">
      <div class="header">
        <div>张三</div>
      </div>
      <div class="content"></div>
      <div class="option">
        <el-input class="input"></el-input>
        <el-button class="input">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const list = reactive([
  {
    date: "2023-03-04",
    name: "张三",
    des: "对方不发货",
  },
  {
    date: "2023-03-05",
    name: "张三",
    des: "对方不发货",
  },
  {
    date: "2023-04-04",
    name: "张三",
    des: "对方不发货",
  },
]);
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
