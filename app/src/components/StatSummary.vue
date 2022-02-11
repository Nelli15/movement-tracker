<template>
  <q-card class="q-mx-sm" :flat="!showIf">
    <slot></slot>
    <div
      v-if="showIf"
      :style="`height: ${stat.id !== 'treeTotal' ? '350px' : '280px'};`"
      class="q-mx-sm"
    >
      <div
        class="full-width"
        :style="`height: ${stat.id !== 'treeTotal' ? '80%' : '100%'};`"
      >
        <LineChart v-bind="lineChartProps" />
      </div>
      <div class="row text-bold" v-if="stat.id !== 'treeTotal'">
        Member Movements
      </div>
      <div class="row q-gutter-xs" v-if="stat.id !== 'treeTotal'">
        <span class="col-3"
          ><q-icon name="add" /> ({{ added.total }})<q-tooltip
            class="bg-accent text-grey-10"
          >
            <q-icon name="add" /> {{ added.total }} Member{{
              added.total > 1 ? 's' : ''
            }}
            added since last Snapshot</q-tooltip
          ></span
        >
        <span class="col-3"
          ><q-icon name="person" /> ({{ retained.total }})<q-tooltip
            class="bg-accent text-grey-10"
          >
            <q-icon name="person" /> {{ retained.total }} Member{{
              retained.total > 1 ? 's' : ''
            }}
            retained from last Snapshot</q-tooltip
          ></span
        >
        <span class="col-3"
          ><q-icon name="remove" /> ({{ removed.total }})<q-tooltip
            class="bg-accent text-grey-10"
          >
            <q-icon name="remove" /> {{ removed.total }} Member{{
              removed.total > 1 ? 's' : ''
            }}
            removed since last Snapshot</q-tooltip
          ></span
        >
      </div>
    </div>
  </q-card>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  getDoc,
  limit,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
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
export default {
  name: 'StatSummary',
  props: ['stat', 'treeOpt', 'showIf'],
  components: { LineChart },
  setup(props) {
    const store = useStore();
    const movement = computed(() => store.state.movement.movement);
    const trend = ref({});
    // fetch trend for stat
    function fetchTrend() {
      let d = new Date();
      d.setFullYear(d.getFullYear() - 1);
      return store.dispatch('trends/fetchTrend', {
        treeId: props.treeOpt.id,
        movId: movement.value.id,
        styleId: props.stat.id,
        startDate: d.getTime(),
        endDate: new Date().getTime(),
      });
    }
    async function fetchLastSnapshot() {
      // get the stat from last month snapshot
      let lastSnap = await getDocs(
        query(
          collection(
            getFirestore(),
            `movements/${movement.value.id}/snapshots/`
          ),
          where('date', '<', new Date()),
          orderBy('date', 'desc'),
          limit(1)
        )
      );
      for (let snapDoc of lastSnap.docs) {
        let statsDoc = await getDoc(
          doc(
            getFirestore(),
            `movements/${movement.value.id}/snapshots/${snapDoc.id}/trees/${props.treeOpt.id}/components/stats`
          )
        );
        let statVal = statsDoc.get(props.stat.id);
        return { members: [], ...statVal };
      }
    }

    let lastStat = ref({});

    let added = computed(() => {
      // compute the number of members added since last snap
      let added = { total: 0, members: [] };
      if (!(lastStat.value && lastStat.value.members) || !props.stat)
        return added;
      for (let ii in props.stat.members) {
        if (!lastStat.value.members.includes(ii)) {
          added.total++;
          added.members.push(ii);
        }
      }
      return added;
    });
    let removed = computed(() => {
      // compute the number of members removed since last snap
      let removed = { total: 0, members: [] };
      if (!(lastStat.value && lastStat.value.members) || !props.stat)
        return removed;
      for (let ii in lastStat.value.members) {
        if (!props.stat.members[lastStat.value.members[ii]]) {
          removed.total++;
          removed.members.push(ii);
        }
      }
      return removed;
    });
    let retained = computed(() => {
      // compute the number of members retained since last snap
      let retained = { total: 0, members: [] };
      if (!(lastStat.value && lastStat.value.members) || !props.stat)
        return retained;
      for (let ii in props.stat.members) {
        if (lastStat.value.members.includes(ii)) {
          retained.total++;
          retained.members.push(ii);
        }
      }
      return retained;
    });
    const months = [
        { label: 'January', number: 0 },
        { label: 'February', number: 1 },
        { label: 'March', number: 2 },
        { label: 'April', number: 3 },
        { label: 'May', number: 4 },
        { label: 'June', number: 5 },
        { label: 'July', number: 6 },
        { label: 'August', number: 7 },
        { label: 'September', number: 8 },
        { label: 'October', number: 9 },
        { label: 'November', number: 10 },
        { label: 'December', number: 11 },
      ],
      month = new Date().getMonth(),
      previous = months.splice(0, month);
    // if you have to use this in a front-end app, you might want to use .concat(...) instead of the spread operator
    const monthVals = [...previous, ...months];
    const labels = ref([]);
    const data = ref([]);
    const targetData = ref([]);
    watch(trend, () => {
      // loop through the months and get relevant snapshots
      var date = new Date();
      let l_data = [],
        l_labels = [],
        l_targetData = [];
      for (let ii in monthVals) {
        var firstDay = new Date(date.getFullYear(), date.getMonth() - ii, 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() - ii + 1, 0);
        let el = trend.value.trend
          ? trend.value.trend.find((val, ind, arr) => {
              return (
                val.date > firstDay.getTime() && val.date < lastDay.getTime()
              );
            })
          : null;
        l_labels.unshift(monthVals[ii].label);
        l_data.unshift(
          el ? el.value : data[data.length] ? data[data.length] : 0
        );
        l_targetData.unshift(props.stat.target ? props.stat.target : 0);
      }
      // add the current snapshots
      l_labels.push('now');
      l_data.push(props.stat.total);
      l_targetData.push(props.stat.target ? props.stat.target : 0);

      labels.value = l_labels;
      data.value = l_data;
      targetData.value = l_targetData;
    });
    function fetchData() {
      fetchLastSnapshot().then((res) => {
        return (lastStat.value = res);
      });
      fetchTrend().then((res) => (trend.value = res));
    }
    watch(
      props.treeOpt,
      () => {
        if (props['showIf']) fetchData();
      },
      { immediate: true }
    );
    watch(
      computed(() => {
        return props.showIf;
      }),
      () => {
        if (props['showIf']) fetchData();
      },
      { immediate: true }
    );
    const getData = computed(() => ({
      labels: labels.value,
      datasets: [
        {
          label: props.stat.label,
          data: data.value,
          fill: false,
          borderColor: 'rgb(197, 66, 16)',
        },
        {
          label: 'Current Target',
          data: targetData.value,
          fill: false,
          borderColor: 'rgb(0, 179, 0)',
        },
      ],
    }));

    function min(arr) {
      if (arr.length <= 0) return 0;
      return arr.reduce(function (p, v) {
        return p < v ? p : v;
      });
    }

    function max(arr) {
      if (arr.length <= 0) return 10;
      return arr.reduce(function (p, v) {
        return p > v ? p : v;
      });
    }

    function mean(arr) {
      return sum(arr) / arr.length;
    }

    function sum(arr) {
      return arr.reduce((partial_sum, a) => partial_sum + a, 0);
    }
    const options = computed(() => ({
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: '13 Month Totals',
        },
      },
      scales: {
        y: {
          suggestedMin:
            min(data.value) * 0.8 > min(data.value) - mean(data.value) / 2
              ? min(data.value) * 0.8
              : min(data.value) - mean(data.value) / 2,
          suggestedMax:
            max(data.value) * 1.2 > max(data.value) + mean(data.value) / 2
              ? max(data.value) * 1.2
              : max(data.value) + mean(data.value) / 2,
          title: {
            display: true,
            text: props.stat.unit ? props.stat.unit : 'Members',
          },
        },
      },
    }));

    const { lineChartProps } = useLineChart({
      options,
      chartData: getData,
    });
    return {
      added,
      removed,
      retained,
      getData,
      options,
      lineChartProps,
      trend,
      lastStat,
    };
  },
};
</script>
