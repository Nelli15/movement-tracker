<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
// const firebase = require("@firebase/app")
// require("@firebase/firestore")

export default {
  name: "App",
  preFetch({ store, router, redirect, Vue }) {
    // store.dispatch('fetchCreds')
    // firebase.auth().onAuthStateChanged((user) => {
    //   store.dispatch('fetchCreds')
    // })
  },
};
</script>

<style lang="stylus">
.w-100
  width 100%
.text-underline
  text-decoration underline
</style>
