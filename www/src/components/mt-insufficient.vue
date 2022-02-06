<template>
  <div>
    <q-dialog v-model="userViewerOnly">
      <q-card>
        <q-card-section>
          <q-icon name="warning" color="warning" size="md" />
          <span class="text-h6 q-ml-sm">Insufficient Permissions!</span>
        </q-card-section>

        <q-card-section>
          You need to be a Super Editor or Owner to access this page.
          <br />Please return to the Tree or Dashboard.
        </q-card-section>

        <q-card-actions align="right">
          <!-- <q-btn flat label="OK" color="primary" v-close-popup /> -->
          <q-btn to="/home" icon="home">
            <q-tooltip
              content-class="bg-info"
              anchor="center right"
              self="center left"
            >
              Dashboard
            </q-tooltip>
          </q-btn>
          <q-btn :to="{ name: 'tree' }" icon="mdi-file-tree">
            <q-tooltip
              content-class="bg-info"
              anchor="center right"
              self="center left"
            >
              Movement Tree
            </q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// import { uid } from 'quasar'
import { mapGetters } from "vuex";
// import firebase from "@firebase/app"
// require("@firebase/firestore")
// let md5 = require('js-md5')

export default {
  props: {
    // user: {},
    // userRoles: {},
    // movement: {}
  },
  data() {
    return {};
  },
  created: function () {},
  methods: {},
  computed: {
    ...mapGetters([
      "movement",
      "user",
      "superEditor",
      "owner",
      "editor",
      "viewer",
    ]),
    userViewerOnly() {
      console.log(
        this.viewer,
        this.superEditor,
        this.$route.params.movementId === this.movement.id
      );
      return (
        this.viewer &&
        !this.superEditor &&
        this.$route.params.movementId === this.movement.id
      );
    },
  },
  components: {},
};
</script>
