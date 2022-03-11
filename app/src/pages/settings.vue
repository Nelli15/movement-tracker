<template>
  <div data-cy="settings-page">
    <SettingsToolbox />
    <SettingsContextMenu />
    <q-scroll-area style="height: calc(100vh - 86px); max-width: 100%">
      <MovBanner dense readOnly />
      <MovSettings class="q-ma-sm" />
      <StyleSettings class="q-ma-sm" />
    </q-scroll-area>
  </div>
</template>

<script lang="ts">
import { getAnalytics, setCurrentScreen } from 'firebase/analytics';
import { defineComponent, defineAsyncComponent } from 'vue';
export default defineComponent({
  props: {},
  preFetch({ store, currentRoute }) {
    store.dispatch('movement/fetchTrees', {
      movId: currentRoute.params.movId
    });
    store.dispatch('movement/fetchStyles', {
      movId: currentRoute.params.movId
    });
  },
  setup(props) {
    setCurrentScreen(getAnalytics(), 'Movement_Settings');
  },
  components: {
    MovBanner: defineAsyncComponent(() =>
      import('./../components/MovBanner.vue')
    ),
    MovSettings: defineAsyncComponent(() =>
      import('../components/MovSettings.vue')
    ),
    StyleSettings: defineAsyncComponent(() =>
      import('./../components/StyleSettings.vue')
    ),
    SettingsToolbox: defineAsyncComponent(() =>
      import('./../components/SettingsToolbox.vue')
    ),
    SettingsContextMenu: defineAsyncComponent(() =>
      import('./../components/SettingsContextMenu.vue')
    )
  }
});
</script>
