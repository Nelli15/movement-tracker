<template>
  <div>
    <q-dialog v-model="auth">
      <q-card>
        <q-card-section>
          <q-icon name="warning" color="warning" size="md" />
          <span class="text-h6 q-ml-sm">Insufficient Permissions!</span>
        </q-card-section>

        <q-card-section>
          You need permission to access this page.
          <br />Please return to the Movement or go to Home.
        </q-card-section>

        <q-card-actions align="right">
          <!-- <q-btn flat label="OK" color="primary" v-close-popup /> -->
          <q-btn to="/home" icon="home">
            <q-tooltip class="bg-info" anchor="center right" self="center left"
              >home</q-tooltip
            >
          </q-btn>
          <q-btn
            :to="{ name: 'members', params: $route.params }"
            icon="img:icons/file-tree.svg"
            v-if="permissions.members_view"
          >
            <q-tooltip class="bg-info" anchor="center right" self="center left"
              >Movement Tree</q-tooltip
            >
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// import { uid } from 'quasar'
import { mapGetters, mapState } from "vuex";

export default {
  props: {},
  data() {
    return {
      auth: false,
    };
  },
  created: function () {},
  mounted() {
    // after the component instance has been mounted,
    this.auth = true;
  },
  methods: {},
  computed: {
    ...mapGetters("movements", ["movements"]),
    ...mapState("movement", ["movement", "loadingState"]),
    userViewerOnly() {
      // console.log(this.viewer, this.superEditor, this.$route.params.movId === this.$route.params.movId)
      // return false
      return (
        this.$route.params.movId === this.$route.params.movId &&
        !this.loadingState
      );
    },
  },
  watch: {
    movements() {
      setTimeout(
        () => {
          // console.log(Object.keys(this.movements).length > 0, this.movements[this.$route.params.movId], this.viewer, !this.superEditor)
          this.auth =
            Object.keys(this.movements).length > 0 &&
            this.movements[this.$route.params.movId];
        }, // enable the input
        1000 // after 1 second
      );
    },
    movement() {
      // console.log()
      setTimeout(
        () => {
          this.auth =
            Object.keys(this.movements).length > 0 &&
            this.movements[this.$route.params.movId];
        }, // enable the input
        1000 // after 1 second
      );
    },
  },
};
</script>
