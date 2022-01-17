<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
declare global {
  interface Window {
    Cypress: any;
  }
}
export default defineComponent({
  name: 'App',
  created() {
    if (window.Cypress) {
      this.$q.dark.set(false);
    }
  },
});
</script>

<style>
.w-100 {
  width: 100%;
}

.text-underline {
  text-decoration: underline;
}
</style>
