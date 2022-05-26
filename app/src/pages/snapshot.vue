<template>
  <div>
    <mt-movement-toolbox
      :treeOpt="visibleTree"
      class="print-hide"
      readOnly
      storeModule="snapshot"
    />
    <mt-filter-sort :tab="tab" storeModule="snapshot" />
    <q-scroll-area style="height: calc(100vh - 50px); max-width: 100%">
      <div
        style="min-height: calc(100vh - 50px)"
        :style="`background: ${q.dark.isActive ? '#263238' : 'white'};`"
        data-cy="background"
      >
        <MovBanner :readOnly="true" :snapshot="snapshot" />
        <div class="print-only text-center">
          {{ tab === 'trees' ? visibleTree.label : '' }}
        </div>
        <q-tabs
          v-model="tab"
          dense
          narrow-indicator
          :style="`background-color:${backgroundColor}; color:${color};`"
          inline-label
          align="left"
          data-cy="member-tabs"
          class="print-hide"
        >
          <q-tab
            name="trees"
            label="Trees"
            :icon="
              color === 'white'
                ? 'img:icons/file-tree-white.svg'
                : 'img:icons/file-tree.svg'
            "
          >
            <q-select
              v-model="visibleTree"
              :options="treeOpts"
              :color="q.dark.isActive ? 'white' : 'black'"
              borderless
              dense
              class="q-ml-sm"
              map-options
              hide-dropdown-icon
              option-value="id"
            >
              <template v-slot:selected>
                <div :style="`color:${color}`">
                  {{ visibleTree ? visibleTree.label : '' }}
                </div>
              </template>
            </q-select>
          </q-tab>
          <q-tab name="list" label="List" icon="list" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="trees" class="q-px-none">
            <MovTrees
              :treeOpt="visibleTree"
              v-if="visibleTree !== null"
              @changeTree="visibleTree = trees[$event]"
              readOnly
              :members="members"
              :roles="roles"
              :mods="mods"
              :tree="treeSorted"
              storeModule="snapshot"
            />
          </q-tab-panel>
          <q-tab-panel name="list" class="q-pa-none">
            <MovMemberList
              readOnly
              :members="members"
              :roles="roles"
              :mods="mods"
            />
          </q-tab-panel>
        </q-tab-panels>

        <!-- End Tab panel -->
        <MovBGContextMenu
          :treeOpt="visibleTree"
          :readOnly="true"
          storeModule="snapshot"
        />
      </div>
    </q-scroll-area>
    <mt-summary-drawer
      :roles="roles"
      :roleStats="roleStats"
      :mods="mods"
      :modStats="modStats"
      :totalStats="totalStats"
      :complexStats="complexStats"
      :calcStats="calcStats"
    />
    <mt-legend-drawer :roleOpts="roleOpts" :modOpts="modOpts" />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { defineAsyncComponent, ref, watch, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
export default {
  name: 'SnapshotPage',
  preFetch({ store, redirect, currentRoute }) {
    store.dispatch('snapshot/fetchSnapshot', {
      movId: currentRoute.params.movId,
      snapId: currentRoute.params.snapId
    });
    store.dispatch('snapshot/fetchTrees', {
      movId: currentRoute.params.movId,
      snapId: currentRoute.params.snapId
    });
    store.dispatch('snapshot/fetchMemberList', {
      movId: currentRoute.params.movId,
      snapId: currentRoute.params.snapId
    });
    store.dispatch('snapshot/fetchStyles', {
      movId: currentRoute.params.movId,
      snapId: currentRoute.params.snapId
    });
  },
  setup() {
    const q = useQuasar();
    const store = useStore();
    const route = useRoute();
    const tab = ref('trees');
    const visibleTree = ref(null);

    const mods = computed(() => store.state.snapshot.mods);
    const roles = computed(() => store.state.snapshot.roles);
    const trees = computed(() => store.state.snapshot.trees);
    const members = computed(() => store.state.snapshot.members);
    const backgroundColor = computed(
      () => store.getters['movement/backgroundColor']
    );
    const color = computed(() => store.getters['movement/color']);
    const roleStats = computed(() => store.getters['snapshot/roleStats']);
    const modStats = computed(() => store.getters['snapshot/modStats']);
    const totalStats = computed(() => store.getters['snapshot/totalStats']);
    const complexStats = computed(() => store.getters['snapshot/complexStats']);
    const calcStats = computed(() => store.getters['snapshot/calcStats']);
    const roleOpts = computed(() => store.getters['snapshot/roleOpts']);
    const modOpts = computed(() => store.getters['snapshot/modOpts']);
    const treeOpts = computed(() => store.getters['snapshot/treeOpts']);
    const treeSorted = computed(() => store.getters['snapshot/treeSorted']);
    store.commit(
      'snapshot/setSortKey',
      q.localStorage.has('sortKey') ? q.localStorage.getItem('sortKey') : 'Name'
    );
    const snapshot = computed(() => store.state.snapshot.snapshot);

    function fetchTreeData(e) {
      return store.dispatch('snapshot/fetchTreeData', e);
    }

    function setCurrentTree(e) {
      return store.commit('snapshot/setCurrentTree', e);
    }
    watch(
      visibleTree,
      (newVal, oldVal) => {
        if (
          (!oldVal && newVal) ||
          (oldVal && newVal && newVal.id !== oldVal.id)
        ) {
          setCurrentTree(visibleTree.value);
          fetchTreeData({
            movId: route.params.movId,
            snapId: route.params.snapId,
            treeId: visibleTree.value.id
          });
        }
      },
      { immediate: true }
    );
    watch(
      treeOpts,
      (newVal, oldVal) => {
        if (
          (visibleTree.value === null && newVal > [] && newVal !== oldVal) ||
          !newVal.find(val => {
            return visibleTree.value.id === val.id;
          })
        ) {
          visibleTree.value = { ...newVal[0] };
        } else if (
          newVal > [] &&
          visibleTree.value.label !==
            newVal.find(val => {
              return visibleTree.value.id === val.id;
            }).label
        ) {
          visibleTree.value = {
            ...newVal.find(val => {
              return visibleTree.value.id === val.id;
            })
          };
        }
      },
      { immediate: true }
    );
    return {
      q,
      setCurrentTree,
      color,
      backgroundColor,
      tab,
      roles,
      roleOpts,
      roleStats,
      mods,
      modOpts,
      modStats,
      complexStats,
      calcStats,
      totalStats,
      visibleTree,
      treeOpts,
      treeSorted,
      trees,
      members,
      snapshot
    };
  },
  components: {
    'mt-summary-drawer': defineAsyncComponent(() =>
      import('./../components/mt-summary-drawer.vue')
    ),
    'mt-legend-drawer': defineAsyncComponent(() =>
      import('./../components/mt-legend-drawer.vue')
    ),
    'mt-movement-toolbox': defineAsyncComponent(() =>
      import('./../components/mt-movement-toolbox.vue')
    ),
    MovBanner: defineAsyncComponent(() =>
      import('./../components/MovBanner.vue')
    ),
    MovBGContextMenu: defineAsyncComponent(() =>
      import('../components/actions/MovBGContextMenu.vue')
    ),
    MovTrees: defineAsyncComponent(() =>
      import('./../components/MovTrees.vue')
    ),
    MovMemberList: defineAsyncComponent(() =>
      import('./../components/MovMemberList.vue')
    ),
    'mt-filter-sort': defineAsyncComponent(() =>
      import('./../components/mt-filter-sort.vue')
    )
  }
};
</script>

<!--<template>
  <div>
    <mt-movement-toolbox :showFilter="showFilter" class="print-hide" readOnly />
    <mt-filter-sort
      ref="filterSort"
      :tree="snapshot.tree"
      @filter-updated="filter = $event"
      @treeSorted="sortedTree = $event"
    />
    <q-scroll-area style="height: calc(100vh - 50px); max-width: 100%">
      <div style="min-height: 90vh">
        <div
          :style="
            'min-height:150px;max-height:315px;background-color:white;position:relative;background-color:' +
              snapshot.backgroundColor +
              ';'
          "
          class="print-hide"
        >
          <div
            class="text-center text-h3 w-100"
            :style="'position:absolute;top:30%;color:' + snapshot.color + ';'"
          >
            {{ movement.name }}
          </div>
          <div
            class="text-center text-h6 w-100"
            :style="'position:absolute;top:60%;color:' + snapshot.color + ';'"
            s
          >
            {{ snapshot.title }}
          </div>
          <transition name="slide-fade">
            <q-btn
              v-if="dateStamp"
              class="q-ma-sm"
              :style="
                q.dark.isActive
                  ? 'background: #121212'
                  : 'background: #cfd8dc;'
              "
              @click="toggleDateStamp"
              aria-label
              >Snapshot Date: {{ formatDate(snapshot.date) }}</q-btn
            >
            <q-btn
              v-else
              class="q-ma-sm"
              :style="
                q.dark.isActive
                  ? 'background: #121212'
                  : 'background: #cfd8dc;'
              "
              @click="toggleDateStamp"
              icon="chevron_right"
              aria-label="Show Datestamp"
            ></q-btn>
          </transition>
        </div>
        <div class="text-center text-h3 w-100 print-only">
          {{ movement.name }}
          <br />
          {{ snapshot.title }}
        </div>
        <div
          :style="
            'background-color:white;position:relative;background-color:' +
              snapshot.backgroundColor +
              ';'
          "
        ></div>
        <div class="row" v-if="showRefresh">
          <q-tree
            v-for="member in sortedTree"
            :key="member.id"
            :nodes="[member]"
            node-key="id"
            label-key="display.label"
            default-expand-all
            :filter="filter"
            :filter-method="treeFilterMethod"
            no-results-label=" "
          >
            <template v-slot:default-header="prop">
              <mt-member-node
                v-if="snapshot.members"
                :member="snapshot.members[prop.node.id]"
                @selected="addToSelected"
                readOnly
              />
              <mt-member-node
                v-else
                :member="prop.node"
                @selected="addToSelected"
                readOnly
              />
            </template>
          </q-tree>
        </div>
        <q-separator />
        <mt-summary-drawer
          v-if="snapshot.roleStats"
          :roles="snapshot.roleStats"
          :roleStats="snapshot.roleStats"
          :mods="snapshot.modStats"
          :modStats="snapshot.modStats"
          :totalStats="snapshot.totals"
          :complexStats="snapshot.complexStats ? snapshot.complexStats : ''"
        />
        <mt-legend-drawer
          v-if="roleOpts"
          :roleOpts="roleOpts"
          :modOpts="modOpts"
        />
        <q-menu context-menu touch-position ref="newMenu">
          <q-list dense style="min-width: 100px">
            <q-item clickable @click="toggleFilterSort" v-close-popup>
              <q-item-section avatar>
                <q-icon name="filter_alt" />
              </q-item-section>
              <q-item-section>Filter</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import { setCurrentScreen, getAnalytics } from "firebase/analytics";
// import {} from "@firebase/firestore";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
// import { LocalStorage } from 'quasar'
// import { mapActions } from 'vuex'

export default {
  props: {
    // user: {}
  },
  data() {
    return {
      movId: "",
      tab: "roleStats",
      showRefresh: true,
      dateStamp: Boolean,
      toolCabinet: true,
      // comments: [],
      membersSelected: [],
      filter: "",
      sortedTree: [],
      sortedNoParents: [],
      showFilter: false
    };
  },
  preFetch({ store, currentRoute }) {
    // console.log(store.state)
    if (!store.state.snapshot.snapshots[currentRoute.params.snapId]) {
      store.dispatch("snapshot/fetchSnapshot", {
        movId: currentRoute.params.movId,
        snapId: currentRoute.params.snapId
      });
    }
  },
  created: function() {
    this.dateStamp = LocalStorage.has("dateStamp")
      ? LocalStorage.getItem("dateStamp")
      : true;
    setCurrentScreen(getAnalytics(), "Movement_Snapshot");
    // $firestore.collection(`movements/${}/comments`).doc()
    // console.log(LocalStorage.has('zoom') ? LocalStorage.getItem('zoom') : 100)
    // var db = $firestore
    // // console.log(this.$route.params.snapshot.id)
    // this.movId = this.$route.params.movId
  },
  methods: {
    ...mapActions(["changeSize", "showDrawer"]),
    ...mapActions("movement", ["fetchSnapshots"]),
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true;

      this.fabPos = [this.fabPos[0] - ev.delta.x, this.fabPos[1] + ev.delta.y];
    },
    toggleViewOptions() {
      this.viewOptions = !this.viewOptions;
    },
    ...mapMutations("movement", ["toggleFilterVisible"]),
    toggleFilterSort() {
      this.toggleFilterVisible();
    },
    toggleDateStamp() {
      this.dateStamp = !this.dateStamp;
      LocalStorage.set("dateStamp", this.dateStamp);
    },
    addToSelected(id) {
      if (this.membersSelected.indexOf(id) === -1) {
        this.membersSelected.push(id);
      }
    },
    treeFilterMethod(node, terms) {
      // const filt = filter.toLowerCase()
      // return node.name && node.name.toLowerCase().indexOf(filt) > -1
      // console.log(this.snapshot)
      // console.log(node, terms, this.members[node.id])
      const lowerTerms = terms > "" ? terms.toLowerCase() : "";
      const name =
        this.members[node.id].name.toLowerCase().indexOf(lowerTerms) !== -1;
      const base = this.snapshot.roleStats[this.members[node.id].role]
        ? this.snapshot.roleStats[this.members[node.id].role].label
            .toLowerCase()
            .indexOf(lowerTerms) !== -1
        : this.members[node.id].role.label
            .toLowerCase()
            .indexOf(lowerTerms) !== -1;
      const override = this.members[node.id].modStats.some(style =>
        this.snapshot.modStats[style]
          ? this.snapshot.modStats[style].label
              .toLowerCase()
              .indexOf(lowerTerms) !== -1
          : style.label.toLowerCase().indexOf(lowerTerms) !== -1
      );
      const parent = this.parents[node.parent]
        ? this.parents[node.parent].label
          ? this.parents[node.parent].label.toLowerCase().indexOf(lowerTerms)
          : this.parents[node.parent].name.toLowerCase().indexOf(lowerTerms) !==
            -1
        : false;
      // const parent = this.snapshot.parents[this.members[node.id].parent] ? this.snapshot.parents[this.members[node.id].parent].label.toLowerCase().indexOf(lowerTerms) !== -1 : false
      // const name = (cellValue(cols[1], row) + '').toLowerCase()// .indexOf(lowerTerms) !== -1
      // const base = this.roleStats[cellValue(cols[2], row) + ''] ? this.roleStats[cellValue(cols[2], row) + ''].label.toLowerCase()// .indexOf(lowerTerms) !== -1
      //   : false
      // const override = this.modStats[cellValue(cols[3], row) + ''] ? this.modStats[cellValue(cols[3], row) + ''].label.toLowerCase()// .indexOf(lowerTerms) !== -1
      //   : false
      // const parent = this.parents[cellValue(cols[4], row) + ''] ? this.parents[cellValue(cols[4], row) + ''].label.toLowerCase()// .indexOf(lowerTerms) !== -1
      //   : false
      // console.log(name, base, override, parent)
      return name || base || override || parent;
    },

    resetFilter() {
      this.filter = "";
      this.$refs.filter.focus();
    },
    formatDate(timeStamp) {
      if (timeStamp) {
        const date = timeStamp.toDate();
        return `${date.getDate()}/${date.getMonth() +
          1}/${date.getFullYear()} ${date.getHours()}:${(
          "00" + date.getMinutes()
        ).slice(-2)}`;
      } else {
        return "";
      }
    }
  },
  computed: {
    ...mapGetters(["size"]),
    ...mapState("movement", ["movement", "snapshots", "members"]),
    roleOpts() {
      if (!this.snapshot.roleStats) {
        return [];
      }
      var tempArray = Object.keys(this.snapshot.roleStats)
        .map(i => this.snapshot.roleStats[i])
        .sort((a, b) => {
          return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
        });
      return tempArray;
    },
    modOpts() {
      if (!this.snapshot.modStats) {
        return [];
      }
      var tempArray = Object.keys(this.snapshot.modStats)
        .map(i => this.snapshot.modStats[i])
        .sort((a, b) => {
          return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
        });
      return tempArray;
    },
    snapshot() {
      return this.snapshots[this.$route.params.snapId]
        ? this.snapshots[this.$route.params.snapId]
        : {};
    }
  },
  watch: {
    // movement () {
    //   if (this.snapshot) {
    //     if (this.$route.params.movId === this.$route.params.movId && Object.keys(this.snapshots).length <= 0) {
    //       // console.log(`/movements/${this.$route.params.movId}/snapshots`)
    //       this.fetchSnapshots(this.$route.params.movId)
    //     }
    //   }
    // }
  },
  components: {
    "mt-member-node":defineAsyncComponent(() => import("./../components/mt-member-node.vue")),
    // 'mt-add-member-menu':defineAsyncComponent(() => import('./../components/mt-add-member-menu.vue'),
    "mt-summary-drawer":defineAsyncComponent(() => import("./../components/mt-summary-drawer.vue")),
    "mt-legend-drawer":defineAsyncComponent(() => import("./../components/mt-legend-drawer.vue")),
    "mt-movement-toolbox":defineAsyncComponent(() => import("./../components/mt-movement-toolbox.vue")),
    "mt-filter-sort":defineAsyncComponent(() => import("./../components/mt-filter-sort.vue"))
    // 'mt-batch':defineAsyncComponent(() => import('./../components/mt-batch.vue')
  }
};
</script>

<style>
.btn-rounded {
  border-radius: 25px !important;
}

.btn-underline {
  text-decoration: underline !important;
}
</style>-->
