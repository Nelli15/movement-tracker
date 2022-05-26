<template>
  <q-drawer
    show-if-above
    mini
    :width="200"
    :breakpoint="1"
    bordered
    style="background-color: #c54210; color: white"
    data-cy="toolbox"
  >
    <q-scroll-area style="height: calc(100vh - 60px)">
      <q-list padding>
        <q-item
          clickable
          v-ripple
          @click="optionsDrawer = !optionsDrawer"
          data-cy="graph-options"
        >
          <q-item-section avatar>
            <q-icon name="tune" />
          </q-item-section>

          <q-item-section>Show Options</q-item-section>
          <q-tooltip
            class="bg-accent text-grey-10"
            anchor="center right"
            self="center left"
            >Show Options</q-tooltip
          >
        </q-item>
        <!-- <q-item
          clickable
          v-ripple
          @click="graphsDrawer = !graphsDrawer"
          v-if="false"
          data-cy="saved-graphs"
        >
          <q-item-section avatar>
            <q-icon name="img:icons/mdi-finance-white.svg" />
          </q-item-section>

          <q-item-section>Show Saved Graphs</q-item-section>
          <q-tooltip
            class="bg-accent text-grey-10"
            anchor="center right"
            self="center left"
            >Show Saved Graphs</q-tooltip
          >
        </q-item>
        <q-item clickable v-ripple v-if="false" data-cy="save-graphs">
          <q-item-section avatar>
            <q-icon name="save" />
          </q-item-section>

          <q-item-section>Save Graph</q-item-section>
          <q-tooltip
            class="bg-accent text-grey-10"
            anchor="center right"
            self="center left"
            >Save Graph</q-tooltip
          >
          <q-menu anchor="top right" self="top left">
            <q-list style="max-width: 500px">
              <q-item>
                <q-input
                  label="Save as"
                  v-model="graphDetails.label"
                  style="width: 100%"
                  :color="q.dark.isActive ? 'blue-2' : ''"
                  debounce="2000"
                />
              </q-item>
              <q-item>
                <q-input
                  label="Title"
                  v-model="graphDetails.title"
                  style="width: 100%"
                  :color="q.dark.isActive ? 'blue-2' : ''"
                  debounce="2000"
                />
              </q-item>
              <q-item
                v-if="
                  graphDetails.type === 'Line' || graphDetails.type === 'Bar'
                "
              >
                <q-input
                  label="X Axis Label"
                  v-model="graphDetails.xAxis"
                  :color="q.dark.isActive ? 'blue-2' : ''"
                  style="min-width: 50%"
                  debounce="2000"
                />
                <q-input
                  label="Y Axis Label"
                  v-model="graphDetails.yAxis"
                  :color="q.dark.isActive ? 'blue-2' : ''"
                  style="min-width: 50%"
                  debounce="2000"
                />
              </q-item>
              <q-item>
                <q-select
                  v-model="graphDetails.type"
                  :options="typeOptions"
                  label="Graph Type"
                  options-selected-class="text-positive"
                  style="min-width: 40%"
                  :color="q.dark.isActive ? 'blue-2' : ''"
                >
                </q-select>
                <q-select
                  v-model="graphDetails.lineTension"
                  style="min-width: 30%"
                  :options="[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]"
                  label="Line Tension"
                  options-selected-class="text-positive"
                  v-if="graphDetails.type === 'Line'"
                  :color="q.dark.isActive ? 'blue-2' : ''"
                >
                  <q-tooltip
                    class="bg-accent text-grey-10"
                    anchor="center right"
                    self="center left"
                    >Line Tension</q-tooltip
                  >
                </q-select>
                <q-toggle
                  v-if="
                    graphDetails.type === 'Pie' ||
                    graphDetails.type === 'Doughnut' ||
                    graphDetails.type === 'Polar'
                  "
                  v-model="graphDetails.flip"
                  :color="!q.dark.isActive ? 'primary' : 'secondary'"
                  keep-color
                  icon="flip_camera_android"
                >
                  <q-tooltip>Swap Snapshots and Statistics</q-tooltip>
                </q-toggle>
                <q-select
                  v-model="graphDetails.time"
                  label="Snapshots to Include"
                  stack-label
                  style="min-width: 30%"
                  :color="q.dark.isActive ? 'blue-2' : ''"
                  emit-value
                  map-options
                  :options="[
                    { label: 'Current', value: 'current' },
                    { label: '1 Month', value: 1 },
                    { label: '2 Months', value: 2 },
                    { label: '3 Months', value: 3 },
                    { label: '4 Months', value: 4 },
                    { label: '5 Months', value: 5 },
                    { label: '6 Months', value: 6 },
                    { label: '1 Year', value: 12 },
                    { label: '2 Years', value: 24 },
                    { label: '3 Years', value: 36 },
                    { label: '4 Years', value: 48 },
                    { label: '5 Years', value: 60 },
                  ]"
                />
              </q-item>
              <q-item v-if="graphDetails.type === 'Individual Member'">
                <q-select
                  v-model="graphDetails.member"
                  :options="memberOptionsFiltered"
                  option-value="id"
                  label="Member"
                  style="width: 100%"
                  clearable
                  use-input
                  input-debounce="0"
                  @filter="membersFilterFn"
                  options-cover
                  :color="q.dark.isActive ? 'blue-2' : ''"
                />
              </q-item>
              <q-item>
                <q-select
                  filled
                  v-model="graphDetails.selectedStats"
                  :options="statsOptionsFiltered"
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
                >
                  <template v-slot:selected>
                    <q-scroll-area style="height: 100px; width: 100%">
                      <q-chip
                        removable
                        dense
                        @remove="graphDetails.selectedStats.splice(index, 1)"
                        color="positive"
                        class="q-ma-xs"
                        v-for="(val, index) in selectedStats"
                        :key="index"
                        >{{ val.label }}</q-chip
                      >
                    </q-scroll-area>
                  </template>
                  <template v-slot:append>
                    <q-icon
                      name="cancel"
                      @click.stop="graphDetails.selectedStats = []"
                      class="cursor-pointer"
                      v-if="graphDetails.selectedStats.length > 0"
                    />
                    <q-icon
                      name="select_all"
                      @click.stop="
                        graphDetails.selectedStats = [...statsOptionsFiltered]
                      "
                      class="cursor-pointer"
                      v-if="graphDetails.selectedStats.length <= 0"
                    />
                  </template>
                </q-select>
              </q-item>
              <q-item>
                <q-btn
                  @click="saveGraph"
                  label="Save Graph"
                  icon="save"
                  style="width: 100%"
                  v-close-popup
                />
              </q-item>
            </q-list>
          </q-menu>
        </q-item> -->
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { saveGraph } from './../scripts/trends.js';

export default {
  // name: 'ComponentName',
  props: ['graphDetails', 'typeOptions', 'statsOptions'],
  emits: ['toggleOptionsDrawer', 'toggleGraphsDrawer'],
  data() {
    return {
      optionsDrawer: false,
      graphsDrawer: false,
      statsOptionsFiltered: [],

      memberOptionsFiltered: []
    };
  },
  created() {},
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapState('movement', ['permissions', 'movement', 'snapshots']),
    selectedStats() {
      return [...this.graphDetails.selectedStats].filter(val =>
        this.graphDetails.type === 'Individual Member'
          ? val.id !== 'treeTotal' && val.id !== 'noParentTotal'
          : true
      );
    },
    memberOptions() {
      let members = {};
      for (const key in this.snapshots) {
        const snap = this.snapshots[key];
        members = { ...members, ...snap.members };
      }
      return toArray(members)
        .map(val => {
          return { label: val.name, id: val.id };
        })
        .filter(val => val.id !== 'root')
        .sort((a, b) => {
          return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
        });
    }
  },
  methods: {
    membersFilterFn(val, update) {
      if (val === '') {
        update(() => {
          this.memberOptionsFiltered = this.memberOptions.sort((a, b) => {
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
        this.memberOptionsFiltered = this.memberOptions
          .filter(v => v.label.toLowerCase().indexOf(needle) > -1)
          .sort((a, b) => {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });
      });
    },
    saveGraph() {
      saveGraph(this.$route.params.movId, this.user.uid, this.graphDetails)
        .then(res => {
          return q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_download',
            message: 'Graph Saved'
          });
        })
        .catch(err => {
          q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!'
          });
        });
    },
    statsFilterFn(val, update) {
      if (val === '') {
        update(() => {
          this.statsOptionsFiltered = this.statsOptions.sort((a, b) => {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        this.statsOptionsFiltered.filter(val =>
          this.graphDetails.type === 'Individual Member'
            ? val.id !== 'treeTotal'
            : true
        );
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.statsOptionsFiltered = this.statsOptions
          .filter(v => v.label.toLowerCase().indexOf(needle) > -1)
          .sort((a, b) => {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });
        this.statsOptionsFiltered.filter(val =>
          this.graphDetails.type === 'Individual Member'
            ? val.id !== 'treeTotal'
            : true
        );
      });
    }
  },
  watch: {
    optionsDrawer() {
      this.$emit('toggleOptionsDrawer', this.optionsDrawer);
    },
    graphsDrawer() {
      this.$emit('toggleGraphsDrawer', this.graphsDrawer);
    }
  }
};
function toArray(object) {
  if (!object) {
    return [];
  }
  if (Object.keys(object).length <= 0) {
    return [];
  }
  return Object.keys(object).map(i => object[i]);
}
</script>
