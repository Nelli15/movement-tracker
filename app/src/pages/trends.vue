<template>
  <div class="fit">
    <MovBanner dense readOnly />
    <mt-trends-toolbox
      :options="options"
      @toggleOptionsDrawer="optsDrawer.toggle()"
      @toggleGraphsDrawer="toggleGraphsDrawer = !toggleGraphsDrawer"
      class="print-hide"
    />
    <mt-line-chart
      v-if="options.chartType === 'Line'"
      :options="options"
      :data="data"
    />
    <!-- <mt-bar-chart
      v-else-if="options.chartType === 'Bar'"
      :options="options"
      :data="data"
    /> -->

    <mt-trends-graph-options
      ref="optsDrawer"
      :options="options"
      :data="data"
      @update:options="options = $event"
      @update:data="data = $event"
      class="print-hide"
    />
    <!-- <mt-trends-saved-graphs
      :show="toggleGraphsDrawer"
      @close="toggleGraphsDrawer = false"
      @openGraph="onOpenGraph"
    /> -->
  </div>
</template>

<script lang="ts">
import { setCurrentScreen, getAnalytics } from '@firebase/analytics';
import { defineAsyncComponent, defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'TrendsPage',
  preFetch({ store, currentRoute }) {
    store.dispatch('movement/fetchTrees', {
      movId: currentRoute.params.movId,
    });
    store.dispatch('movement/fetchStyles', {
      movId: currentRoute.params.movId,
    });
  },
  setup() {
    const q = useQuasar();
    const optsDrawer = ref(null);
    const toggleGraphsDrawer = ref(false);
    let d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    const data = ref({
      startDate: d.getTime(),
      endDate: new Date().getTime(),
      stats: [],
      trees: [],
    });
    const options = ref({
      chartType: 'Line',
      title: {
        text: '',
        pos: 'top',
        color: q.dark.isActive ? '#FFFFFF' : '#000000',
        align: 'center',
        font: { weight: 'bold', size: 20 },
      },
      chartBackground: '#263238',
      trends: {},
      xAxis: {
        text: 'Snapshots by Date',
        color: q.dark.isActive ? '#FFFFFF' : '#000000',
        align: 'center',
        font: { weight: 'normal', size: 14 },
        borderColor: '#454545',
        gridColor: '#454545',
        tickColor: '#454545',
        tickLabelColor: '#454545',
      },
      yAxis: {
        text: 'Number of Members',
        color: q.dark.isActive ? '#FFFFFF' : '#000000',
        align: 'center',
        font: { weight: 'normal', size: 14 },
        borderColor: '#454545',
        gridColor: '#454545',
        tickColor: '#454545',
        tickLabelColor: '#454545',
      },
      axis: {
        text: 'Number of Members',
      },
      legend: {
        pos: 'top',
        align: 'center',
        display: false,
      },
    });

    setCurrentScreen(getAnalytics(), 'Movement_Trends');

    return {
      q,
      optsDrawer,
      toggleGraphsDrawer,
      options,
      data,
    };
  },
  components: {
    'mt-trends-toolbox': defineAsyncComponent(
      () => import('./../components/mt-trends-toolbox.vue')
    ),
    'mt-trends-saved-graphs': defineAsyncComponent(
      () => import('./../components/mt-trends-saved-graphs.vue')
    ),
    'mt-trends-graph-options': defineAsyncComponent(
      () => import('./../components/mt-trends-graph-options.vue')
    ),
    'mt-line-chart': defineAsyncComponent(
      () => import('../components/charts/mt-linechart.vue')
    ),
    'mt-bar-chart': defineAsyncComponent(
      () => import('../components/charts/mt-barchart.vue')
    ),
    MovBanner: defineAsyncComponent(
      () => import('./../components/MovBanner.vue')
    ),
  },
});
</script>

<style>
.btn-rounded {
  border-radius: 25px !important;
}

.btn-underline {
  text-decoration: underline !important;
}
</style>
