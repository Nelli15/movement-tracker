<template>
  <div>
    <q-dialog v-model="show" persistent>
      <q-card>
        <q-card-section>
          <q-icon :name="matWarning" color="warning" size="md" />
          <span class="text-h6 q-ml-sm">Unauthorised Access!</span>
        </q-card-section>

        <q-card-section>
          You do not have permission for this movement.
          <br />You can request access or return to the home.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn to="/home" :icon="matHome">
            <q-tooltip class="bg-info" anchor="center right" self="center left"
              >home</q-tooltip
            >
          </q-btn>
          <q-btn :icon="matQuestionAnswer" @click="sendRequest">
            <q-tooltip class="bg-info" anchor="center right" self="center left"
              >Request Access</q-tooltip
            >
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// import { uid } from 'quasar'
import { mapGetters, mapState } from 'vuex';
// // import { $firestore } from "./../data/firebase.js";
import {
  matWarning,
  matCloudDownload,
  matHome,
  matQuestionAnswer,
  matError,
} from '@quasar/extras/material-icons';

export default {
  props: {},
  data() {
    return {
      // auth: false
      show: false,
    };
  },
  created: function () {
    this.matHome = matHome;
    this.matWarning = matWarning;
    this.matError = matError;
    this.matQuestionAnswer = matQuestionAnswer;
    this.matCloudDownload = matCloudDownload;
  },
  mounted() {
    // after the component instance has been mounted,
    if (this.ready) {
      setTimeout(() => {
        if (this.noAccess) {
          this.show = true;
        }
      }, 2000);
    }
  },
  methods: {
    async sendRequest() {
      var requestRef = doc(
        getFirestore(),
        `/movements/${this.$route.params.movId}/requests/${this.user.email}`
      );

      var requestDoc = await getDoc(requestRef);
      if (requestDoc.exists) {
        q.notify({
          color: 'negative',
          textColor: 'white',
          icon: this.matError,
          message: 'Oops, Request already sent!',
        });
        return false;
      }

      addDoc(
        doc(
          getFirestore(),
          `/movements/${this.$route.params.movId}/requests/${this.user.email}`
        ),
        {
          uid: this.user.uid,
          email: this.user.email,
          photoURL: this.user.photoURL,
          name: this.user.displayName,
        }
      )
        .then(() => {
          q.notify({
            color: 'positive',
            textColor: 'white',
            icon: this.matCloudDownload,
            message: 'Request Sent',
          });
          return true;
        })
        .catch((err) => {
          if (process.env.DEV)
            logEvent(getAnalytics(), 'exception', {
              description: err,
              fatal: false,
            });
          console.error(new Error('Oops, something went wrong: ' + err));
          q.notify({
            color: 'negative',
            textColor: 'white',
            icon: this.matError,
            message: 'Oops, Something went wrong!',
          });
        });
    },
  },
  computed: {
    ...mapGetters(['ready']),
    ...mapState('movement', ['permissions']),
  },
  watch: {
    ready() {
      if (this.ready) {
        setTimeout(() => {
          if (this.noAccess) {
            this.show = true;
          }
        }, 2000);
      }
    },
    noAccess() {
      // console.log('no access', this.noAccess)
      if (this.ready) {
        setTimeout(() => {
          if (this.noAccess) {
            this.show = true;
          }
        }, 2000);
      }
    },
  },
  // watch: {
  //   movements () {
  //     setTimeout(
  //       () => {
  //         // console.log(Object.keys(this.movements).length > 0, !this.movements[this.$route.params.movId])
  //         this.auth = Object.keys(this.movements).length > 0 && !this.movements[this.$route.params.movId]
  //       }, // enable the input
  //       2000 // after 1 second
  //     )
  //   },
  //   movement () {
  //     setTimeout(
  //       () => {
  //         // console.log(Object.keys(this.movements).length > 0, !this.movements[this.$route.params.movId])
  //         this.auth = Object.keys(this.movements).length > 0 && !this.movements[this.$route.params.movId]
  //       }, // enable the input
  //       2000 // after 1 second
  //     )
  //   }
  // },
};
</script>
