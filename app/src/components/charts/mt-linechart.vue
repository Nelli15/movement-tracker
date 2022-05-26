<template>
  <q-card
    class="q-ma-sm"
    style="height: calc(100vh-53px)"
    ref="chartCard"
    :style="
      options.chartBackground
        ? `background-color:${options.chartBackground};`
        : ''
    "
  >
    <LineChart
      :chartData="chartData"
      :options="chartOptions"
      v-if="chartData && chartData.labels.length > 0"
      :height="chartHeight"
    />
    <q-card v-else>
      <q-card-section class="text-center text-h6">
        Please select a Tree and Statistic to create a chart!
      </q-card-section>
    </q-card>
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
import { LineChart } from 'vue-chart-3';
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
import { dom } from 'quasar';

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
  props: ['options', 'data'],
  components: { LineChart },
  setup(props) {
    const store = useStore();
    const chartCard = ref<HTMLElement | null>(null);
    const startDate = computed(() => {
      return props.data.startDate;
    });
    const endDate = computed(() => {
      return props.data.endDate;
    });
    const stats = computed(() => {
      return props.data.stats;
    });
    const trees = computed(() => {
      return props.data ? props.data.trees : [];
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
      console.log({
        treeId: treeId,
        movId: movement.value.id,
        styleId: statId,
        startDate: startDate.value,
        endDate: endDate.value,
      });
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
            console.log({ treeId: tree.id, statId: stat.id }, res);
            trends.value[`${tree.id}-${stat.id}`] = {
              ...res,
              label: stat.label,
            };
          });
        }
      }
    }
    watch(
      props.data,
      () => {
        fetchData();
      },
      { deep: true, immediate: true }
    );
    const chartData = computed<ChartData<'line'>>(() => {
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
          label:
            trees.value.find((val: any) => val.id === trend.treeId) &&
            stats.value.find((val: any) => val.id === trend.styleId)
              ? `${
                  trees.value.find((val: any) => val.id === trend.treeId).label
                } - ${
                  stats.value.find((val: any) => val.id === trend.styleId).label
                }`
              : 'No Label Provided',
          data: trendData,
          fill: props.options.trends[`${trendId}_filled`],
          borderColor: props.options.trends[`${trendId}_borderColor`],
          tension: props.options.trends[`${trendId}_lineTension`],
        });
      }
      return chartData;
    });
    const chartOptions = computed<ChartOptions<'line'>>(() => ({
      responsive: true,
      plugins: {
        legend: {
          display:
            props.options &&
            props.options.legend &&
            props.options.legend.display,
          position:
            props.options && props.options.legend && props.options.legend.pos,
          align:
            props.options && props.options.legend && props.options.legend.align,
        },
        title: {
          display:
            props.options &&
            props.options.title &&
            props.options.title.text > '',
          text:
            props.options && props.options.title
              ? props.options.title.text
              : '',
          color:
            props.options && props.options.title
              ? props.options.title.color
              : '',
          position:
            props.options && props.options.title
              ? props.options.title.pos
              : 'top',
          align:
            props.options && props.options.title
              ? props.options.title.align === 'left'
                ? 'start'
                : props.options.title.align === 'center'
                ? 'center'
                : props.options.title.align === 'right'
                ? 'end'
                : 'center'
              : 'center',
          font:
            props.options && props.options.title
              ? props.options.title.font
              : { weight: 'bold', size: 20 },
        },
      },
      scales: {
        y: {
          title: {
            text:
              props.options && props.options.yAxis.text
                ? props.options.yAxis.text
                : '',
            display:
              props.options &&
              props.options.yAxis &&
              props.options.yAxis.text > '',
            color:
              props.options && props.options.yAxis
                ? props.options.yAxis.color
                : '',
            align:
              props.options && props.options.yAxis
                ? props.options.yAxis.align === 'left'
                  ? 'start'
                  : props.options.yAxis.align === 'center'
                  ? 'center'
                  : props.options.yAxis.align === 'right'
                  ? 'end'
                  : 'center'
                : 'center',
            font:
              props.options && props.options.yAxis
                ? props.options.yAxis.font
                : { weight: 'normal', size: 14 },
          },
          grid: {
            borderColor:
              props.options && props.options.yAxis
                ? props.options.yAxis.borderColor
                : '',
            tickColor:
              props.options && props.options.yAxis
                ? props.options.yAxis.tickColor
                : '',
            color:
              props.options && props.options.yAxis
                ? props.options.yAxis.gridColor
                : '',
          },
          ticks: {
            color:
              props.options && props.options.xAxis
                ? props.options.yAxis.tickLabelColor
                : '',
          },
        },
        x: {
          title: {
            text:
              props.options && props.options.xAxis.text
                ? props.options.xAxis.text
                : '',
            display:
              props.options &&
              props.options.xAxis &&
              props.options.xAxis.text > '',
            color:
              props.options && props.options.xAxis
                ? props.options.xAxis.color
                : '',
            align:
              props.options && props.options.xAxis
                ? props.options.xAxis.align === 'left'
                  ? 'start'
                  : props.options.xAxis.align === 'center'
                  ? 'center'
                  : props.options.xAxis.align === 'right'
                  ? 'end'
                  : 'center'
                : 'center',
            font:
              props.options && props.options.xAxis
                ? props.options.xAxis.font
                : { weight: 'normal', size: 14 },
          },
          grid: {
            borderColor:
              props.options && props.options.xAxis
                ? props.options.xAxis.borderColor
                : '',
            tickColor:
              props.options && props.options.xAxis
                ? props.options.xAxis.tickColor
                : '',
            color:
              props.options && props.options.xAxis
                ? props.options.xAxis.gridColor
                : '',
          },
          ticks: {
            color:
              props.options && props.options.xAxis
                ? props.options.xAxis.tickLabelColor
                : '',
          },
        },
      },
    }));
    // const { lineChartProps } = useLineChart({
    //   options: chartOptions,
    //   chartData,
    // });
    return {
      chartData,
      chartOptions,
      trends,
      chartCard,
      chartHeight:
        chartCard.value instanceof Element ? dom.height(chartCard.value) : 0,
    };
  },
});
</script>
