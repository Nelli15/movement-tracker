<template>
  <q-page padding>
    <mt-unauthorised />
  </q-page>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  // name: 'PageName',
  components: {
    "mt-unauthorised": defineAsyncComponent(() =>
      import("./../components/mt-unauthorised.vue")
    ),
  },
};
</script>
