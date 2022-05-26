<template>
  <div>
    <EventsToolbox />
    <q-scroll-area
      style="height: calc(100vh - 50px); max-width: 100%"
      class="print-hide"
    >
      <div style="min-height: 90vh">
        <MovBanner />
        <q-tabs
          v-model="tab"
          dense
          narrow-indicator
          :style="`background-color:${backgroundColor}; color:${color};`"
          inline-label
          align="left"
        >
          <q-tab name="calendar" label="Calendar" icon="calendar_today" />
          <q-tab name="list" label="List" icon="list" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="calendar" class="q-px-none">
            <EventsCalendar />
          </q-tab-panel>
          <q-tab-panel name="list" class="q-pa-none">
            <EventsList />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
// import { getAnalytics() } from "./../data/firebase.js";
import { mapGetters } from 'vuex';
import { setCurrentScreen, logEvent, getAnalytics } from 'firebase/analytics';
// import { getFirestore } from "@firebase/firestore";
import { defineAsyncComponent } from 'vue';

export default {
  name: 'eventsPage',
  preFetch({ store, currentRoute }) {
    store.dispatch('events/fetchEvents', {
      movId: currentRoute.params.movId,
      startDate: new Date()
    });
  },
  data() {
    return {
      tab: 'calendar'
    };
  },
  created: function() {
    setCurrentScreen(getAnalytics(), 'Events View');
    if (process.env.DEV)
      logEvent(getAnalytics(), 'Events_View', {
        movement_name: this.movement.name
      });
  },
  computed: {
    ...mapGetters('movement', [
      'backgroundColor',
      'color',
      'roleStats',
      'modStats',
      'totalStats',
      'complexStats',
      'calcStats',
      'roleOpts',
      'modOpts'
    ]),
    ...mapState('movement', ['movement', 'roles', 'mods'])
  },
  components: {
    EventsToolbox: defineAsyncComponent(() =>
      import('./../components/EventsToolbox.vue')
    ),

    // Container: () =>
    //   import("vue-smooth-dnd").then(module => {
    //     return module.Container;
    //   }),
    MovBanner: defineAsyncComponent(() =>
      import('./../components/MovBanner.vue')
    ),
    EventsCalendar: defineAsyncComponent(() =>
      import('./../components/EventsCalendar.vue')
    ),
    EventsList: defineAsyncComponent(() =>
      import('./../components/EventsList.vue')
    )
  }
};
</script>
