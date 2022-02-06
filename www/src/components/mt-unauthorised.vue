<template>
  <div>
    <q-dialog v-model="userNotAuth">
      <q-card>
        <q-card-section>
          <q-icon name="warning" color="warning" size="md" />
          <span class="text-h6 q-ml-sm">Unauthorised Access!</span>
        </q-card-section>

        <q-card-section>
          You do not have permission for this movement. <br />You can request
          access or return to the Dashboard.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn to="/home" icon="home">
            <q-tooltip
              content-class="bg-info"
              anchor="center right"
              self="center left"
            >
              Dashboard
            </q-tooltip>
          </q-btn>
          <q-btn icon="question_answer" @click="sendRequest">
            <q-tooltip
              content-class="bg-info"
              anchor="center right"
              self="center left"
            >
              Request Access
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
import firebase from "@firebase/app";
require("@firebase/firestore");
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
  methods: {
    async sendRequest() {
      var requestRef = firebase
        .firestore()
        .doc(
          `/movements/${this.$route.params.movementId}/requests/${this.user.email}`
        );

      var requestDoc = await requestRef.get();
      if (requestDoc.exists) {
        this.$q.notify({
          color: "negative",
          textColor: "white",
          icon: "error",
          message: "Oops, Request already sent!",
        });
        return false;
      }

      firebase
        .firestore()
        .doc(
          `/movements/${this.$route.params.movementId}/requests/${this.user.email}`
        )
        .set({
          uid: this.user.uid,
          email: this.user.email,
          photoUrl: this.user.photoURL,
          name: this.user.displayName,
        })
        .then(() => {
          this.$q.notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Request Sent",
          });
          return true;
        })
        .catch((err) => {
          console.log("Oops, something went wrong: " + err);
          this.$q.notify({
            color: "negative",
            textColor: "white",
            icon: "error",
            message: "Oops, Something went wrong!",
          });
        });
    },
  },
  computed: {
    ...mapGetters([
      "movement",
      "user",
      "superEditor",
      "owner",
      "editor",
      "viewer",
    ]),
    userNotAuth() {
      return !this.viewer && this.$route.params.movementId === this.movement.id;
    },
  },
  components: {},
};
</script>
