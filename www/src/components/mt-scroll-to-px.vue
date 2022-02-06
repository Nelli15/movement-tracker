<template>
  <q-btn @click="onClick">{{ label }}</q-btn>
</template>

<script>
// import { uid } from 'quasar'
// import { mapGetters } from 'vuex'
// import firebase from "@firebase/app"
// require("@firebase/firestore")
// let md5 = require('js-md5')

export default {
  props: {
    area: String,
    anchor: String,
    label: String,
  },
  data() {
    return {};
  },
  created: function () {
    console.log(this.label, this.area, this.anchor, this.$parent);
  },
  methods: {
    onClick() {
      console.log(
        this.$parent.$refs,
        this.$parent.$refs[this.area],
        this.$parent.$refs[this.anchor]
      );
      return this.$refs[this.area].setScrollPosition(
        this.$refs[this.anchor].$el.offsetTop
      );
    },
  },
  computed: {},
  components: {},
};
</script>
