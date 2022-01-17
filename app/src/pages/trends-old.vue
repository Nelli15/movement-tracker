<template>
  <div class="fit">
    {{ chartData }}
    <!-- <mt-trends-toolbox
      :graphDetails="graphDetails"
      :typeOptions="typeOptions"
      @toggleOptionsDrawer="toggleOptionsDrawer = !toggleOptionsDrawer"
      @toggleGraphsDrawer="toggleGraphsDrawer = !toggleGraphsDrawer"
      :statsOptions="statsOptions"
    /> -->
    <!-- {{options}} -->
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
    <canvas ref="chartRef" width="400" height="400" data-cy="graph"></canvas
    ><!--
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
    </q-drawer>
    <mt-trends-saved-graphs
      :show="toggleGraphsDrawer"
      @close="toggleGraphsDrawer = false"
      @openGraph="onOpenGraph"
    /> -->
  </div>
</template>

<script>
import { setCurrentScreen, getAnalytics } from "firebase/analytics";
import { useStore } from "vuex";
import {
  getFirestore,
  getDoc,
  doc,
  getDocs,
  query,
  collection,
  orderBy,
  where,
} from "@firebase/firestore";
import { defineAsyncComponent, ref, computed, watch, onMounted } from "vue";
import Chart from "chart.js/auto";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";

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
  name: "TrendsPage",
  setup() {
    const q = useQuasar();
    const store = useStore();
    const route = useRoute();
    const toggleOptionsDrawer = ref(false);
    const toggleGraphsDrawer = ref(false);
    const options = ref({
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: "bottom",
        align: "left",
        labels: {
          fontColor: q.dark.isActive ? "#fff" : "#666",
        },
      },
      title: {
        display: true,
        text: "Movement Statistics over time",
        fontColor: q.dark.isActive ? "#fff" : "#666",
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Number of Members",
              fontColor: q.dark.isActive ? "#fff" : "#666",
            },
            ticks: {
              min: 0,
              stepSize: 1,
              precision: 0,
              fontColor: q.dark.isActive ? "#fff" : "#666",
            },
            gridLines: {
              color: q.dark.isActive
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Snapshots by Date",
              fontColor: q.dark.isActive ? "#fff" : "#666",
            },
            ticks: {
              fontColor: q.dark.isActive ? "#fff" : "#666",
            },
            gridLines: {
              color: q.dark.isActive
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)",
            },
          },
        ],
      },
      tooltips: {
        enabled: true,
        mode: "single",
        callbacks: {
          label: function (tooltipItems, data) {
            return data.labels[tooltipItems.index];
          },
        },
      },
    });
    const type = ref("Line");
    const typeOptions = ref(["Line", "Bar", "Pie", "Polar"]);
    const title = ref("Movement Size over time");
    const xAxis = ref("Snapshots by Date");
    const yAxis = ref("Number of Members");
    const axis = ref("Number of Members");
    const lineTension = ref(0.3);
    const endMonth = ref("");
    const fromMonth = ref("");
    const graphDetails = ref({});

    const selectedStyles = ref([]);
    const selectedTrees = ref([]);

    const tab = ref("data");
    const trends = ref({});

    const chartData = ref({});
    const myChart = ref({});
    const chartRef = ref(null);
    setCurrentScreen(getAnalytics(), "Movement_Trends");
    onMounted(() => {
      let d = new Date();
      d.setFullYear(d.getFullYear() - 1);
      store.dispatch("trends/fetchTrend", {
        movId: route.params.movId,
        styleId: "example-role",
        treeId: "main-tree",
        startDate: d.getTime(),
        endDate: new Date().getTime(),
      });
      const config = {
        type: "line",
        data: chartData.value,
        options: chartOpts,
      };
      // console.log(Chart, $refs);
      myChart.value = new Chart(chartRef, config);
    });
    function fetchSnapshotsByList(val) {
      store.dispatch("movement/fetchSnapshotsByList", val);
    }
    function onOpenGraph($event) {
      graphDetails.value = $event;
      let toDate = new Date(),
        fromDate = new Date();
      if (time === "current") {
        toDate = new Date(toDate.setDate(toDate.getDate() + 1));
        fromDate = new Date(fromDate.setDate(fromDate.getDate() - 1));
      } else {
        toDate = new Date(toDate.setDate(toDate.getDate() + 1));
        fromDate = new Date(fromDate.setMonth(fromDate.getMonth() - time || 1));
      }
    }
    function getLineData() {
      let chartData = {
        labels: [],
        datasets: [],
        member: {},
      };
      const selectedMonths = selectedMonths.value.sort();

      // if trends have been fetched and stats have been selected
      if (
        Object.keys(trends.value).length > 0 &&
        Object.keys(selectedStyles.value).length > 0 &&
        Object.keys(selectedTrees.value).length > 0
      )
        // set labels
        for (let ii in selectedMonths) {
          chartData.labels.push(
            snapshots[selectedMonths[ii]] && snapshots[selectedMonths[ii]].title
              ? snapshots[selectedMonths[ii]].title
              : selectedMonths[ii]
          );
        }
      console.log(chartData);

      // loop through selected stats
      for (var ii in selectedTrees.value) {
        for (var jj in selectedStyles.value) {
          let trend =
            trends.value[
              `${selectedTrees.value[ii].id}-${selectedStyles.value[jj].id}`
            ];

          let data = [];

          console.log(
            "fetching: ",
            `${selectedTrees.value[ii].id}-${selectedStyles.value[jj].id}`,
            trends.value[
              `${selectedTrees.value[ii].id}-${selectedStyles.value[jj].id}`
            ]
          );

          //check if the stat exists in the trends list
          if (trend) {
            // console.log(trend);
            for (var kk in selectedMonths) {
              console.log(
                selectedMonths[kk],
                trend.data,
                trend.data[selectedMonths[kk]]
              );
              data.push(
                trend.data[selectedMonths[kk]]
                  ? trend.data[selectedMonths[kk]].total
                  : 0
              );
            }
            //push the trend into the datasets array
            chartData.datasets.push({
              label: styleOpts.find(
                (el) =>
                  Object.values(trend.data)[Object.keys(trend.data).length - 1]
                    .styleId === el.id
              ).label,
              data: data,
              backgroundColor: trend.color,
              borderColor: trend.color,
              fill: false,
              lineTension: lineTension
                ? lineTension
                : lineTension === 0
                ? 0
                : 0.3,
              target: styleOpts.find(
                (el) =>
                  Object.values(trend.data)[Object.keys(trend.data).length - 1]
                    .styleId === el.id
              ).target,
              unit: styleOpts.find(
                (el) =>
                  Object.values(trend.data)[Object.keys(trend.data).length - 1]
                    .styleId === el.id
              ).unit,
              type: type.value.toLowerCase(),
            });
          }
        }
      }
      chartData = chartData;
      const config = {
        data: chartData,
        options: options.value,
      };
      console.log(myChart);
      // myChart.update();
    }
    function getPieData() {
      let chartData = {
        labels: [],
        datasets: [],
        member: {},
      };
      let counter = 0;
      if (
        Object.keys(trends.value).length > 0 &&
        Object.keys(selectedStyles.value).length > 0
      )
        if (!flip) {
          chartData.labels = Object.values(snapshotsFiltered.value).map((val) =>
            val.title ? val.title : val.id
          );
          for (var ii in selectedStyles.value) {
            if (trends.value[selectedStyles.value[ii].id]) {
              chartData.datasets.push({
                label: Array.isArray(
                  trends.value[selectedStyles.value[ii].id].labels
                )
                  ? trends.value[selectedStyles.value[ii].id].labels.filter(
                      (val) => val > ""
                    )[
                      trends.value[selectedStyles.value[ii].id].labels.filter(
                        (val) => val > ""
                      ).length - 1
                    ]
                  : "",
                data: [...trends.value[selectedStyles.value[ii].id].totals],
                backgroundColor: colors,
                borderColor: q.dark.isActive ? "#424242" : "#ffffff",
                fill: false,
                lineTension: lineTension
                  ? lineTension
                  : lineTension === 0
                  ? 0
                  : 0.3,
                target: trends.value[selectedStyles.value[ii].id].target,
                unit: trends.value[selectedStyles.value[ii].id].unit,
              });
            }
            counter++;
          }
        } else {
          chartData.unit = [];
          for (var jj in selectedStyles.value) {
            chartData.labels.push(
              trends.value[selectedStyles.value[jj].id].labels.filter(
                (val) => val > ""
              )[
                trends.value[selectedStyles.value[jj].id].labels.filter(
                  (val) => val > ""
                ).length - 1
              ]
            );
            chartData.unit.push(trends.value[selectedStyles.value[jj].id].unit);
          }

          for (var ii in snapshotsFiltered.value) {
            counter = 0;
            chartData.datasets.push({
              label: snapshotsFiltered.value[ii].title
                ? snapshotsFiltered.value[ii].title
                : snapshotsFiltered.value[ii].id,
              data: [],
              backgroundColor: [],
              borderColor: q.dark.isActive ? "#424242" : "#ffffff",
              fill: false,
              lineTension: lineTension ? lineTension : 0.3,
            });
            let stats = {
              ...snapshotsFiltered.value[ii].totals,
              ...(snapshotsFiltered.value[ii].roleStats || []).reduce(
                (obj, item) => {
                  obj[item.id] = item;
                  return obj;
                },
                {}
              ),
              ...(snapshotsFiltered.value[ii].modStats || []).reduce(
                (obj, item) => {
                  obj[item.id] = item;
                  return obj;
                },
                {}
              ),
              ...(snapshotsFiltered.value[ii].complexStats || []).reduce(
                (obj, item) => {
                  obj[item.id] = item;
                  return obj;
                },
                {}
              ),
              ...(toArray(snapshotsFiltered.value[ii].calcStats) || []).reduce(
                (obj, item) => {
                  obj[item.id] = item;
                  return obj;
                },
                {}
              ),
            };
            for (var jj in selectedStyles.value) {
              chartData.datasets[chartData.datasets.length - 1].data.push(
                stats[selectedStyles.value[jj].id]
                  ? stats[selectedStyles.value[jj].id].total
                  : 0
              );
              chartData.datasets[
                chartData.datasets.length - 1
              ].backgroundColor.push(colors[counter]);
              counter++;
            }
          }
        }
      return chartData;
    }
    function getIndividualData() {
      let chartData = {
        labels: [],
        datasets: [],
        member: {},
      };
      let counter = 0;
      if (
        Object.keys(trends.value).length > 0 &&
        Object.keys(selectedStyles.value).length > 0 &&
        member
      )
        chartData.labels = Object.values(snapshotsFiltered.value).map((val) => {
          return {
            label: val.title ? val.title : val.id,
            key: val.id,
            name: val.id,
            align: "center",
            field: val.id,
            sortable: true,
          };
        });
      chartData.labels.unshift({
        label: "Role/Modifier/Complex",
        key: "labels",
        name: "labels",
        align: "center",
        field: "labels",
        sortable: true,
        headerClasses: "bg-primary text-white",
        classes: "bg-grey text-white",
        headerStyle: "width: 200px",
        style: "width: 200px",
      });

      chartData.member = member ? members[member.id] : member;
      for (var ii in selectedStyles.value) {
        if (selectedStyles.value[ii].id === "treeTotal") {
          continue;
        }
        if (trends.value[selectedStyles.value[ii].id]) {
          chartData.datasets.push({
            label: trends.value[selectedStyles.value[ii].id].labels.filter(
              (val) => val > ""
            )[
              trends.value[selectedStyles.value[ii].id].labels.filter(
                (val) => val > ""
              ).length - 1
            ],
            data: [],
            backgroundColor: colors[counter],
            borderColor: q.dark.isActive ? "#424242" : "#ffffff",
            fill: false,
            unit: trends.value[selectedStyles.value[ii].id].unit,
          });
          if (
            member &&
            selectedStyles.value &&
            selectedStyles.value.length > 0
          ) {
            for (var jj in trends.value[selectedStyles.value[ii].id].members) {
              chartData.datasets[chartData.datasets.length - 1].data.push(
                (trends.value[selectedStyles.value[ii].id].members[jj]
                  ? trends.value[selectedStyles.value[ii].id].members[jj][
                      member.id
                    ]
                  : false) === true
                  ? 1
                  : 0
              );
            }
          }
          counter++;
        }
      }
      return chartData;
    }
    const styleOpts = ref([]);
    const statsOptsFiltered = ref([]);
    function statsFilterFn(val, update) {
      if (val === "") {
        update(() => {
          statsOptsFiltered = styleOpts.sort((a, b) => {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });

        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        statsOptsFiltered = styleOpts
          .filter((v) => v.label.toLowerCase().indexOf(needle) > -1)
          .sort((a, b) => {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });
      });
    }
    const treeOpts = ref([]);
    const treeOptsFiltered = ref([]);
    function treesFilterFn(val, update) {
      if (val === "") {
        update(() => {
          treeOptsFiltered = treeOpts.sort((a, b) => {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });

        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        treeOptsFiltered = treeOpts
          .filter((v) => v.label.toLowerCase().indexOf(needle) > -1)
          .sort((a, b) => {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });
      });
    }
    async function fetchSnapStyles() {
      // console.log("fetching the style lists");
      let styles = { treeTotal: { label: "Total on Tree", id: "treeTotal" } };
      let snapsToFetch = selectedMonths;

      let promises = [];
      for (let ii in snapsToFetch) {
        promises.push(
          getDoc(
            doc(
              getFirestore(),
              `/movements/${movement.id}/snapshots/${snapsToFetch[ii]}/lists/styles`
            )
          )
        );
      }

      let docs = await Promise.all(promises);
      // console.log(docs);
      for (let ii in docs) {
        if (docs[ii].exists) {
          let data = docs[ii].data();
          for (let jj in data) {
            styles[jj] = { ...data[jj], id: jj };
          }
        }
      }

      styleOpts = Object.values(styles);
    }
    async function fetchSnapTrees() {
      // console.log("fetching the style lists");
      let trees = {};
      let snapsToFetch = selectedMonths;

      let promises = [];
      for (let ii in snapsToFetch) {
        promises.push(
          getDoc(
            doc(
              getFirestore(),
              `/movements/${movement.id}/snapshots/${snapsToFetch[ii]}/lists/trees`
            )
          )
        );
      }

      let docs = await Promise.all(promises);
      console.log(docs);
      for (let ii in docs) {
        if (docs[ii].exists) {
          let data = docs[ii].data();
          for (let jj in data) {
            trees[jj] = { ...data[jj], id: jj };
          }
        }
      }

      treeOpts = Object.values(trees);
    }
    async function fetchTrends() {
      if (selectedTrees.value.length <= 0 || selectedStyles.value.length <= 0)
        return;
      for (let ii in selectedTrees.value) {
        for (let jj in selectedStyles.value) {
          trends.value[
            `${selectedTrees.value[ii].id}-${selectedStyles.value[jj].id}`
          ] = await fetchTrend({
            styleId: selectedStyles.value[jj].id,
            treeId: selectedTrees.value[ii].id,
          });
        }
      }
      if (type.value === "Line" || type.value === "Bar") {
        return getLineData();
      } else if (
        type.value === "Polar" ||
        type.value === "Pie" ||
        type.value === "Doughnut"
      ) {
        return getPieData();
      } else if (type.value === "Individual Member") {
        return getIndividualData();
      }
    }
    function fetchTrend(payload) {
      if (trends.value[`${payload.treeId}-${payload.styleId}`])
        return trends.value[`${payload.treeId}-${payload.styleId}`];
      let trend = { ...payload, data: [] };
      return getDocs(
        query(
          collection(getFirestore(), `/movements/${movement.id}/trend-data`),
          orderBy("snapId", "asc"),
          where("styleId", "==", payload.styleId),
          where("treeId", "==", payload.treeId)
        )
      ).then((querySnap) => {
        querySnap.forEach((doc) => {
          trend.data[doc.get("snapId")] = doc.data();
        });
        trend.color = getColor();
        return trend;
      });
    }
    function getColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    const movement = computed(store.state.movement.movement);
    const permissions = computed(store.state.movement.permissions);
    const stats = computed(store.state.movement.stats);
    const snapshots = computed(store.state.movement.snapshots);
    const backgroundColor = computed(store.getters["movement/backgroundColor"]);
    const color = computed(store.getters["movement/color"]);
    const roleStats = computed(store.getters["movement/roleStats"]);
    const modStats = computed(store.getters["movement/modStats"]);
    const totalStats = computed(store.getters["movement/totalStats"]);
    const complexStats = computed(store.getters["movement/complexStats"]);
    const calcStats = computed(store.getters["movement/calcStats"]);

    const monthOpts = computed(() => {
      let initialDate = new Date(2018, 0, 1, 0, 0, 0, 0);
      let now = new Date();
      return dateRange(
        "2018-01-01",
        `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
      )
        .sort()
        .reverse();
      function dateRange(startDate, endDate) {
        var start = startDate.split("-");
        var end = endDate.split("-");
        var startYear = parseInt(start[0]);
        var endYear = parseInt(end[0]);
        var dates = [];

        for (var i = startYear; i <= endYear; i++) {
          var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
          var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
          for (
            var j = startMon;
            j <= endMonth;
            j = j > 12 ? j % 12 || 11 : j + 1
          ) {
            var month = j + 1;
            var displayMonth = month < 10 ? "0" + month : month;
            dates.push([i, displayMonth].join("-"));
          }
        }
        return dates;
      }
    });
    const endMonthOpts = computed(() => {
      return monthOpts.value;
    });
    const selectedMonths = computed(() => {
      return dateRange(fromMonth + "-01", endMonth + "-01")
        .sort()
        .reverse();
      function dateRange(startDate, endDate) {
        var start = startDate.split("-");
        var end = endDate.split("-");
        var startYear = parseInt(start[0]);
        var endYear = parseInt(end[0]);
        var dates = [];

        for (var i = startYear; i <= endYear; i++) {
          var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
          var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
          for (
            var j = startMon;
            j <= endMonth;
            j = j > 12 ? j % 12 || 11 : j + 1
          ) {
            var month = j + 1;
            var displayMonth = month < 10 ? "0" + month : month;
            dates.push([i, displayMonth].join("-"));
          }
        }
        return dates;
      }
    });
    const snapshotsFiltered = computed(() => {
      // console.log(snapshots);
      return snapshots;
    });
    // const statsOptions = computed(() => {
    //   let statIds = {
    //     treeTotal: { id: "treeTotal", label: "Total on Tree" },
    //   };
    //   if (type.value === "Individual Member") {
    //     statIds = {};
    //   }
    //   // console.log(stats);
    //   // toArray(stats.value).map((a) => {
    //   //   return { id: a.id, label: a.label };
    //   // });
    //   // console.log(snapshotsFiltered);
    //   if (!snapshotsFiltered.value) return [];
    //   for (var ii in snapshotsFiltered.value) {
    //     for (var stat of snapshotsFiltered.value[ii].roleStats || []) {
    //       statIds[stat.id] = { id: stat.id, label: stat.label };
    //     }
    //     for (var stat of snapshotsFiltered.value[ii].modStats || []) {
    //       statIds[stat.id] = { id: stat.id, label: stat.label };
    //     }
    //     for (var stat of snapshotsFiltered.value[ii].complexStats || []) {
    //       statIds[stat.id] = { id: stat.id, label: stat.label };
    //     }
    //     for (var stat in snapshotsFiltered.value[ii].calcStats || []) {
    //       statIds[snapshotsFiltered.value[ii].calcStats[stat].id] = {
    //         id: snapshotsFiltered.value[ii].calcStats[stat].id,
    //         label: snapshotsFiltered.value[ii].calcStats[stat].label,
    //       };
    //     }
    //   }
    //   return (statIds = toArray(statIds));
    // });
    const chartOpts = computed(() => {
      let opts = options;
      // if (legend) {
      //   opts.legend = legend;
      // }

      // if (title) {
      //   opts.title = title;
      // }

      // if (xAxis) {
      //   opts.scales.xAxes[0] = xAxis;
      // }

      // if (yAxis) {
      //   opts.scales.yAxes[0] = yAxis;
      // }

      // opts.scale = {
      //   ticks: {
      //     fontColor: q.dark.isActive ? "#fff" : "#666",
      //     backdropColor: q.dark.isActive ? "#121212" : "#fff"
      //   },
      //   gridLines: {
      //     color: q.dark.isActive
      //       ? "rgba(255, 255, 255, 0.1)"
      //       : "rgba(0, 0, 0, 0.1)"
      //   }
      // };

      // if (tooltips) {
      //   opts.tooltips = {
      //     enabled: true,
      //     mode: "single",
      //     callbacks: {
      //       title: (tooltipItems, data) => {
      //         return "";
      //       },
      //       label: (tooltipItems, data) => {
      //         return (
      //           data.labels[tooltipItems.index] +
      //           " (" +
      //           data.datasets[tooltipItems.datasetIndex].label +
      //           ")"
      //         );
      //       },
      //       footer: (tooltipItems, data) => {
      //         return type.value === "Pie"
      //           ? `${
      //               data.datasets[tooltipItems[0].datasetIndex].data[
      //                 tooltipItems[0].index
      //               ]
      //             }${
      //               data.unit[tooltipItems[0].index]
      //                 ? data.unit[tooltipItems[0].index]
      //                 : " Members"
      //             } ${Math.round(
      //               (data.datasets[tooltipItems[0].datasetIndex].data[
      //                 tooltipItems[0].index
      //               ] /
      //                 data.datasets[tooltipItems[0].datasetIndex].data.reduce(
      //                   (a, b) => a + b,
      //                   0
      //                 )) *
      //                 100
      //             ) + "%"}`
      //           : `${
      //               data.datasets[tooltipItems[0].datasetIndex].data[
      //                 tooltipItems[0].index
      //               ]
      //             }${
      //               data.datasets[tooltipItems[0].datasetIndex].unit
      //                 ? data.datasets[tooltipItems[0].datasetIndex].unit
      //                 : " Members"
      //             } ${
      //               type.value !== "Line" && type.value !== "Bar"
      //                 ? Math.round(
      //                     (data.datasets[tooltipItems[0].datasetIndex].data[
      //                       tooltipItems[0].index
      //                     ] /
      //                       data.datasets[
      //                         tooltipItems[0].datasetIndex
      //                       ].data.reduce((a, b) => a + b, 0)) *
      //                       100
      //                   ) + "%"
      //                 : ""
      //             }\nMinimum: ${
      //               Math.min(
      //                 ...data.datasets[tooltipItems[0].datasetIndex].data
      //               ) > 0
      //                 ? Math.min(
      //                     ...data.datasets[tooltipItems[0].datasetIndex].data
      //                   )
      //                 : 0
      //             }${
      //               data.datasets[tooltipItems[0].datasetIndex].unit
      //                 ? data.datasets[tooltipItems[0].datasetIndex].unit
      //                 : " Members"
      //             }\nMean: ${(
      //               data.datasets[tooltipItems[0].datasetIndex].data.reduce(
      //                 (a, b) => a + b,
      //                 0
      //               ) / data.datasets[tooltipItems[0].datasetIndex].data.length
      //             ).toFixed(2)}${
      //               data.datasets[tooltipItems[0].datasetIndex].unit
      //                 ? data.datasets[tooltipItems[0].datasetIndex].unit
      //                 : " Members"
      //             }\nMedian: ${(data.datasets[tooltipItems[0].datasetIndex].data
      //               .length %
      //               2 !==
      //             0
      //               ? data.datasets[tooltipItems[0].datasetIndex].data.sort(
      //                   (a, b) => a - b
      //                 )[
      //                   Math.floor(
      //                     data.datasets[tooltipItems[0].datasetIndex].data
      //                       .length / 2
      //                   )
      //                 ]
      //               : (data.datasets[tooltipItems[0].datasetIndex].data.sort(
      //                   (a, b) => a - b
      //                 )[
      //                   Math.floor(
      //                     data.datasets[tooltipItems[0].datasetIndex].data
      //                       .length / 2
      //                   ) - 1
      //                 ] +
      //                   data.datasets[tooltipItems[0].datasetIndex].data.sort(
      //                     (a, b) => a - b
      //                   )[
      //                     Math.floor(
      //                       data.datasets[tooltipItems[0].datasetIndex].data
      //                         .length / 2
      //                     )
      //                   ]) /
      //                 2
      //             ).toFixed(2)}${
      //               data.datasets[tooltipItems[0].datasetIndex].unit
      //                 ? data.datasets[tooltipItems[0].datasetIndex].unit
      //                 : " Members"
      //             }\nMaximum: ${Math.max(
      //               ...data.datasets[tooltipItems[0].datasetIndex].data
      //             )}${
      //               data.datasets[tooltipItems[0].datasetIndex].target
      //                 ? "\nTarget: " +
      //                   data.datasets[tooltipItems[0].datasetIndex].target
      //                 : ""
      //             }${
      //               data.datasets[tooltipItems[0].datasetIndex].unit
      //                 ? data.datasets[tooltipItems[0].datasetIndex].unit
      //                 : " Members"
      //             }`;
      //       }
      //     }
      //   };
      // }
      return opts;
    });

    watch(
      endMonth,
      () => {
        if (fromMonth > "") {
          fetchSnapStyles();
          fetchSnapTrees();
          fetchSnapshotsByList(selectedMonths.value);
        }
      },
      { deep: true }
    );
    watch(
      fromMonth,
      (newDetails, oldDetails) => {
        if (endMonth > "") {
          fetchSnapStyles();
          fetchSnapTrees();
          fetchSnapshotsByList(selectedMonths.value);
        }
      },
      { deep: true }
    );

    watch(
      selectedTrees,
      () => {
        fetchTrends();
      },
      { deep: true }
    );
    watch(
      selectedStyles,
      () => {
        fetchTrends();
      },
      { deep: true }
    );
    return {
      graphDetails,
      typeOptions,
      // statsOptions,
      snapshotsFiltered,
      treesFilterFn,
      treeOptsFiltered,
      statsFilterFn,
      statsOptsFiltered,
      toggleOptionsDrawer,
      toggleGraphsDrawer,
      onOpenGraph,
      backgroundColor,
      color,
      movement,
      type,
      tab,
      permissions,
      chartRef,
      stats,
      roleStats,
      modStats,
      complexStats,
      calcStats,
      totalStats,
      title,
      xAxis,
      yAxis,
      axis,
      endMonthOpts,
    };
  },
  components: {
    "line-chart": defineAsyncComponent(() =>
      import("../components/charts/mt-linechart.vue")
    ),
    "bar-chart": defineAsyncComponent(() =>
      import("../components/charts/mt-barchart.vue")
    ),
    "pie-chart": defineAsyncComponent(() =>
      import("../components/charts/mt-piechart.vue")
    ),
    "scatter-chart": defineAsyncComponent(() =>
      import("../components/charts/mt-scatterchart.vue")
    ),
    "polar-chart": defineAsyncComponent(() =>
      import("../components/charts/mt-polarchart.vue")
    ),
    "radar-chart": defineAsyncComponent(() =>
      import("../components/charts/mt-radarchart.vue")
    ),
    "mt-trends-toolbox": defineAsyncComponent(() =>
      import("../components/mt-trends-toolbox.vue")
    ),
    "mt-trends-saved-graphs": defineAsyncComponent(() =>
      import("../components/mt-trends-saved-graphs.vue")
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
