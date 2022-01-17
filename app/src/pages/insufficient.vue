<template>
  <q-page padding>
    <mt-insufficient />
  </q-page>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  // name: 'PageName',
  components: {
    "mt-insufficient": defineAsyncComponent(() =>
      import("./../components/mt-insufficient.vue")
    ),
  },
};
</script>
