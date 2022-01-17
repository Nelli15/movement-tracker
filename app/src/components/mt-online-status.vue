<template>
  <div data-cy="connection-status">
    <q-icon
      :name="connected ? 'wifi' : 'wifi_off'"
      :color="connected ? '' : 'negative'"
      size="sm"
    >
      <q-tooltip
        class="bg-accent text-grey-10"
        anchor="bottom middle"
        self="top middle"
      >
        Internet Status: {{ connected ? "Connected" : "Disconnected" }}
      </q-tooltip>
    </q-icon>
    <q-page-sticky position="top" v-if="!connected && !hide">
      <q-banner
        style="background-color: rgb(197, 66, 16)"
        inline-actions
        rounded
      >
        <!-- <template v-slot:avatar>
          <q-icon name="signal_wifi_off" color="primary" />
        </template> -->
        You have lost connection to the internet. This app is offline.
        <template v-slot:action>
          <q-btn label="dismiss" flat dense @click="hideBanner()" />
        </template>
        <!-- <template v-slot:action>
          <q-btn flat color="primary" label="Turn on Wifi" />
        </template> -->
      </q-banner>
    </q-page-sticky>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  // name: 'ComponentName',
  data() {
    return {
      connected: navigator.onLine,
      hide: false,
    };
  },
  mounted() {
    window.addEventListener("online", this.updateConnectionStatus);
    window.addEventListener("offline", this.updateConnectionStatus);
  },
  methods: {
    updateConnectionStatus() {
      // console.log("here", navigator.onLine);
      this.hide = false;
      this.connected = navigator.onLine; // this method
    },
    hideBanner() {
      this.hide = true;
    },
  },
};
// function updateConnectionStatus() {
//   console.log("here", navigator.onLine, Vue.vm);
//   Vue.set("connected", navigator.onLine); // this method
// }

// window.addEventListener("online", updateConnectionStatus);
// window.addEventListener("offline", updateConnectionStatus);
</script>
