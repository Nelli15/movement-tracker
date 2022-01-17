<template>
  <div>
    <q-btn
      dense
      :outline="unread !== 0"
      :flat="unread === 0"
      :color="unread !== 0 ? 'negative' : ''"
      class="q-px-sm"
      aria-label="notifications"
    >
      <!--
        <q-list dense style="width: 300px" separator class="q-py-sm">
          <q-item clickable v-close-popup v-if="notifications.length <= 0">
            <q-item-section>
              <q-item-label class="text-center">No Notifications</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-close-popup
            v-for="notification in notifications"
            :key="notification.id"
            @click="onClick($event, notification)"
            :class="notification.read ? '' : 'bg-blue-2'"
          >
            <q-item-section avatar>
              <q-icon
                :name="
                  notification.icon
                    ? notification.icon
                    : 'img:icons/file-tree.svg'
                "
                size="sm"
              />
            </q-item-section>
            <q-item-section class="q-my-sm text-caption">
              {{ notification.body }}
            </q-item-section>
            <q-item-section side top v-if="notification.actions">
              <q-btn
                @click.stop="acceptInvite(notification)"
                :icon="matDone"
                color="positive"
                dense
                :disabled="loading"
                v-if="notification.actions.accept"
                size="sm"
              >
                <q-tooltip class="bg-accent text-grey-10"
                  >Accept</q-tooltip
                >
              </q-btn>
              <q-btn
                @click.stop="deleteInvite(notification)"
                :icon="matDelete"
                color="negative"
                dense
                :disabled="loading"
                class="q-mt-sm"
                v-if="notification.actions.reject"
                size="sm"
              >
                <q-tooltip class="bg-accent text-grey-10"
                  >Reject</q-tooltip
                >
              </q-btn>
              <q-btn
                :icon="matClose"
                dense
                :disabled="loading"
                class="q-mt-md"
                v-if="notification.actions.remove"
                flat
                round
                @click.stop="deleteNotification(notification.id)"
                size="sm"
              >
                <q-tooltip class="bg-accent text-grey-10"
                  >Remove</q-tooltip
                >
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu> -->
    </q-btn>
  </div>
</template>

<script>
// import { $firestore, getAnalytics() } from "./../data/firebase.js";
// import { mapGetters, mapActions } from "vuex";
// import {
//   matClose,
//   matNotifications,
//   matError,
//   matCloudDownload,
//   matNotificationsActive,
//   matDone,
//   matDelete
// } from "@quasar/extras/material-icons";
// import {
//   onSnapshot,
//   collection,
//   doc,
//   updateDoc,
//   deleteDoc,
//   getFirestore
// } from "@firebase/firestore";

export default {
  props: {
    // user: {}
    // movement:{},
  },
  data() {
    return {
      show: false,
      notifications: [],
      loading: false,
      unread: 0,
    };
  },
  created: function () {
    // this.matClose = matClose;
    // this.matCloudDownload = matCloudDownload;
    // this.matError = matError;
    // this.matNotificationsActive = matNotificationsActive;
    // this.matNotifications = matNotifications;
    // this.matDelete = matDelete;
    // this.matDone = matDone;
    // if (this.user.uid) {
    //   onSnapshot(
    //     collection(getFirestore(), `/users/${this.user.uid}/notifications`),
    //     snap => {
    //       // console.log(snap)
    //       this.notifications = [];
    //       this.unread = 0;
    //       if (!snap.empty) {
    //         // console.log(snap.docs, this.notifications)
    //         for (var key in snap.docs) {
    //           const snapData = snap.docs[key].data();
    //           snapData.id = snap.docs[key].id;
    //           // console.log(snapData)
    //           this.unread = snapData.read ? this.unread : this.unread + 1;
    //           this.notifications.push(snapData);
    //         }
    //       }
    //     }
    //   );
    // $firestore.collectionGroup('invites').where('email', '==', this.user.email)
    //   .onSnapshot((snap) => {
    //     // this.notifications = []
    //     if (!snap.empty) {
    //       for (var key in snap.docs) {
    //         this.notifications.push(snap.docs[key].data())
    //       }
    //     }
    //   })
    // }
  },
  watch: {
    // user() {
    //   // console.log('User changed', this.user, 'checking for notifications')
    //   if (this.user.uid) {
    //     onSnapshot(
    //       collection(getFirestore(), `/users/${this.user.uid}/notifications`),
    //       snap => {
    //         this.notifications = [];
    //         if (!snap.empty) {
    //           // console.log('watcher', snap.docs, this.notifications)
    //           for (var key in snap.docs) {
    //             const snapData = snap.docs[key].data();
    //             snapData.id = snap.docs[key].id;
    //             // console.log(snapData)
    //             this.notifications.push(snapData);
    //           }
    //         }
    //       }
    //     );
    // $firestore.collectionGroup('invites').where('email', '==', this.user.email)
    //   .onSnapshot((snap) => {
    //     // this.notifications = []
    //     if (!snap.empty) {
    //       for (var key in snap.docs) {
    //         this.notifications.push(snap.docs[key].data())
    //       }
    //     }
    //   })
    //   }
    // }
  },
  // methods: {
  //   // ...mapActions(["showDrawer"]),
  //   // toggleNotifications () {
  //   //   this.show = !this.show
  //   // },
  //   acceptInvite(invite) {
  //     this.loading = true;
  //     q.loading.show();
  //     // console.log('accept', invite)
  //     // this.invitations.splice(this.invitations.map(function(d) { return d['movId']; }).indexOf(invite.movId), 1);

  //     // this.$toasted.global.toast_success(`We are adding you to the ${invite.movementName} movement, this may take a moment!`)
  //     updateDoc(
  //       doc(
  //         getFirestore(),
  //         `/users/${this.user.uid}/notifications/${invite.id}`
  //       ),
  //       { accepted: true }
  //     )
  //       .then(() => {
  //         q.loading.hide();
  //         this.loading = false;
  //         q.notify({
  //           color: "positive",
  //           textColor: "white",
  //           icon: this.matCloudDownload,
  //           message: "Invite Accepted"
  //         });
  //         this.$router.push({
  //           name: "tree",
  //           params: { movId: invite.movId }
  //         });
  //         return true;
  //       })
  //       .catch(err => {
  //         if (process.env.PROD) logEvent(getAnalytics(), "exception", {
  //           description: err,
  //           fatal: false
  //         });
  //         console.error(new Error("Oops, something went wrong: " + err));
  //         this.loading = false;
  //         q.loading.hide();
  //         q.notify({
  //           color: "negative",
  //           textColor: "white",
  //           icon: this.matError,
  //           message: "Oops, Something went wrong!"
  //         });
  //       });
  //     // $firestore.collection('/users').doc(`${this.user.uid}`).collection('notifications').doc(`${invite.movId}`).delete()
  //   },
  //   deleteInvite(invite) {
  //     // console.log('decline')
  //     q.loading.show();
  //     this.loading = true;
  //     deleteDoc(
  //       collection(getFirestore(), `/movements/${invite.movId}/invites`),
  //       `${invite.email}`
  //     )
  //       .then(() => {
  //         this.loading = false;
  //         q.loading.hide();
  //         q.notify({
  //           color: "positive",
  //           textColor: "white",
  //           icon: this.matCloudDownload,
  //           message: "Invite Deleted"
  //         });
  //         return true;
  //       })
  //       .catch(err => {
  //         if (process.env.PROD) logEvent(getAnalytics(), "exception", {
  //           description: err,
  //           fatal: false
  //         });
  //         console.error(new Error("Oops, something went wrong: " + err));
  //         this.loading = false;
  //         q.loading.hide();
  //         q.notify({
  //           color: "negative",
  //           textColor: "white",
  //           icon: this.matError,
  //           message: "Oops, Something went wrong!"
  //         });
  //       });
  //   },
  //   deleteNotification(id) {
  //     console("delete");
  //     deleteDoc(
  //       doc(getFirestore(), `/users/${this.user.uid}/notifications/${id}`)
  //     )
  //       .then(() => {
  //         return true;
  //       })
  //       .catch(err => {
  //         if (process.env.PROD) logEvent(getAnalytics(), "exception", {
  //           description: err,
  //           fatal: false
  //         });
  //         console.error(new Error("Oops, something went wrong: " + err));
  //         q.notify({
  //           color: "negative",
  //           textColor: "white",
  //           icon: this.matError,
  //           message: "Oops, Something went wrong!"
  //         });
  //       });
  //   },
  //   markRead(id, read) {
  //     if (!read) {
  //       updateDoc(
  //         doc(getFirestore(), `/users/${this.user.uid}/notifications/${id}`),
  //         { read: true }
  //       );
  //     }
  //   },
  //   onClick(event, notification) {
  //     // console.log('onClick')
  //     this.markRead(notification.id, notification.read);
  //     this.$router.push({
  //       name: "tree",
  //       params: { movId: notification.movement.id }
  //     });
  //   }
  // },
  // computed: {
  //   ...mapGetters("auth", ["user"]),
  //   icon() {
  //     if (this.unread !== 0) {
  //       return this.matNotificationsActive;
  //     }
  //     return this.matNotifications;
  //   }
  // },
  //
};
</script>
