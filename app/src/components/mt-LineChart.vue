<template>
  <q-card class="q-ma-sm" style="calc(100vh-53px)">
    <LineChart v-bind="lineChartProps" :height="0" v-if="lineChartProps" />
  </q-card>
</template>

<script lang="ts">
interface TrendSnap {
  value: number;
  date: number;
}

interface Trend {
  movId: string;
  styleId: string;
  treeId: string;
  trend: TrendSnap[];
  computed: {
    mean: number;
    median: number;
    mode: number;
    min: number;
    max: number;
  };
}
interface TrendObj {
  [index: string]: Trend;
}
import { ref, computed, watch, defineComponent, Ref } from 'vue';
import { useStore } from 'vuex';
import { LineChart, useLineChart } from 'vue-chart-3';
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
  ChartData,
  ChartOptions,
} from 'chart.js';

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip
);
export default defineComponent({
  name: 'mt-LineChart',
  props: ['options'],
  components: { LineChart },
  setup(props) {
    const store = useStore();
    const startDate = computed(() => {
      return props.options.startDate;
    });
    const endDate = computed(() => {
      return props.options.endDate;
    });
    const stats = computed(() => {
      return props.options.stats;
    });
    const trees = computed(() => {
      return props.options ? props.options.trees : [];
    });
    const movement = computed(() => store.state.movement.movement);
    const trends: Ref<TrendObj> = ref({});
    // fetch trend for stat
    function fetchTrend({
      treeId,
      statId,
    }: {
      treeId: string;
      statId: string;
    }) {
      return store.dispatch('trends/fetchTrend', {
        treeId: treeId,
        movId: movement.value.id,
        styleId: statId,
        startDate: startDate.value,
        endDate: endDate.value,
      });
    }
    function fetchData() {
      trends.value = {};
      if (
        !trees.value ||
        trees.value.length <= 0 ||
        !stats.value ||
        stats.value.length <= 0
      )
        return;
      for (let tree of trees.value) {
        for (let stat of stats.value) {
          fetchTrend({ treeId: tree.id, statId: stat.id }).then((res) => {
            console.log(res);
            trends.value[`${tree.id}-${stat.id}`] = {
              ...res,
              label: stat.label,
            };
          });
        }
      }
    }
    watch(
      props.options,
      () => {
        fetchData();
      },
      { deep: true, immediate: true }
    );
    const getData = computed<ChartData<'line'>>(() => {
      let chartData: ChartData<'line'> = {
        labels: [],
        datasets: [],
      };
      if (Object.keys(trends.value).length <= 0) return chartData;
      let labels: string[] = [];
      let key = Object.keys(trends.value)[0];
      for (let ii in trends.value[key].trend) {
        let d = new Date(trends.value[key].trend[ii].date);
        labels.push(
          `${d.toLocaleString('default', {
            month: 'short',
          })} ${d.getFullYear()}`
        );
      }
      chartData.labels = labels;
      let trendId: string;
      for (trendId in trends.value) {
        let trend = trends.value[trendId];
        let trendData: number[] = [];
        let ii: any;
        for (ii in trend.trend) {
          trendData[ii] = trend.trend[ii].value;
        }
        chartData.datasets.push({
          label: stats.value[trend.styleId]
            ? stats.value[trend.styleId].label
            : 'Not Label Provided',
          data: trendData,
          fill: false,
          borderColor: 'rgb(197, 66, 16)',
          tension: props.options.lineTension,
        });
      }
      return chartData;
    });
    const chartOptions = computed<ChartOptions<'line'>>(() => ({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: props.options ? props.options.title : '',
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: props.options ? props.options.yAxis : '',
          },
        },
        x: {
          title: {
            display: true,
            text: props.options ? props.options.xAxis : '',
          },
        },
      },
    }));
    const { lineChartProps } = useLineChart({
      options: chartOptions,
      chartData: getData,
    });
    return {
      getData,
      lineChartProps,
      trends,
    };
  },
});
</script>
