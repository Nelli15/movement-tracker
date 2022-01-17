<template>
  <canvas ref="myChart" width="400" height="400"></canvas>
</template>

<script>
import {
  Chart,
  BarElement,
  BarController,
  // CategoryScale,
  // LinearScale,
  // PointElement,
  Legend,
  Title,
  Tooltip
} from "chart.js";

Chart.register(
  BarElement,
  BarController,
  // CategoryScale,
  // PointElement,
  // LinearScale,
  Legend,
  Title,
  Tooltip
);

export default {
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    tab: String
  },
  mounted() {
    const config = {
      type: "scatter",
      data: this.chartData,
      options: {}
    };
    var myChart = new Chart(this.$refs.myChart, config);
    // this.renderChart(this.chartData, this.options);
  }
  // watch: {
  //   chartdata() {
  //     this.renderChart(this.chartData, this.options);
  //   },
  //   options: {
  //     handler(newOption, oldOption) {
  //       this.renderChart(this.chartData, this.options);
  //     },
  //     deep: true
  //   }
  // }
};
</script>

<!--<script>
import { Bar, mixins } from 'vue-chartjs'

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    tab: String
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    chartdata () {
      this.renderChart(this.chartData, this.options)
    },
    options: {
      handler (newOption, oldOption) {
        this.renderChart(this.chartData, this.options)
      },
      deep: true
    }
  }
}
</script>
-->
