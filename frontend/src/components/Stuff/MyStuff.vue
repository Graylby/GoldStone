<template>
  <div class="stuff-box">
    <div class="info">
      <div class="img">
        <nut-image
            src="https://img12.360buyimg.com/n1/s450x450_jfs/t1/163481/23/35321/74958/6424fa60F45118251/9d9b976e0285bac3.jpg"/>
      </div>
      <div class="main-info">
        <div class="des-box">
          <div class="des">{{ info }}</div>
          <div class="tags">
            <nut-tag color="#E9E9E9" textColor="#999999">99新</nut-tag>
          </div>
        </div>
        <div class="data-info">{{ dataInfo }}</div>
      </div>
    </div>
    <div class="option">
      <span @click="$emit('onMore')">更多</span>
      <nut-button>编辑</nut-button>
    </div>

  </div>
</template>

<script setup lang="ts">

const dataInfo = '浏览5·收藏3'
const info = '这是一段描述'

</script>

<style scoped lang="scss">
$imgSize: 100px;
$opSize: 30px;
.stuff-box {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 10px;

  .info {
    display: flex;

    .img {
      width: $imgSize;
      height: $imgSize;

      :deep(.nut-img) {
        border-radius: 10px;
      }
    }

    .main-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: start;
      margin-left: 10px;

      .des-box {
        .tags {
          margin-top: 10px;
          display: flex;
        }
      }

      .data-info {
        color: #888888;
        font-size: 15px;
      }
    }
  }

  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: #888888;
    }

    :deep(.nut-button) {
      font-weight: bold;
      color: #1a1a1a;
    }
  }
}
</style>
