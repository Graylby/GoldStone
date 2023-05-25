<template>
  <div class="box">
    <div class="header">
      <span @click="cancelAdd" class="back">取消</span>
      <nut-button @click="onsubmit()">发布</nut-button>
    </div>
    <div class="editArea">
      <nut-textarea
        max-length="1000"
        :placeholder="placeholder"
        :autosize="autosize"
        v-model="des"
      />
      <nut-uploader
        @success="onSuccess"
        url="/api/upload/img"
        multiple
        maximum="9"
      />
    </div>
    <div class="tagEdit">
      <p>为旧物添加标签吧</p>
      <div class="fineness">
        <div class="title">成色</div>
        <nut-radio-group v-model="fineness" direction="horizontal">
          <nut-radio shape="button" label="全新">全新</nut-radio>
          <nut-radio shape="button" label="99新">99新</nut-radio>
          <nut-radio shape="button" label="久经沙场">久经沙场</nut-radio>
        </nut-radio-group>
      </div>
      <div class="diy-tags">
        <span class="title">DIY</span>
        <nut-tag color="#edeeef" v-for="t in tags" :key="t">{{ t }}</nut-tag>
      </div>
      <nut-input
        v-if="canAddTag"
        placeholder="自定义标签"
        class="tag-input"
        v-model="newTag"
        @keydown.enter="addTag"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showNotify } from "@nutui/nutui";
import service from "@/requset";
import { store } from "@/store/store";

const route = useRoute();
const des = ref("");
const id = ref(0);
const fineness = ref("");
const newTag = ref("");
const tags = ref(new Array<String>());
const placeholder = "大家都看重品牌型号、入手渠道、转手原因...";
const img = reactive(new Array<String>());
const router = useRouter();
const autosize = {
  maxHeight: 300,
  minHeight: 80,
};
const canAddTag = computed(() => {
  return tags.value.length < 9;
});
const init = () => {
  if (route.name === "stuffEdit") {
    console.log(store.stuffInfo);
    const myInfo = store.stuffInfo;
    des.value = myInfo.des;
    id.value = myInfo.id;
    for (const tag of myInfo.tags) {
      if (tag === "全新" || tag === "99新" || tag === "久经沙场")
        fineness.value = tag;
      else tags.value.push(tag);
    }
  }
};
init();
const cancelAdd = () => {
  router.back();
};
const myNotify = (msg: string) => {
  showNotify.text(msg, {
    duration: 3000,
    position: "center",
    type: "warning",
  });
};
const addTag = () => {
  const val = newTag.value;
  if (["全新", "99新", "久经沙场"].includes(val)) {
    myNotify("不能添加其他成色标签");
  } else if (tags.value.includes(val)) {
    myNotify("不能添加已有标签");
  } else {
    tags.value.push(val);
  }
  newTag.value = "";
};
const onsubmit = () => {
  const data = {
    des: des.value,
    tags: [fineness.value, ...tags.value],
    img: [...img],
  };
  const url = route.name === "stuffEdit" ? "/stuff/edit" : "/stuff/add";
  service.post(url, data).then((res) => {
    if (res.data.msg === "添加成功") router.back();
    console.log(res);
  });
};
const onSuccess = (res: any) => {
  const url: string = JSON.parse(res.responseText).data.url;
  img.push(url);
};
</script>

<style scoped lang="scss">
.box {
  display: flex;
  flex-direction: column;

  .header {
    height: 50px;
    position: sticky;
    top: 0;
    display: flex;
    background: var(--bg-color);
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;

    span {
      font-weight: bold;
    }
  }

  .editArea {
    .nut-textarea {
      background: var(--bg-color);
    }

    .nut-uploader {
      margin: 0 25px;

      :deep(.picture) {
        background: #edeeef;
        border-radius: 20px;
      }
    }
  }

  .tagEdit {
    text-align: left;
    padding: 0 25px;

    .fineness {
      display: flex;

      .title {
        font-weight: bold;
        width: 30px;
        padding: 6px 10px 10px 0;
      }

      :deep(.nut-radio__button) {
        background: #edeeef;
      }
    }

    .diy-tags {
      margin: 5px 0 0 40px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      min-height: 28px;

      .title {
        position: absolute;
        left: 25px;
      }

      .nut-tag {
        height: 16px;
        padding: 5px 18px;
        border-radius: 14px;
        border: 1px solid #fa2c19;
        color: #fa2c19;
      }
    }

    .tag-input {
      margin-left: 40px;
      margin-top: 10px;
      width: 120px;
      //height: 33px;
      border-radius: 20px;
    }

    p {
      font-weight: bold;
    }
  }
}
</style>
