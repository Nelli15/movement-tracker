<template>
  <canvas ref="myChart" width="400" height="400"></canvas>
</template>

<script>
import {
  Chart,
  LineElement,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Title,
  Tooltip
} from "chart.js";

Chart.register(
  LineElement,
  LineController,
  CategoryScale,
  PointElement,
  LinearScale,
  Legend,
  Title,
  Tooltip
);

export default {
  props: {
    chartData: {
      type: Object,
      default: null
    }
    // options: {
    //   type: Object,
    //   default: null
    // },
  },
  mounted() {
    const config = {
      type: "line",
      data: this.chartData,
      options: {}
    };
    var myChart = new Chart(this.$refs.myChart, config);
  }
};
</script>
