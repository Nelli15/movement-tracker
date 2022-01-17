<template>
  <q-drawer :model-value="show" side="right" :width="300" elevated>
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
              <!-- </div> -->
              <!-- <div class="q-pa-md" style="max-width: 300px"> -->
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
              <!-- </div> -->
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
                    v-model="title"
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
                    v-model="axis"
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
                    v-model="xAxis"
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
                    v-model="yAxis"
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
                  Quidem, eius reprehenderit eos corrupti commodi magni quaerat
                  ex numquam, dolorum officiis modi facere maiores architecto
                  suscipit iste eveniet doloribus ullam aliquid.
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
</template>

<script>
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
import { mapActions, mapState } from "vuex";
export default {
  // name: 'ComponentName',
  props: ["show", "typeOptions", "statsOptions"],
  data() {
    return {
      treeOptsFiltered: [],
      statsOptsFiltered: [],
      title: "Movement Size over time",
      type: "Line",
      selectedStyles: [],
      selectedTrees: [],
      xAxis: "Snapshots by Date",
      yAxis: "Number of Members",
      axis: "Number of Member",
      lineTension: 0.3,
      endMonth: "",
      fromMonth: "",
      treeOpts: [],
      styleOpts: [],
      tab: "data",
      trends: {},
    };
  },
  computed: {
    ...mapState("movement", ["movement"]),
    monthOpts() {
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
    },
    endMonthOpts() {
      return this.monthOpts;
    },
  },
  methods: {
    statsFilterFn(val, update) {
      if (val === "") {
        update(() => {
          this.statsOptsFiltered = this.styleOpts.sort((a, b) => {
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
        this.statsOptsFiltered = this.styleOpts
          .filter((v) => v.label.toLowerCase().indexOf(needle) > -1)
          .sort((a, b) => {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });
      });
    },
    treesFilterFn(val, update) {
      if (val === "") {
        update(() => {
          this.treeOptsFiltered = this.treeOpts.sort((a, b) => {
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
        this.treeOptsFiltered = this.treeOpts
          .filter((v) => v.label.toLowerCase().indexOf(needle) > -1)
          .sort((a, b) => {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });
      });
    },
    async fetchSnapStyles() {
      // console.log("fetching the style lists");
      let styles = { treeTotal: { label: "Total on Tree", id: "treeTotal" } };
      let snapsToFetch = [...this.monthOpts]
        .filter((val, ind) => val >= this.fromMonth && val <= this.endMonth)
        .sort();

      let promises = [];
      for (let ii in snapsToFetch) {
        promises.push(
          getDoc(
            doc(
              getFirestore(),
              `/movements/${this.movement.id}/snapshots/${snapsToFetch[ii]}/lists/styles`
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

      this.styleOpts = Object.values(styles);
    },
    async fetchSnapTrees() {
      // console.log("fetching the style lists");
      let trees = {};
      let snapsToFetch = [...this.monthOpts]
        .filter((val, ind) => val >= this.fromMonth && val <= this.endMonth)
        .sort();

      let promises = [];
      for (let ii in snapsToFetch) {
        promises.push(
          getDoc(
            doc(
              getFirestore(),
              `/movements/${this.movement.id}/snapshots/${snapsToFetch[ii]}/lists/trees`
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
            trees[jj] = { ...data[jj], id: jj };
          }
        }
      }

      this.treeOpts = Object.values(trees);
    },
    async fetchTrends() {
      if (this.selectedTrees.length <= 0 || this.selectedStyles.length <= 0)
        return;
      for (let ii in this.selectedTrees) {
        for (let jj in this.selectedStyles) {
          this.trends[
            `${this.selectedTrees[ii].id}-${this.selectedStyles[jj].id}`
          ] = await this.fetchTrend({
            styleId: this.selectedStyles[jj].id,
            treeId: this.selectedTrees[ii].id,
          });
        }
      }
      this.$emit("trends-updated", this.trends);
    },
    fetchTrend(payload) {
      if (this.trends[`${payload.treeId}-${payload.styleId}`]) return;
      let trend = { ...payload, data: [] };
      return getDocs(
        query(
          collection(
            getFirestore(),
            `/movements/${this.movement.id}/trend-data`
          ),
          orderBy("snapId", "asc"),
          where("styleId", "==", payload.styleId),
          where("treeId", "==", payload.treeId)
        )
      ).then((querySnap) => {
        querySnap.forEach((doc) => {
          trend.data.push(doc.data());
        });
        return trend;
      });
    },
  },
  watch: {
    endMonth: {
      deep: true,
      handler(newDetails, oldDetails) {
        if (this.fromMonth > "") {
          this.fetchSnapStyles();
          this.fetchSnapTrees();
        }
      },
    },
    fromMonth: {
      deep: true,
      handler(newDetails, oldDetails) {
        if (this.endMonth > "") {
          this.fetchSnapStyles();
          this.fetchSnapTrees();
        }
      },
    },
    selectedTrees: {
      deep: true,
      handler() {
        this.fetchTrends();
      },
    },
    selectedStyles: {
      deep: true,
      handler() {
        this.fetchTrends();
      },
    },
  },
};
</script>
