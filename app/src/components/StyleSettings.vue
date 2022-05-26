<template>
  <q-card>
    <q-card-section>
      <div class="shadow-2">
        <div class="text-center text-h6 bg-primary text-white">
          Style Settings
        </div>
        <q-tabs
          v-model="tab"
          dense
          indicator-color="mt-orange"
          class="bg-primary text-white"
          align="center"
          narrow-indicator
          style="width: 100%"
        >
          <q-tab
            name="roles"
            label="Roles"
            v-if="permissions.settings_roles_view"
            data-cy="role-tab"
          />
          <q-tab
            name="modifiers"
            label="Modifiers"
            v-if="permissions.settings_mods_view"
            data-cy="mod-tab"
          />
          <q-tab
            name="complex"
            label="Complex"
            v-if="permissions.settings_complex_view"
            data-cy="complex-tab"
          />
          <q-tab
            name="calc"
            label="Calculated"
            v-if="permissions.settings_calc_view"
            data-cy="calc-tab"
          />
        </q-tabs>
      </div>
      <!-- <q-separator /> -->

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="roles" style="padding: 0px" data-cy="role-tab-panel">
          <mt-styles-role-table />
        </q-tab-panel>

        <q-tab-panel
          name="modifiers"
          style="padding: 0px"
          data-cy="mod-tab-panel"
        >
          <mt-styles-mod-table />
        </q-tab-panel>

        <q-tab-panel
          name="complex"
          style="padding: 0px"
          data-cy="complex-tab-panel"
        >
          <mt-styles-complex-table />
        </q-tab-panel>
        <q-tab-panel name="calc" style="padding: 0px" data-cy="calc-tab-panel">
          <mt-styles-calc-table />
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import {
  defineComponent,
  defineAsyncComponent,
  ref,
  computed,
  watch
} from 'vue';
import { useQuasar } from 'quasar';
export default defineComponent({
  props: {},
  setup(props) {
    const q = useQuasar();
    const store = useStore();
    const tab = ref('roles');

    q.localStorage.has('movementEditTab')
      ? q.localStorage.getItem('movementEditTab')
      : 'roles';
    const movement = computed(() => store.state.movement.movement);
    const permissions = computed(() => store.state.movement.permissions);
    watch(tab, () => {
      q.localStorage.set('movementEditTab', tab.value);
    });
    return { q, tab, movement, permissions };
  },
  components: {
    'mt-styles-role-table': defineAsyncComponent(() =>
      import('./mt-styles-role-table.vue')
    ),
    'mt-styles-mod-table': defineAsyncComponent(() =>
      import('./mt-styles-mod-table.vue')
    ),
    'mt-styles-complex-table': defineAsyncComponent(() =>
      import('./mt-styles-complex-table.vue')
    ),
    'mt-styles-calc-table': defineAsyncComponent(() =>
      import('./mt-styles-calc-table.vue')
    )
  }
});
</script>

<style>
.text-mt-orange {
  color: rgb(197, 66, 16) !important;
}
.bg-mt-orange {
  background: rgb(197, 66, 16) !important;
}
</style>
