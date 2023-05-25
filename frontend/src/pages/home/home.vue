<template>
  <search-bar :is-home="true" @search="search" />
  <div class="main-box">
    <div class="stuff-box" v-for="v in stuffs">
      <stuff @click="toDetail(v.id)" class="stuff" :info="v" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { StuffInfo } from "@/interface";
import Stuff from "@/components/Stuff/Stuff.vue";
import SearchBar from "@/components/Nav/SearchBar.vue";
import { useRouter } from "vue-router";
import service from "@/requset";

const router = useRouter();
const stuffs = ref(new Array<StuffInfo>());
const init = (val: number) => {
  service.get("/stuff/all").then((res) => {
    stuffs.value = res.data.data.map((v: any) => {
      return {
        id: v.id,
        img: v.img[0],
        des: v.des,
        tags: v.tags,
      };
    });
    console.log(res);
  });
  // for (let i = 0; i < val; i++) {
  //   stuffs.value.push({
  //     id: i,
  //     img: `https://loremflickr.com/320/240/commodity/?random=${i + 1}`,
  //     des: "这是一段描述,当描述过长时将会隐藏多余的内容。",
  //     tags: ["99新", "索尼"],
  //   });
  // }
};
const toDetail = (id: number) => {
  router.push({ name: "detail", params: { id: id } });
};
const search = (val: string) => {
  service
    .post("/stuff/search", {
      keyword: val,
    })
    .then((res) => {
      stuffs.value = res.data.data.map((v: any) => {
        return {
          id: v.id,
          img: v.img[0],
          des: v.des,
          tags: v.tags,
        };
      });
    });
};
init(50);
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
      box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
    }
  }
}
</style>
