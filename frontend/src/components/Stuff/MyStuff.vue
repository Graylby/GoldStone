<template>
  <div class="stuff-box">
    <div class="info">
      <div class="img">
        <nut-image
          src="https://img12.360buyimg.com/n1/s450x450_jfs/t1/163481/23/35321/74958/6424fa60F45118251/9d9b976e0285bac3.jpg"
        />
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
const dataInfo = "浏览5·收藏3";
const info =
  "这是一段描述,当描述过长时将会隐藏多余的内容。这是一段描述,当描述过长时将会隐藏多余的内容。这是一段描述,当描述过长时将会隐藏多余的内容";
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
      width: 100%;

      .des-box {
        .tags {
          margin-top: 10px;
          display: flex;
        }

        .des {
          width: 100%;
          text-align: start;
          font-size: 16px;
          max-height: 48px;
          word-break: break-all; //在恰当的断字点进行换行
          overflow: hidden; //文字超出的进行隐藏
          text-overflow: ellipsis; //超出的文字用省略号表示
          display: -webkit-box; //将元素设为盒子伸缩模型显示
          text-overflow: ellipsis; //利用盒子模型
          -webkit-box-orient: vertical; //伸缩方向设为垂直方向
          -webkit-line-clamp: 3; //设定一共3行，超出的部分隐藏，并用省略号来表示
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
