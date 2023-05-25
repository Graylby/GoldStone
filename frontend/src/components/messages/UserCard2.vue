<template>
  <div class="box">
    <div class="avatar-info">
      <nut-avatar shape="round">
        <img class="img" :src="info.avatar" />
      </nut-avatar>
    </div>
    <div class="des-info">
      <div class="name">{{ info.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  info: any;
}>();
</script>

<style scoped lang="scss">
.box {
  $cardHeight: 60px;
  $gray-font-color: rgb(139, 130, 130);
  display: flex;
  height: $cardHeight;

  .avatar-info {
    aspect-ratio: 1;

    .nut-avatar {
      height: 100%;
      width: 100%;
    }

    .img {
      width: $cardHeight;
      height: $cardHeight;
      border-radius: calc($cardHeight / 2);
    }
  }

  .des-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 10px;
    gap: 5px;

    .name {
      font-size: 20px;
      height: 20px;
    }

    .msg {
      color: $gray-font-color;
    }

    .date {
      color: $gray-font-color;
      font-size: 10px;
    }
  }
}
</style>
