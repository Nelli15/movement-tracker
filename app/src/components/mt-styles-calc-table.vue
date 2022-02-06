<template>
  <div>
    <q-table
      :rows="calcOpts"
      :columns="columns"
      :rows-per-page-options="[10, 15, 20, 50, 100]"
      row-key="name"
      v-model:pagination="pagination"
      style="padding: -16px"
      wrap-cells
      class="my-sticky-header-table"
      :style="isFullscreen ? 'height:100vh;' : ''"
      virtual-scroll
      v-model:fullscreen="isFullscreen"
      rows-per-page-label="Calculated Statistics per page:"
    >
      <template v-slot:top="props">
        <div
          class="row"
          :style="'background-color:' + backgroundColor + ';color: ' + color"
          style="
            width: calc(100% + 32px);
            margin-left: -16px;
            margin-right: -16px;
            margin-top: -12px;
            margin-bottom: -12px;
            padding-left: 16px;
            padding-right: 16px;
            padding-top: 12px;
            padding-bottom: 12px;
          "
          data-cy="movement-banner"
        >
          <div class="col-4 q-table__title">{{ movement.name }}</div>

          <q-space />

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
            aria-label="Toggle Fullscreen"
          />
        </div>
      </template>
      <template v-slot:header-cell="props">
        <q-th :props="props">
          {{ props.col.label }}
          <q-icon
            name="help_outline"
            size="xs"
            color="grey-7"
            v-if="props.col.help"
          >
            <q-tooltip
              class="bg-accent text-grey-10"
              anchor="center right"
              self="center left"
            >
              {{ props.col.help }}
            </q-tooltip>
          </q-icon>
        </q-th>
      </template>
      <template v-slot:body="props">
        <q-tr v-if="props.row.loading">
          <q-td key="label" :props="props" style="min-width: 200px">
            <q-skeleton type="QBtn" />
          </q-td>
          <q-td
            key="desc"
            :props="props"
            style="min-width: 300px; max-width: 20vw !important"
          >
            <q-skeleton type="text" />
          </q-td>
          <q-td key="target" :props="props" style="min-width: 100px">
            <q-skeleton type="text" />
          </q-td>
          <q-td key="background" :props="props">
            <q-skeleton type="QBtn" height="36px" width="32px" />
          </q-td>
          <q-td key="color" :props="props">
            <q-skeleton type="QBtn" height="36px" width="32px" />
          </q-td>
          <q-td key="outline" :props="props">
            <q-skeleton type="QBtn" height="36px" width="32px" />
          </q-td>
          <q-td key="underline" :props="props">
            <q-skeleton type="QBtn" height="36px" width="32px" />
          </q-td>
          <q-td key="rounded" :props="props">
            <q-skeleton type="QBtn" height="36px" width="32px" />
          </q-td>
        </q-tr>
        <q-tr
          v-else
          :props="props"
          @click.stop
          @contextmenu.stop
          @touchstart.stop
          @mousedown.stop
          data-cy="calc-item"
        >
          <mt-style-menu :current="props.row" type="calc" allowDelete="true" />
          <td
            key="label"
            :props="props"
            style="min-width: 200px"
            auto-width
            data-cy="label"
          >
            <q-btn
              :disable="!permissions.settings_calc_edit"
              :key="props.row.value"
              style="background-color: white; color: black; width: 100%"
              dense
              no-caps
              >{{ props.row.label }}</q-btn
            >
          </td>
          <q-td key="desc" :props="props" auto-width data-cy="desc">
            <div style="width: 300px; white-space: wrap">
              {{ props.row.desc }}
            </div>
          </q-td>
          <q-td
            key="target"
            :props="props"
            style="min-width: 100px"
            data-cy="target"
          >
            {{ props.row.target }}
          </q-td>
          <!-- <q-td key="current" :props="props" style="min-width: 100px">
            {{ currentVals[props.row.id].total.toFixed(2) }}{{ props.row.unit }}
          </q-td> -->
          <q-td key="condition" :props="props" data-cy="condition">
            <mt-calculated-node
              :path="''"
              :elClass="
                props.row.condition ? props.row.condition.class : 'expression'
              "
              :element="
                props.row.condition
                  ? props.row.condition
                  : JSON.parse(JSON.stringify(defaultCond))
              "
              :styles="styleOptions"
              @add="
                ($event) => {
                  if (permissions.settings_calc_edit) onAdd($event, props.row);
                }
              "
              @change="
                ($event) => {
                  if (permissions.settings_calc_edit)
                    onChange($event, props.row);
                }
              "
              @remove="
                ($event) => {
                  if (permissions.settings_calc_edit)
                    onRemove($event, props.row);
                }
              "
            />
          </q-td>
          <q-td
            key="unit"
            :props="props"
            style="min-width: 100px"
            data-cy="unit"
          >
            {{ props.row.unit }}
            <q-popup-edit :model-value="props.row.unit">
              <q-input
                :model-value="props.row.unit"
                dense
                autofocus
                @update:model-value="updateStyle(props.row.id, 'unit', $event)"
                :color="Dark.isActive ? 'blue-2' : ''"
              />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import { debounce, Notify, LocalStorage, Dark } from 'quasar';
import { updateStyleByKey } from './../scripts/styles.js';
import { defineAsyncComponent } from 'vue';

const columns = [
  {
    name: 'label',
    align: 'center',
    label: 'Label',
    field: 'label',
    sortable: true,
    help: 'The name of this statistic',
  },
  {
    name: 'desc',
    align: 'left',
    label: 'Description',
    field: 'desc',
    sortable: true,
    help: 'A short description of what this statistic is',
  },
  {
    name: 'target',
    align: 'left',
    label: 'Target',
    field: 'target',
    help: 'A goal for the value of this statistic',
  },
  // {
  //   name: "current",
  //   align: "left",
  //   label: "Current Value",
  //   field: "current",
  //   help: "The current value of this statistic (Tree Total | No Parent Total)",
  // },
  {
    name: 'condition',
    label: 'Conditions',
    field: 'condition',
    align: 'left',
    help: 'Define a theoretical member of the Movement to search for',
  },
  {
    name: 'unit',
    label: 'Unit',
    field: 'unit',
    align: 'center',
    help: 'The unit for this statistic',
  },
];
export default {
  // name: 'ComponentName',
  data() {
    return {
      columns,
      isFullscreen: false,
      hidebaseStyles: true,
      pagination: {
        sortBy: 'label',
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
      defaultCond: {
        class: 'expression',
        elements: [
          {
            class: 'condition',
            id: '',
          },
          {
            class: 'condition',
            id: '',
          },
        ],
        operator: 'plus',
      },
    };
  },
  created() {
    this.Dark = Dark;
    this.updateStyle = debounce(this.updateStyle, 2000);
    // this.updateMovement = debounce(this.updateMovement, 2000)
    this.pagination = LocalStorage.has('movementEditPagination')
      ? LocalStorage.getItem('movementEditPagination')
      : {
          sortBy: 'label',
          descending: false,
          page: 1,
          rowsPerPage: 10,
        };
  },
  methods: {
    ...mapMutations('movement', ['setStyleLoading']),
    updateStyle(id, key, val) {
      this.setStyleLoading({ id, val: true });
      return updateStyleByKey(this.$route.params.movId, id, key, val)
        .then(() => {
          this.setStyleLoading({ id, val: true });
          return Notify.create({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_download',
            message: 'Style Updated',
          });
        })
        .catch((err) => {
          this.setStyleLoading({ id, val: false });
          Notify.create({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!',
          });
        });
    },
    onAdd($event, prop) {
      // console.log($event, prop);
      if ($event.el.class === 'expression') {
        if ($event.type === 'condition') {
          $event.el.elements.push({
            class: 'condition',
            id: '',
          });
        } else if ($event.type === 'number') {
          $event.el.elements.push({
            class: 'number',
            value: 0,
          });
        } else if ($event.type === 'expression') {
          $event.el.elements.push({
            class: 'expression',
            elements: [
              {
                class: 'condition',
                id: '',
              },
              {
                class: 'condition',
                id: '',
              },
            ],
            operator: 'plus',
          });
        }
      }
      // console.log(this.$route.params.movId, prop.id, "condition", prop.condition);
      return updateStyleByKey(
        this.$route.params.movId,
        prop.id,
        'condition',
        prop.condition
      );
    },
    onChange($event, prop) {
      if (!prop.condition || !prop.condition.class) {
        prop.condition = { ...this.defaultCond };
      }
      // console.log($event);
      $event.el[$event.key] = $event.val;
      // console.log(this.element, $event.el);
      return updateStyleByKey(
        this.$route.params.movId,
        prop.id,
        'condition',
        prop.condition
      );
    },
    onRemove(path, prop) {
      function resolve(path, obj = self, separator = '.') {
        var properties = Array.isArray(path) ? path : path.split(separator);
        return properties.reduce((prev, curr) => prev && prev[curr], obj);
      }
      // console.log(path);
      // console.log(prop, path);
      const index = path.charAt(path.length - 2);
      const arrayPath = path.substring(0, path.length - 3);

      // console.log(arrayPath, index, resolve(arrayPath, prop.condition));
      const el = resolve(arrayPath, prop.condition);
      el.splice(index, 1);
      if (el.length === 1) {
        const temp = { ...el[0] };
        let shortPath = arrayPath.substring(0, arrayPath.lastIndexOf('.'));
        // console.log(shortPath);
        const shortIndex = shortPath.substring(
          shortPath.lastIndexOf('.') + 1,
          arrayPath.lastIndexOf('.')
        );
        shortPath = shortPath.substring(0, shortPath.lastIndexOf('.'));
        // console.log(shortIndex);
        let parentEl = resolve(shortPath, prop.condition);
        if (Array.isArray(parentEl)) {
          parentEl.splice(shortIndex, 1, temp);
        }
      }
      return updateStyleByKey(
        this.$route.params.movId,
        prop.id,
        'condition',
        prop.condition
      );
    },
    evalCalculated(cond, stats, totalId) {
      if (!(cond && stats)) return 0;
      const values = [];
      let total = totalId ? totalId : 'total';
      if (cond.class === 'expression') {
        for (var el in cond.elements) {
          values.push(this.evalCalculated(cond.elements[el], stats, total));
        }
        if (values <= []) {
          return 0;
        } else if (cond.operator === 'plus') {
          return values.reduce((a, b) => a + b, 0);
        } else if (cond.operator === 'minus') {
          return values.reduce((a, b) => a - b, 0);
        } else if (cond.operator === 'multiply') {
          return values.reduce((a, b) => a * b);
        } else if (cond.operator === 'divide') {
          return values.reduce((a, b) => a / b);
        }
      } else if (cond.class === 'condition') {
        return parseInt(
          stats[cond.id]
            ? stats[cond.id][total]
              ? stats[cond.id][total]
              : stats[cond.id].total
              ? stats[cond.id].total
              : 0
            : 0
        );
      } else if (cond.class === 'number') {
        return parseFloat(cond.value);
      }

      return 0;
    },
  },
  computed: {
    ...mapGetters('movement', [
      'roleOpts',
      'modOpts',
      'complexOpts',
      'calcOpts',
      'backgroundColor',
      'color',
    ]),
    ...mapState('movement', [
      'movement',
      'roles',
      'mods',
      'totalStats',
      'permissions',
      'stats',
    ]),
    styleOptions() {
      // console.log(
      //   this.roleOpts,
      //   this.modOpts,
      //   this.complexOpts,
      //   this.totalStats
      // );
      return this.roleOpts
        .concat(this.modOpts)
        .concat(this.complexOpts)
        .concat({
          label: 'Tree Total',
          id: 'treeTotal',
          desc: 'The number of Members on the tree',
        })
        .sort((a, b) => {
          return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
        });
    },
    // currentVals() {
    //   let stats = {};
    //   for (var ii in this.calcOpts) {
    //     stats[this.calcOpts[ii].id] = {
    //       total: this.evalCalculated(
    //         this.calcOpts[ii].condition,
    //         this.stats,
    //         "total"
    //       ),
    //       noParentTotal: this.evalCalculated(
    //         this.calcOpts[ii].condition,
    //         this.stats,
    //         "noParentTotal"
    //       )
    //     };
    //   }
    //   return stats;
    // }
  },
  watch: {
    pagination() {
      LocalStorage.set('movementEditPagination', this.pagination);
    },
  },
  components: {
    'mt-style-menu': defineAsyncComponent(() =>
      import('./../components/actions/mt-style-menu.vue')
    ),
    'mt-calculated-node': defineAsyncComponent(() =>
      import('./mt-calculated-node.vue')
    ),
  },
};
</script>

<style scoped>
.not-round {
  border: black 3px solid;
  border-radius: 3px;
  padding: 8px 8px;
}

.round {
  border: black 3px solid;
  border-radius: 28px;
  padding: 8px 8px;
}

.round-right {
  border: black 3px solid;
  border-radius: 3px 28px 28px 3px;
  padding: 8px 8px;
}

.round-left {
  border: black 3px solid;
  border-radius: 28px 3px 3px 28px;
  padding: 8px 8px;
}

.round-top {
  border: black 3px solid;
  border-radius: 28px 28px 3px 3px;
  padding: 8px 8px;
}

.round-bottom {
  border: black 3px solid;
  border-radius: 3px 3px 28px 28px;
  padding: 8px 8px;
}

.round-diag {
  border: black 3px solid;
  border-radius: 20px 3px 20px 3px;
  padding: 8px 8px;
}

.round-diag-2 {
  border: black 3px solid;
  border-radius: 3px 20px 3px 20px;
  padding: 8px 8px;
}

.shadow--dark {
  box-shadow: 0 2px 4px -1px rgba(255, 255, 255, 0.2),
    0 4px 5px rgba(255, 255, 255, 0.14), 0 1px 10px rgba(255, 255, 255, 0.12);
  /*0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px rgba(0,0,0,0.14), 0 1px 10px rgba(0,0,0,0.12);*/
}

.shadow-member {
  opacity: 0.7 !important;
}
</style>
