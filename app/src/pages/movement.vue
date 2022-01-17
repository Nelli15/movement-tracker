<template>
  <div>
    <mt-movement-toolbox class="print-hide" :treeOpt="visibleTree" />
    <mt-filter-sort :tab="tab" :treeOpt="visibleTree" />
    <q-scroll-area style="height: calc(100vh - 50px); max-width: 100%">
      <div style="padding-left: 56px; min-height: 90vh" data-cy="background">
        <MovBanner />
        <q-tabs
          v-model="tab"
          dense
          narrow-indicator
          :style="`background-color:${backgroundColor}; color:${color};`"
          inline-label
          align="left"
          data-cy="member-tabs"
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
                <div class="text-black">
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
              :members="members"
              :roles="roles"
              :mods="mods"
              :tree="treeSorted"
            />
          </q-tab-panel>
          <q-tab-panel name="list" class="q-pa-none">
            <MovMemberList :members="members" :roles="roles" :mods="mods" />
          </q-tab-panel>
        </q-tab-panels>

        <!-- End Tab panel -->
        <MovBGContextMenu :treeOpt="visibleTree" />
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
import { defineAsyncComponent, ref, computed, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  name: 'MovementPage',
  setup() {
    const q = useQuasar();
    const store = useStore();
    const route = useRoute();
    const tab = ref('trees');
    const visibleTree = ref(null);
    const mods = computed(() => store.state.movement.mods);
    const roles = computed(() => store.state.movement.roles);
    const trees = computed(() => store.state.movement.trees);
    const members = computed(() => store.state.movement.members);
    const backgroundColor = computed(
      () => store.getters['movement/backgroundColor']
    );
    const color = computed(() => store.getters['movement/color']);
    const roleStats = computed(() => store.getters['movement/roleStats']);
    const modStats = computed(() => store.getters['movement/modStats']);
    const totalStats = computed(() => store.getters['movement/totalStats']);
    const complexStats = computed(() => store.getters['movement/complexStats']);
    const calcStats = computed(() => store.getters['movement/calcStats']);
    const roleOpts = computed(() => store.getters['movement/roleOpts']);
    const modOpts = computed(() => store.getters['movement/modOpts']);
    const treeOpts = computed(() => store.getters['movement/treeOpts']);
    const treeSorted = computed(() => store.getters['movement/treeSorted']);
    store.commit(
      'movement/setSortKey',
      q.localStorage.has('sortKey') ? q.localStorage.getItem('sortKey') : 'Name'
    );

    function fetchTreeData(e) {
      return store.dispatch('movement/fetchTreeData', e);
    }

    function setCurrentTree(e) {
      return store.commit('movement/setCurrentTree', e);
    }
    watch(
      visibleTree,
      (newVal, oldVal) => {
        console.log(oldVal, newVal, visibleTree.value);
        if (
          (!oldVal && newVal) ||
          (oldVal && newVal && newVal.id !== oldVal.id)
        ) {
          setCurrentTree(visibleTree.value);
          fetchTreeData({
            movId: route.params.movId,
            treeId: visibleTree.value.id,
          });
        }
      },
      { immediate: true }
    );
    watch(
      treeOpts,
      (newVal, oldVal) => {
        // console.log(treeSelect);
        // treeSelect.__updateMenu(true);
        if (
          (visibleTree.value === null && newVal > [] && newVal !== oldVal) ||
          !newVal.find((val) => {
            return visibleTree.value.id === val.id;
          })
        ) {
          visibleTree.value = { ...newVal[0] };
        } else if (
          newVal > [] &&
          visibleTree.value.label !==
            newVal.find((val) => {
              return visibleTree.value.id === val.id;
            }).label
        ) {
          visibleTree.value = {
            ...newVal.find((val) => {
              return visibleTree.value.id === val.id;
            }),
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
    };
  },

  preFetch({ store, currentRoute }) {
    store.dispatch('movement/fetchTrees', {
      movId: currentRoute.params.movId,
    });
    store.dispatch('movement/fetchMemberList', {
      movId: currentRoute.params.movId,
    });
    store.dispatch('movement/fetchStyles', {
      movId: currentRoute.params.movId,
    });
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
    ),
  },
};
</script>
