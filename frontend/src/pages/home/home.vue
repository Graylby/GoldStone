<template>
  <search-bar :is-home="true"/>
  <div class="main-box">
    <div class="stuff-box" v-for="v in stuffs">
      <stuff class="stuff" :info="v"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {StuffInfo} from "@/interface";
import Stuff from "@/components/Stuff/Stuff.vue";
import SearchBar from "@/components/Nav/SearchBar.vue";

const stuffs = ref(new Array<StuffInfo>);
const init = (val: number) => {
  for (let i = 0; i < val; i++) {
    stuffs.value.push({
      img: 'https://img12.360buyimg.com/n1/s450x450_jfs/t1/163481/23/35321/74958/6424fa60F45118251/9d9b976e0285bac3.jpg',
      des: '这是个描述',
      tags: ['99新', '索尼'],
    })
  }
}
init(50)
</script>

<style scoped lang="scss">
.main-box {
  padding: 0 10px 0 10px;
  box-sizing: border-box;
  width: 100%;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 91px;

  .stuff-box {
    width: calc(50% - 5px);

    .stuff {
      width: 100%;
      border-radius: 20px;
      background: #ffffff;
      box-shadow: 15px 15px 30px #bebebe,
      -15px -15px 30px #ffffff;
    }
  }
}
</style>
