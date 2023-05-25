<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  isMe: boolean;
  msg: string;
}>();
const msgBox = computed(() => {
  return props.isMe ? "msg-box me-box" : "msg-box other-box";
});
</script>

<template>
  <div :class="msgBox">
    <div class="avatar">
      <nut-avatar size="normal">
        <img
          src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
        />
      </nut-avatar>
    </div>
    <span class="msg">
      {{ msg }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.me-box {
  flex-direction: row-reverse;
}

.other-box {
  flex-direction: row;
}

.msg-box {
  display: flex;
  gap: 12px;

  .avatar {
    margin-top: 5px;
  }

  .msg {
    text-align: left;
    box-sizing: border-box;
    min-height: 40px;
    line-height: 30px;
    max-width: calc(100% - 52px);
    padding: 5px 8px;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
  }
}
</style>
