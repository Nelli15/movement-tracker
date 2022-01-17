<template>
  <q-layout view="hHh LpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// const firebase = require("@firebase/app")
// require('@firebase/auth')
// require("@firebase/firestore")

// import {mapActions} from 'vuex'
// import {mapGetters} from 'vuex'

export default {
  name: "default",
  props: {
    // user: {}
  },
  data() {
    return {
      left: false,
      miniState: true,
    };
  },
  // preFetch ({ store, router }) {
  preFetch({ store, Router, redirect, currentRoute }) {},
  methods: {},
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
.MT__drawer-link {
  line-height: 24px;
  border-radius: 0 24px 24px 0;
  margin-right: 12px;
}
</style>
