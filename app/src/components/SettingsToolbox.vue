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
    <!-- <q-scroll-area> -->
    <q-list padding>
      <q-item
        clickable
        @click="l_addStyle('role')"
        v-close-popup
        v-if="permissions.settings_roles_create"
        data-cy="create-role"
      >
        <q-item-section avatar>
          <q-icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M21.47,4.35L20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.77 21.47,4.35M1.97,8.05L6.93,20C7.24,20.77 7.97,21.24 8.74,21.26C9,21.26 9.27,21.21 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.26C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05M18.12,4.25A2,2 0 0,0 16.12,2.25H14.67L18.12,10.59"
              />
            </svg>
          </q-icon>
        </q-item-section>
        <q-item-section>Add Role</q-item-section>
        <q-tooltip
          class="bg-accent text-grey-10"
          anchor="center right"
          self="center left"
          >Add Role</q-tooltip
        >
      </q-item>
      <q-item
        clickable
        v-if="permissions.settings_mods_create"
        data-cy="create-mod"
      >
        <q-item-section avatar @click="l_addStyle('mod')" v-close-popup>
          <q-icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05L6.93,20C7.24,20.77 7.97,21.23 8.74,21.25C9,21.25 9.27,21.22 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.25C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25M14.67,2.25L18.12,10.6V4.25A2,2 0 0,0 16.12,2.25M20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.78 21.47,4.36M11.19,4.22L16.17,16.24L8.78,19.3L3.8,7.29"
              />
            </svg>
          </q-icon>
        </q-item-section>
        <q-item-section>Add Modifier</q-item-section>
        <q-tooltip
          class="bg-accent text-grey-10"
          anchor="center right"
          self="center left"
          >Add Modifier</q-tooltip
        >
      </q-item>
      <q-item
        clickable
        v-if="permissions.settings_complex_create"
        data-cy="create-complex"
      >
        <q-item-section avatar @click="l_addStyle('complex')" v-close-popup>
          <q-icon name="insights" />
        </q-item-section>
        <q-item-section>Add Complex</q-item-section>
        <q-tooltip
          class="bg-accent text-grey-10"
          anchor="center right"
          self="center left"
          >Add Complex Statistic</q-tooltip
        >
      </q-item>
      <q-item
        clickable
        v-if="permissions.settings_calc_create"
        data-cy="create-calc"
      >
        <q-item-section avatar @click="l_addStyle('calc')" v-close-popup>
          <q-icon name="functions" />
        </q-item-section>
        <q-item-section>Add Calculated</q-item-section>
        <q-tooltip
          class="bg-accent text-grey-10"
          anchor="center right"
          self="center left"
          >Add Calculated Statistic</q-tooltip
        >
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import { getAnalytics, setCurrentScreen } from 'firebase/analytics';
import { useStore } from 'vuex';
import { addStyle } from '../scripts/styles.js';
import { defineComponent, defineAsyncComponent, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
export default defineComponent({
  props: {},
  setup(props) {
    const q = useQuasar();
    const store = useStore();
    const route = useRoute();
    const movement = computed(() => store.state.movement.movement);
    const permissions = computed(() => store.state.movement.permissions);
    function l_addStyle(type: string) {
      // console.log(type);
      addStyle(route.params.movId, type)
        .then(() => {
          q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_download',
            message: 'Style Added'
          });
          return true;
        })
        .catch(err => {
          q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'error',
            message: 'Oops, Something went wrong!'
          });
        });
    }
    return { q, movement, permissions, l_addStyle };
  },
  components: {}
});
</script>
