<template>
  <div>
    <q-btn
      rounded
      dense
      :outline="
        Array.isArray(invitations)
          ? invitations.length > 0
            ? true
            : false
          : false
      "
      :flat="
        Array.isArray(invitations)
          ? invitations.length > 0
            ? false
            : true
          : true
      "
      :icon="icon"
      :color="
        Array.isArray(invitations)
          ? invitations.length > 0
            ? 'negative'
            : ''
          : ''
      "
      class="q-px-sm"
    >
      <q-tooltip content-class="bg-accent text-grey-10">
        View Notifications
      </q-tooltip>
      <q-badge
        rounded
        floating
        color="negative"
        v-if="Array.isArray(invitations) ? invitations.length > 0 : false"
        >{{
          Array.isArray(invitations)
            ? invitations.length > 0
              ? invitations.length
              : ""
            : ""
        }}</q-badge
      >
      <q-menu anchor="bottom left" self="top left">
        <!-- <q-inner-loading :showing="loading">
          <q-spinner size="50px" color="primary" />
        </q-inner-loading> -->
        <q-list dense style="width: 300px" separator class="q-py-sm">
          <q-item clickable v-close-popup v-if="invitations.length <= 0">
            <q-item-section>
              <q-item-label class="text-center">
                No Notifications
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-close-popup
            v-for="member in invitations"
            :key="member.id"
          >
            <q-item-section avatar>
              <q-icon name="mdi-file-tree" />
            </q-item-section>
            <q-item-section class="q-my-sm">
              {{ member.fromName }} invited you to be a {{ member.role }} of the
              {{ member.movementName }} movement!
            </q-item-section>
            <q-item-section side top>
              <q-btn
                @click="acceptInvite(member)"
                icon="done"
                color="positive"
                dense
                :disabled="loading"
              >
                <q-tooltip content-class="bg-accent text-grey-10">
                  Accept
                </q-tooltip>
              </q-btn>
              <q-btn
                @click="deleteInvite(member)"
                icon="delete"
                color="negative"
                dense
                :disabled="loading"
                class="q-mt-sm"
              >
                <q-tooltip content-class="bg-accent text-grey-10">
                  Reject
                </q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import firebase from "@firebase/app";
require("@firebase/firestore");
import { mapGetters } from "vuex";
export default {
  props: {
    // user: {}
    // movement:{},
  },
  data() {
    return {
      show: false,
      invitations: [],
      loading: false,
    };
  },
  created: function () {
    console.log("User", this.user);
    if (this.user.uid) {
      firebase
        .firestore()
        .collection(`/users/${this.user.uid}/notifications`)
        .onSnapshot((snap) => {
          this.invitations = [];
          if (!snap.empty) {
            console.log(snap.docs, this.invitations);
            for (var key in snap.docs) {
              this.invitations.push(snap.docs[key].data());
            }
          }
        });
      // firebase.firestore().collectionGroup('invites').where('email', '==', this.user.email)
      //   .onSnapshot((snap) => {
      //     // this.invitations = []
      //     if (!snap.empty) {
      //       for (var key in snap.docs) {
      //         this.invitations.push(snap.docs[key].data())
      //       }
      //     }
      //   })
    }
  },
  watch: {
    user() {
      console.log("User changed", this.user, "checking for notifications");
      if (this.user.uid) {
        firebase
          .firestore()
          .collection(`/users/${this.user.uid}/notifications`)
          .onSnapshot((snap) => {
            this.invitations = [];
            if (!snap.empty) {
              console.log("watcher", snap.docs, this.invitations);
              for (var key in snap.docs) {
                this.invitations.push(snap.docs[key].data());
              }
            }
          });
        // firebase.firestore().collectionGroup('invites').where('email', '==', this.user.email)
        //   .onSnapshot((snap) => {
        //     // this.invitations = []
        //     if (!snap.empty) {
        //       for (var key in snap.docs) {
        //         this.invitations.push(snap.docs[key].data())
        //       }
        //     }
        //   })
      }
    },
  },
  methods: {
    // toggleNotifications () {
    //   this.show = !this.show
    // },
    acceptInvite(invite) {
      this.loading = true;
      this.$q.loading.show();
      // this.invitations.splice(this.invitations.map(function(d) { return d['movementId']; }).indexOf(invite.movementId), 1);

      // this.$toasted.global.toast_success(`We are adding you to the ${invite.movementName} movement, this may take a moment!`)
      firebase
        .firestore()
        .doc(`/users/${this.user.uid}/notifications/${invite.movementId}`)
        .update({ accepted: true })
        .then(() => {
          this.$q.loading.hide();
          this.loading = false;
          this.$q.notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Invite Accepted",
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
      // firebase.firestore().collection('/users').doc(`${this.user.uid}`).collection('notifications').doc(`${invite.movementId}`).delete()
    },
    deleteInvite(invite) {
      console.log(invite);
      this.$q.loading.show();
      this.loading = true;
      firebase
        .firestore()
        .collection(`/movements/${invite.movementId}/invites`)
        .doc(`${invite.email}`)
        .delete()
        .then(() => {
          this.loading = false;
          this.$q.loading.hide();
          this.$q.notify({
            color: "positive",
            textColor: "white",
            icon: "cloud_download",
            message: "Invite Deleted",
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
    ...mapGetters(["user"]),
    icon() {
      if (Array.isArray(this.invitations)) {
        if (this.invitations.length > 0) {
          return "notifications_active";
        }
      }
      return "notifications";
    },
  },
  components: {},
};
</script>
