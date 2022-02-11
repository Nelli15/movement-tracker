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
        align="justify"
        narrow-indicator
        :active-color="q.dark.isActive ? 'blue-2' : 'primary'"
        :indicator-color="q.dark.isActive ? 'blue-2' : 'primary'"
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
                v-model="l_options.chartType"
                :options="typeOpts"
                label="Graph Type"
                options-selected-class="text-positive"
                style="width: 100%"
                :color="q.dark.isActive ? 'blue-2' : ''"
              />
            </q-item>
            Dates
            <q-item>
              <!-- <q-input
                outlined
                v-model="options.startDate"
                label="Start Month"
                style="width: 50%"
                :color="q.dark.isActive ? 'blue-2' : ''"
                debounce="1000"
                options-dense
              >
              </q-input> -->
              <q-input v-model="startDate">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="startDate" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <!-- </div> -->
              <!-- <div class="q-pa-md" style="max-width: 300px"> -->
              <!-- <q-input
                outlined
                v-model="options.endDate"
                label="End Month"
                style="width: 50%"
                :color="q.dark.isActive ? 'blue-2' : ''"
                debounce="1000"
                options-dense
              >
              </q-input> -->
              <q-input v-model="endDate">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="endDate" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <!-- </div> -->
            </q-item>
            <q-item>
              <q-select
                :disable="!(l_options.startDate > '' && l_options.endDate > '')"
                outlined
                v-model="l_options.trees"
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
                      @remove="l_options.trees.splice(index, 1)"
                      color="positive"
                      class="q-ma-xs"
                      v-for="(val, index) in l_options.trees"
                      :key="index"
                      >{{ val.label }}
                    </q-chip>
                  </q-scroll-area>
                </template>
                <template v-slot:append>
                  <q-icon
                    name="cancel"
                    @click.stop="l_options.trees = []"
                    class="cursor-pointer"
                    v-if="l_options.trees && l_options.trees.length > 0"
                    style="font-size: 0.75em"
                  />
                  <q-icon
                    name="select_all"
                    @click.stop="l_options.trees = [...treeOptsFiltered]"
                    class="cursor-pointer"
                    v-if="l_options.trees && l_options.trees.length <= 0"
                  />
                </template>
              </q-select>
            </q-item>

            <q-item>
              <q-select
                :disable="!(l_options.startDate > '' && l_options.endDate > '')"
                outlined
                v-model="l_options.stats"
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
                      @remove="l_options.stats.splice(index, 1)"
                      color="positive"
                      class="q-ma-xs"
                      v-for="(val, index) in l_options.stats"
                      :key="index"
                      >{{ val.label }}
                    </q-chip>
                  </q-scroll-area>
                </template>
                <template v-slot:append>
                  <q-icon
                    name="cancel"
                    @click.stop="l_options.stats = []"
                    class="cursor-pointer"
                    v-if="l_options.stats && l_options.stats.length > 0"
                    style="font-size: 0.75em"
                  />
                  <q-icon
                    name="select_all"
                    @click.stop="l_options.stats = [...statsOptsFiltered]"
                    class="cursor-pointer"
                    v-if="l_options.stats && l_options.stats.length <= 0"
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
                    v-model="l_options.title"
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
                    v-model="l_options.axis"
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
                    v-model="l_options.xAxis"
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
                    v-model="l_options.yAxis"
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
              v-model="l_options.lineTension"
              :options="[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]"
              label="Line Tension"
              options-selected-class="text-positive"
              v-if="l_options.chartType === 'Line'"
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
import { useStore } from 'vuex';
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
  // name: 'ComponentName',

  props: ['show', 'options'],
  emits: ['close', 'update'],
  setup(props, { emit }) {
    const q = useQuasar();
    const store = useStore();
    const route = useRoute();
    let d = new Date();
    const endDate = ref(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate() + 1
      ).padStart(2, '0')}`
    );
    d.setFullYear(d.getFullYear() - 1);
    const startDate = ref(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate() + 1
      ).padStart(2, '0')}`
    );

    const lineTension = ref(0.3);
    const typeOpts = ref(['Line', 'Bar', 'Pie', 'Polar']);
    const l_options = ref({});
    const statsOptsFiltered = ref([]);
    const treeOptsFiltered = ref([]);
    const tab = ref('data');

    const movement = computed(() => store.state.movement.movement);
    const treeOpts = computed(() => toArray(store.state.movement.trees));
    const statsOpts = computed(() => toArray(store.state.movement.stats));
    const monthOpts = computed(() => {
      let initialDate = new Date(2018, 0, 1, 0, 0, 0, 0);
      let now = new Date();
      return dateRange(
        '2018-01-01',
        `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
      )
        .sort()
        .reverse();
      function dateRange(startDate, endDate) {
        var start = startDate.split('-');
        var end = endDate.split('-');
        var startYear = parseInt(start[0]);
        var endYear = parseInt(end[0]);
        var dates = [];

        for (var i = startYear; i <= endYear; i++) {
          var endDate = i != endYear ? 11 : parseInt(end[1]) - 1;
          var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
          for (
            var j = startMon;
            j <= endDate;
            j = j > 12 ? j % 12 || 11 : j + 1
          ) {
            var month = j + 1;
            var displayMonth = month < 10 ? '0' + month : month;
            dates.push([i, displayMonth].join('-'));
          }
        }
        return dates;
      }
    });
    const endDateOpts = computed(() => {
      return monthOpts;
    });

    function statsFilterFn(val, update) {
      if (val === '') {
        update(() => {
          statsOptsFiltered.value = statsOpts.value.sort((a, b) => {
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
        statsOptsFiltered.value = statsOpts.value
          .filter((v) => v.label.toLowerCase().indexOf(needle) > -1)
          .sort((a, b) => {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });
      });
    }
    function treesFilterFn(val, update) {
      if (val === '') {
        update(() => {
          treeOptsFiltered.value = treeOpts.value.sort((a, b) => {
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
        treeOptsFiltered.value = treeOpts.value
          .filter((v) => v.label.toLowerCase().indexOf(needle) > -1)
          .sort((a, b) => {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });
      });
    }
    watch(
      props.options,
      (newVal, oldVal) => {
        if (newVal !== oldVal) l_options.value = props.options;
      },
      { deep: true, immediate: true }
    );
    watch(
      l_options,
      (newVal, oldVal) => {
        if (props.options !== l_options.value) emit('update', l_options.value);
      },
      { deep: true }
    );
    watch(startDate, () => {
      l_options.value.startDate = new Date(startDate.value).getTime();
    });
    watch(endDate, () => {
      l_options.value.endDate = new Date(endDate.value).getTime();
    });

    return {
      q,
      tab,
      typeOpts,
      l_options,
      monthOpts,
      statsOpts,
      statsOptsFiltered,
      statsFilterFn,
      treeOpts,
      treeOptsFiltered,
      treesFilterFn,
      endDateOpts,
      startDate,
      endDate,
    };
  },
};
</script>
