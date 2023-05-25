<template>
  <div class="card_box">
    <div class="img_box">
      <nut-image class="img" :src="orderInfo.imgI" />
      <nut-image class="img" :src="orderInfo.imgR" />
    </div>
    <div class="text_box">
      <nut-button @click="onSubmit('agree')" v-if="!orderInfo.accept"
        >同意交换
      </nut-button>
      <nut-button @click="onSubmit('disagree')" v-if="!orderInfo.accept"
        >拒绝交换
      </nut-button>
      <nut-button @click="onSubmit('accept')" v-if="orderInfo.accept"
        >确认收货
      </nut-button>
      <nut-button @click="onSubmit('bad')" v-if="orderInfo.accept"
        >投 诉
      </nut-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import service from "@/requset";
import { useRouter } from "vue-router";

const props = defineProps<{ orderInfo: any }>();
const emit = defineEmits(["changeAccept"]);
const router = useRouter();
const onSubmit = (type: string) => {
  let url = "";
  let data = { id: props.orderInfo.id };
  switch (type) {
    case "agree":
      url = "/order/agree";
      break;
    case "disagree":
      url = "/order/disagree";
      break;
    case "accept":
      url = "/order/accept";
      break;
    case "bad":
      url = "/order/bad";
      break;
    default:
      break;
  }
  service.post(url, data).then((res) => {
    console.log(res);
    router.go(0);
  });
};
</script>

<style scoped lang="scss">
.card_box {
  padding: 0 10px;
  display: flex;

  .img_box {
    aspect-ratio: 2;
    padding: 10px;
    height: 80px;
    display: flex;
    gap: 10px;

    .img {
      height: 80px;
      width: 80px;
    }
  }

  .text_box {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    .nut-button {
      width: 90px;
    }
  }
}
</style>
