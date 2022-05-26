<template>
  <div
    @click.stop
    @contextmenu.stop
    @touchstart.stop
    @mousedown.stop
    data-cy="mov-banner"
  >
    <div
      :style="
        `min-height:${
          dense ? '104px' : '150px'
        };max-height:315px;background-color:white;position:relative;background-color:` +
          backgroundColor +
          ';'
      "
      class="print-hide"
    >
      <!-- Last Updated -->
      <div
        class="text-center text-h3 w-100"
        :style="'position:absolute;top:30%;color:' + color + ';'"
      >
        {{ movement ? movement.name : '' }}
        <div v-if="snapshot" class="text-h5" data-cy="snap-title">
          {{ snapshot.title }}
        </div>
      </div>
      <transition name="slide-fade">
        <q-btn
          v-if="dateStamp"
          class="q-ma-sm"
          :style="
            q.dark.isActive ? 'background: #121212' : 'background: #cfd8dc;'
          "
          @click="toggleDateStamp"
          aria-label
          data-cy="timestamp"
          >Last Updated: {{ lastUpdated }}</q-btn
        >
        <q-btn
          v-else
          class="q-ma-sm"
          :style="
            q.dark.isActive ? 'background: #121212' : 'background: #cfd8dc;'
          "
          @click="toggleDateStamp"
          icon="keyboard_arrow_right"
          aria-label="Show Datestamp"
        ></q-btn>
      </transition>
    </div>
    <div class="text-center text-h3 w-100 print-only">
      {{ movement ? movement.name : '' }}
      <div v-if="snapshot" class="text-h5" data-cy="snap-title">
        {{ snapshot.title }}
      </div>
    </div>
    <div
      :style="
        'background-color:white;position:relative;background-color:' +
          backgroundColor +
          ';'
      "
    ></div>
    <mt-movement-context-menu
      :movementProp="movement"
      v-if="!readOnly"
      :permissions="permissions"
    />
  </div>
</template>

<script>
import { defineAsyncComponent, ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
export default {
  props: {
    readOnly: Boolean,
    snapshot: {},
    dense: Boolean
  },
  setup(props) {
    const q = useQuasar();
    const store = useStore();
    const dateStamp = ref(
      q.localStorage.has('dateStamp')
        ? q.localStorage.getItem('dateStamp')
        : true
    );
    function toggleDateStamp() {
      dateStamp = !dateStamp;
      q.localStorage.set('dateStamp', dateStamp);
    }

    const movement = computed(() => store.state.movement.movement);
    const permissions = computed(() => store.state.movement.permissions);
    const backgroundColor = computed(
      () => store.getters['movement/backgroundColor']
    );
    const color = computed(() => store.getters['movement/color']);
    const lastUpdated = computed(() => store.getters['movement/lastUpdated']);
    return {
      q,
      dateStamp,
      toggleDateStamp,
      lastUpdated,
      permissions,
      movement,
      backgroundColor,
      color
    };
  },
  components: {
    'mt-movement-context-menu': defineAsyncComponent(() =>
      import('./../components/actions/mt-movement-context-menu')
    )
  }
};
</script>
