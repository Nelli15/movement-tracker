<template>
  <div class="fit">
    <!-- <mt-trends-toolbox
      :options="options"
      @toggleOptionsDrawer="toggleOptionsDrawer = !toggleOptionsDrawer"
      @toggleGraphsDrawer="toggleGraphsDrawer = !toggleGraphsDrawer"
    /> -->
    <mt-line-chart :options="options" />
    <!-- <q-scroll-area style="height: calc(100vh - 50px); max-width: 100%">
      <div
        :style="
          'height:60px;background-color:white;position:relative;background-color:' +
          backgroundColor +
          ';'
        "
        class="print-hide"
        data-cy="movement-banner"
      >
        <div
          class="text-center text-h3 w-100"
          :style="'position:absolute;color:' + color + ';'"
        >
          {{ movement ? movement.name : "" }}
        </div>
      </div>
      <div class="container row" style="margin-left: 58px">
        <div class="col-12">-->
    <!--
          <q-tab-panels v-model="type"> </q-tab-panels>
        </div>
      </div>
    </q-scroll-area> -->
    <!-- <q-drawer
      :model-value="toggleOptionsDrawer"
      side="right"
      :width="300"
      elevated
    >
      <q-btn
        round
        color="primary"
        icon="chevron_right"
        fab-mini
        class="absolute"
        style="top: 50%; left: -30px; z-index: 10"
        @click="$emit('close', {})"
        aria-label="Hide Options"
      />
      <q-scroll-area style="height: 99%; max-width: 100%">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="data" label="Data" />
          <q-tab name="style" label="Style" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="data">
            <q-list class="q-mt-md">
              Chart Type
              <q-item>
                <q-select
                  outlined
                  v-model="type"
                  :options="typeOptions"
                  label="Graph Type"
                  options-selected-class="text-positive"
                  style="width: 100%"
                  :color="q.dark.isActive ? 'blue-2' : ''"
                />
              </q-item>
              Dates
              <q-item>
                <q-select
                  outlined
                  v-model="fromMonth"
                  label="Start Month"
                  style="width: 50%"
                  :color="q.dark.isActive ? 'blue-2' : ''"
                  debounce="1000"
                  :options="monthOpts"
                  options-dense
                >
                </q-select>
                <q-select
                  outlined
                  v-model="endMonth"
                  label="End Month"
                  style="width: 50%"
                  :color="q.dark.isActive ? 'blue-2' : ''"
                  debounce="1000"
                  :options="endMonthOpts"
                  options-dense
                >
                </q-select>
              </q-item>
              <q-item>
                <q-select
                  :disable="!(fromMonth > '' && endMonth > '')"
                  outlined
                  v-model="selectedTrees"
                  :options="treeOptsFiltered"
                  options-value="id"
                  options-label="label"
                  multiple
                  label="Trees"
                  options-selected-class="text-positive"
                  style="width: 100%"
                  use-input
                  input-debounce="0"
                  @filter="treesFilterFn"
                  use-chips
                  :color="q.dark.isActive ? 'blue-2' : ''"
                  hide-dropdown-icon
                >
                  <template v-slot:selected>
                    <q-scroll-area style="height: 100px; width: 100%">
                      <q-chip
                        removable
                        dense
                        @remove="selectedTrees.splice(index, 1)"
                        color="positive"
                        class="q-ma-xs"
                        v-for="(val, index) in selectedTrees"
                        :key="index"
                        >{{ val.label }}
                      </q-chip>
                    </q-scroll-area>
                  </template>
                  <template v-slot:append>
                    <q-icon
                      name="cancel"
                      @click.stop="selectedTrees = []"
                      class="cursor-pointer"
                      v-if="selectedTrees.length > 0"
                      style="font-size: 0.75em"
                    />
                    <q-icon
                      name="select_all"
                      @click.stop="selectedTrees = [...treeOptsFiltered]"
                      class="cursor-pointer"
                      v-if="selectedTrees.length <= 0"
                    />
                  </template>
                </q-select>
              </q-item>

              <q-item>
                <q-select
                  :disable="!(fromMonth > '' && endMonth > '')"
                  outlined
                  v-model="selectedStyles"
                  :options="statsOptsFiltered"
                  options-value="id"
                  options-label="label"
                  multiple
                  label="Statistics"
                  options-selected-class="text-positive"
                  style="width: 100%"
                  use-input
                  input-debounce="0"
                  @filter="statsFilterFn"
                  use-chips
                  :color="q.dark.isActive ? 'blue-2' : ''"
                  hide-dropdown-icon
                >
                  <template v-slot:selected>
                    <q-scroll-area style="height: 100px; width: 100%">
                      <q-chip
                        removable
                        dense
                        @remove="selectedStyles.splice(index, 1)"
                        color="positive"
                        class="q-ma-xs"
                        v-for="(val, index) in selectedStyles"
                        :key="index"
                        >{{ val.label }}
                      </q-chip>
                    </q-scroll-area>
                  </template>
                  <template v-slot:append>
                    <q-icon
                      name="cancel"
                      @click.stop="selectedStyles = []"
                      class="cursor-pointer"
                      v-if="selectedStyles.length > 0"
                      style="font-size: 0.75em"
                    />
                    <q-icon
                      name="select_all"
                      @click.stop="selectedStyles = [...statsOptsFiltered]"
                      class="cursor-pointer"
                      v-if="selectedStyles.length <= 0"
                    />
                  </template>
                </q-select>
              </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="style">
            <q-list class="q-mt-md">
              <q-expansion-item expand-separator label="Title">
                <q-card>
                  <q-card-section>
                    <q-input
                      outlined
                      label="Title"
                      v-model="options.title"
                      style="width: 100%"
                      :color="q.dark.isActive ? 'blue-2' : ''"
                      debounce="2000"
                    />
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item expand-separator label="Axis">
                <q-card>
                  <q-card-section>
                    <q-input
                      outlined
                      label="Axis Label"
                      v-model="options.axis"
                      :color="q.dark.isActive ? 'blue-2' : ''"
                      debounce="2000"
                    />
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item expand-separator label="X Axis">
                <q-card>
                  <q-card-section>
                    <q-input
                      outlined
                      label="X Axis Label"
                      v-model="options.xAxis"
                      :color="q.dark.isActive ? 'blue-2' : ''"
                      debounce="2000"
                    />
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item expand-separator label="Y Axis">
                <q-card>
                  <q-card-section>
                    <q-input
                      outlined
                      label="Y Axis Label"
                      v-model="options.yAxis"
                      :color="q.dark.isActive ? 'blue-2' : ''"
                      debounce="2000"
                    />
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-expansion-item expand-separator label="Legend">
                <q-card>
                  <q-card-section>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quidem, eius reprehenderit eos corrupti commodi magni
                    quaerat ex numquam, dolorum officiis modi facere maiores
                    architecto suscipit iste eveniet doloribus ullam aliquid.
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-select
                outlined
                v-model="lineTension"
                :options="[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]"
                label="Line Tension"
                options-selected-class="text-positive"
                v-if="type === 'Line'"
                :color="q.dark.isActive ? 'blue-2' : ''"
              >
                <q-tooltip
                  class="bg-accent text-grey-10"
                  anchor="center right"
                  self="center left"
                  >Line Tension</q-tooltip
                >
              </q-select>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-scroll-area>
    </q-drawer> -->

    <mt-trends-graph-options
      :show="true"
      :options="options"
      @update="options = $event"
    />
    <!-- <mt-trends-saved-graphs
      :show="toggleGraphsDrawer"
      @close="toggleGraphsDrawer = false"
      @openGraph="onOpenGraph"
    /> -->
  </div>
</template>

<script>
import { setCurrentScreen, getAnalytics } from '@firebase/analytics';
import { useStore } from 'vuex';
import {
  getFirestore,
  getDoc,
  doc,
  getDocs,
  query,
  collection,
  orderBy,
  where,
} from '@firebase/firestore';
import {
  defineAsyncComponent,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
} from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
function toArray(object) {
  if (!object) {
    return [];
  }
  if (Object.keys(object).length <= 0) {
    return [];
  }
  return Object.keys(object).map((i) => object[i]);
}

export default {
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
    const store = useStore();
    const route = useRoute();
    const toggleOptionsDrawer = ref(false);
    const toggleGraphsDrawer = ref(false);
    const options = ref({
      chartType: 'Line',
      startDate: new Date().getTime(),
      endDate: new Date().getTime(),
      title: '',
      stats: [],
      trees: [],
      lineTension: 0.3,
      xAxis: 'Snapshots by Date',
      yAxis: 'Number of Members',
      axis: 'Number of Members',
    });
    const type = ref('Line');
    const typeOptions = ref(['Line', 'Bar', 'Pie', 'Polar']);
    const title = ref('Movement Size over time');
    const xAxis = ref('Snapshots by Date');
    const yAxis = ref('Number of Members');
    const axis = ref('Number of Members');

    // define data related user editable values
    let d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    const dataOpts = ref({
      selectedTrees: ['main-tree'],
      selectedStyles: ['example-role'],
      startDate: d.getTime(),
      endDate: new Date().getTime(),
    });
    const graphDetails = ref({});

    const tab = ref('data');
    const trends = computed(() => store.state.trends.trends);

    const config = reactive({
      type: 'bar',
      data: {
        labels: ['test'],
        datasets: [
          {
            label: 'test',
            data: Array(1),
            backgroundColor: '#ffffff',
            borderColor: '#ff0000',
            fill: false,
          },
        ],
      },
    });
    setCurrentScreen(getAnalytics(), 'Movement_Trends');

    function getLineData() {
      let chartData = {
        labels: [],
        datasets: [],
      };
      // if trends have been fetched and stats have been selected
      if (
        Object.keys(trends.value).length > 0 &&
        Object.keys(dataOpts.value.selectedStyles).length > 0 &&
        Object.keys(dataOpts.value.selectedTrees).length > 0
      ) {
        const selectedTrees = dataOpts.value.selectedTrees;
        const selectedStyles = dataOpts.value.selectedStyles;
        // set labels
        // for (let ii in selectedMonths) {
        chartData.labels.push(
          // snapshots[selectedMonths[ii]] && snapshots[selectedMonths[ii]].title
          //   ? snapshots[selectedMonths[ii]].title
          //   : selectedMonths[ii]
          'test'
        );
        // }

        // loop through selected stats
        for (var treeId of selectedTrees) {
          for (var styleId of selectedStyles) {
            let trend = trends.value[`${treeId}-${styleId}`];

            let data = [];

            //check if the stat exists in the trends list
            if (trend) {
              for (var trendEl of trend.trend) {
                data.push(trendEl.value ? trendEl.value : 0);
              }
              //push the trend into the datasets array
              chartData.datasets.push({
                label: 'test',
                // styleOpts.find(
                //   (el) =>
                //     Object.values(trend.data)[
                //       Object.keys(trend.data).length - 1
                //     ].styleId === el.id
                // ).label,
                data: data,
                backgroundColor: '#ffffff',
                borderColor: '#ff0000',
                fill: false,
                // lineTension: lineTension
                //   ? lineTension
                //   : lineTension === 0
                //   ? 0
                //   : 0.3,
                // target: styleOpts.find(
                //   (el) =>
                //     Object.values(trend.data)[
                //       Object.keys(trend.data).length - 1
                //     ].styleId === el.id
                // ).target,
                // unit: styleOpts.find(
                //   (el) =>
                //     Object.values(trend.data)[
                //       Object.keys(trend.data).length - 1
                //     ].styleId === el.id
                // ).unit,
                // type: type.value.toLowerCase(),
              });
            }
          }
        }
      }

      console.log(chartData);
      config.data = chartData;
      // myChart.value = new Chart(chartRef.value, config.value);
    }

    watch(
      dataOpts,
      async () => {
        // fetch all the selected trends
        let promises = [];
        if (
          Object.keys(dataOpts.value.selectedStyles).length > 0 &&
          Object.keys(dataOpts.value.selectedTrees).length > 0
        ) {
          let d = new Date();
          d.setFullYear(d.getFullYear() - 1);
          // loop through selected stats
          for (var ii in dataOpts.value.selectedTrees) {
            for (var jj in dataOpts.value.selectedStyles) {
              promises.push(
                store.dispatch('trends/fetchTrend', {
                  movId: route.params.movId,
                  styleId: dataOpts.value.selectedStyles[jj],
                  treeId: dataOpts.value.selectedTrees[ii],
                  startDate: dataOpts.value.startDate,
                  endDate: dataOpts.value.endDate,
                })
              );
            }
          }
        }
        await Promise.all(promises);
        getLineData();
      },
      { deep: true, immediate: true }
    );
    return {
      q,
      graphDetails,
      typeOptions,
      toggleOptionsDrawer,
      toggleGraphsDrawer,
      type,
      tab,
      title,
      xAxis,
      yAxis,
      axis,
      options,
    };
  },
  components: {
    'mt-trends-toolbox': defineAsyncComponent(() =>
      import('./../components/mt-trends-toolbox.vue')
    ),
    'mt-trends-saved-graphs': defineAsyncComponent(() =>
      import('./../components/mt-trends-saved-graphs.vue')
    ),
    'mt-trends-graph-options': defineAsyncComponent(() =>
      import('./../components/mt-trends-graph-options.vue')
    ),
    'mt-line-chart': defineAsyncComponent(() =>
      import('./../components/mt-LineChart.vue')
    ),
  },
};
</script>

<style>
.btn-rounded {
  border-radius: 25px !important;
}

.btn-underline {
  text-decoration: underline !important;
}
</style>
