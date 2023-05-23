<template>
  <div class="box">
    <div v-for="v in cards" :key="v.index" class="card">
      <div>{{ v.title }}</div>
      <div>{{ v.value }}</div>
    </div>
    <div
      v-for="v in charts"
      :key="v.index"
      ref="chartsDom"
      class="chart-box"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import * as echarts from "echarts";

const chartsDom = reactive([]);
const cards = reactive([
  {
    index: "lastDayOrders",
    title: "昨日订单量",
    value: 43,
  },
  {
    index: "monthOrders",
    title: "月订单量",
    value: 256,
  },
  {
    index: "lastDayUsers",
    title: "活跃用户",
    value: 147,
  },
  {
    index: "monthDayUsers",
    title: "月活跃用户",
    value: 356,
  },
]);
const charts = reactive([
  {
    index: "order1",
    title: "订单成交量",
    option: {
      title: {
        text: "一周内订单成交量",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      xAxis: {
        type: "category",
        data: ["4.13", "4.13", "4.14", "4.15", "4.16", "4.17", "4.18"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [83, 72, 66, 59, 19, 57, 91],
          type: "bar",
          smooth: true,
        },
      ],
    },
  },
  {
    index: "order1",
    title: "订单成交量",
    option: {
      title: {
        text: "最近半年平台用户量",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      xAxis: {
        type: "category",
        data: ["11月", "12月", "1月", "2月", "3月", "4月"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [113, 207, 478, 577, 609, 699],
          type: "line",
          smooth: true,
        },
      ],
    },
  },
]);
onMounted(() => {
  for (let i in charts) {
    const chart = echarts.init(chartsDom[i]);
    chart.setOption(charts[i].option);
  }
});
</script>

<style scoped lang="scss">
.box {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding-top: 20px;

  .card {
    width: calc(25% - 15px);
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
      $size: 60px;
      font-size: $size;
      line-height: $size;
      height: $size;
      margin: 10px;
    }
  }

  .chart-box {
    width: calc(50% - 10px);
    padding: 10px 0;
    height: 600px;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
  }
}
</style>
