<template>
  <div class="common-layout">
    <el-container class="box">
      <el-header>
        <div>易物宝-GoldStone——后台管理系统</div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="dashboard" :router="true">
            <el-menu-item index="dashboard"> 数据大屏</el-menu-item>
            <el-menu-item index="service"> 纠纷处理</el-menu-item>
            <el-menu-item index="users"> 管理员用户管理</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.common-layout {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .box {
    height: 100%;

    .el-header {
      background: #ffffff;
      border-bottom: solid 1px #dcdfe6;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 32px;
    }

    .el-menu {
      position: absolute;
      left: 0;
      top: 60px;
      bottom: 0;
      width: 200px;
    }

    .el-main {
      padding: 20px;
      margin: 20px;
      border-radius: 20px;
      background: #ffffff;
      box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
    }
  }
}
</style>
