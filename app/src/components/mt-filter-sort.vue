<template>
  <q-page-sticky
    position="top-right"
    :offset="fabPos"
    style="z-index: 1000"
    v-if="filterVisible"
    class="print-hide"
  >
    <q-card
      style="width: 300px"
      :disable="draggingFab"
      class="q-pb-sm"
      data-cy="filter-comp"
    >
      <!-- {{membersSelected}} -->
      <q-list bordered dense>
        <q-item style="width: 100%" v-touch-pan.prevent.mouse="moveFab">
          <q-item-section avatar style="cursor: move">
            <q-icon name="drag_handle" />
          </q-item-section>
          <q-item-section></q-item-section>
          <q-item-section side style="cursor: pointer">
            <q-icon name="close" @click="toggleFilterVisible" />
          </q-item-section>
        </q-item>
        <q-item style="width: 100%">
          <q-input
            style="width: 100%"
            :ref="filterRef"
            filled
            v-model="filter"
            label="Filter Members"
            autofocus
            :color="q.dark.isActive ? 'blue-2' : ''"
          >
            <template v-slot:append>
              <q-icon
                v-if="filter !== ''"
                name="clear"
                class="cursor-pointer"
                @click="resetFilter"
              />
            </template>
          </q-input>
        </q-item>
        <q-item v-if="tab !== 'list'">
          <q-item-section>
            <q-select
              filled
              :options="['Name', 'Role']"
              option-value="value"
              v-model="sortKey"
              @update:model-value="q.localStorage.set('sortKey', $event)"
              label="Sort Members"
              :color="q.dark.isActive ? 'blue-2' : ''"
            />
          </q-item-section>
        </q-item>
        <q-item v-if="sortKey === 'Role' && tab !== 'list'">
          <q-list>
            <q-item>Role Order</q-item>
            <draggable
              v-model="roleSortCriteria"
              class="list-group cursor-pointer"
              group="roles"
              ghost-class="ghost"
              @start="dragging = true"
              @end="dragging = false"
              item-key="id"
            >
              <template #item="{ element }">
                <q-item dense>
                  <q-item-section avatar>
                    <q-icon name="swap_vert" />
                  </q-item-section>
                  <q-item-section>{{ element.label }}</q-item-section>
                </q-item>
              </template>
            </draggable>
          </q-list>
        </q-item>
      </q-list>
    </q-card>
  </q-page-sticky>
</template>

<script>
import { getFirestore, updateDoc, doc } from '@firebase/firestore';
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import draggable from 'vuedraggable';
export default {
  props: ['tab', 'storeModule'],
  emits: ['filter-updated'],
  setup(props, { emit }) {
    const q = useQuasar();
    const store = useStore();
    const route = useRoute();
    const storeModule = ref(props.storeModule ? props.storeModule : 'movement');
    const filter = ref('');
    const filterRef = ref(null);
    const fabPos = ref([18, 18]);
    const draggingFab = ref(false);
    const sortKey = ref('Name');
    const dragging = ref(false);
    sortKey.value = q.localStorage.has('sortKey')
      ? q.localStorage.getItem('sortKey')
      : 'Name';

    function toggleFilterVisible(e) {
      store.commit(`${storeModule.value}/toggleFilterVisible`, e);
    }
    function setFilterQuery(e) {
      store.commit(`${storeModule.value}/setFilterQuery`, e);
    }
    function setSortKey(e) {
      q.localStorage.set('sortKey', e);
      store.commit(`${storeModule.value}/setSortKey`, e);
    }
    // function filterUpdated() {
    //   // console.log(filter);
    //   emit("filter-updated", filter);
    //   setFilterQuery(filter);
    // }
    // function onDrop(location, result) {
    //   if (!permissions.members_edit) {
    //     return false;
    //   }
    //   if (result.addedIndex !== null && result.payload.memberId !== location) {
    //     loading.show();
    //   }
    // }
    function moveFab(ev) {
      draggingFab.value = ev.isFirst !== true && ev.isFinal !== true;

      fabPos.value = [
        fabPos.value[0] - ev.delta.x,
        fabPos.value[1] + ev.delta.y,
      ];
    }
    function resetFilter() {
      filter.value = '';
      filterRef.focus();
    }

    const user = computed(() => store.state.auth.user);
    const filterVisible = computed(
      () => store.state[storeModule.value].filterVisible
    );

    const roleSortCriteria = computed({
      get() {
        return store.state[storeModule.value].roleSortCriteria;
      },
      set(value) {
        store.commit(`${storeModule.value}/setRoleSortCriteria`, value);
        updateDoc(
          doc(
            getFirestore(),
            `/movements/${route.params.movId}/users/${user.value.uid}`
          ),
          { roleSortCriteria: value }
        );
      },
    });
    watch(filter, () => {
      emit('filter-updated', filter.value);
      setFilterQuery(filter.value);
    });
    watch(sortKey, () => {
      setSortKey(sortKey.value);
    });
    return {
      filterVisible,
      filterRef,
      fabPos,
      draggingFab,
      dragging,
      moveFab,
      sortKey,
      toggleFilterVisible,
      filter,
      q,
      resetFilter,
      roleSortCriteria,
      props,
    };
  },
  components: {
    draggable,
  },
};
</script>

<style>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
