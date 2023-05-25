<template>
  <div class="box">
    <div v-for="v in cards" :key="v.index" class="card">
      <div>{{ v.title }}</div>
      <div>{{ v.value }}</div>
    </div>
    <div id="chartsDom1" class="chart-box"></div>
    <div id="chartsDom2" class="chart-box"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import * as echarts from "echarts";
import service from "@/requset";

const init = () => {
  service.get("/order/dashboard").then((res) => {
    const data = res.data.data;
    cards[0].value = data.dayOrder;
    cards[1].value = data.monOrder;
    cards[2].value = data.monUser;
    cards[3].value = data.yearUser;
    const mon = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(day - i - 1);
    }
    xAxis.push(
      arr.map((v) => {
        return mon + "." + v;
      })
    );
    chartData1.value = {
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
            data: data.weekOrder,
            type: "bar",
            smooth: true,
          },
        ],
      },
    };
    chartData2.value = {
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
            data: data.halfYearUser,
            type: "line",
            smooth: true,
          },
        ],
      },
    };
    chartData1.value = data.weekOrder;
    chartData2.value = data.halfYearUser;
  });
};
init();
const xAxis = reactive(new Array<any>());
const chartData1 = ref();
const chartData2 = ref();
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
const chart1 = reactive({
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
      data: ["5.19", "5.20", "5.21", "5.22", "5.23", "5.24", "5.25"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [2, 0, 1, 0, 0, 0, 1],
        type: "bar",
        smooth: true,
      },
    ],
  },
});
const chart2 = reactive({
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
        data: [1, 2, 3, 4, 5, 6],
        type: "line",
        smooth: true,
      },
    ],
  },
});
onMounted(() => {
  // chart1.option.series[0].data = chartData1.value;
  // chart2.option.series[0].data = chartData1.value;
  const el1: HTMLElement | null = document.getElementById("chartsDom1");
  if (el1) {
    const chart11 = echarts.init(el1);
    chart11.setOption(chart1.option);
  }
  const el2: HTMLElement | null = document.getElementById("chartsDom2");
  if (el2) {
    const chart22 = echarts.init(el2);
    chart22.setOption(chart2.option);
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
