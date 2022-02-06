<template>
  <div>
    <q-btn flat icon="people" label="Share" @click="show = !show">
      <q-tooltip content-class="bg-accent text-grey-10">
        Who can see this?
      </q-tooltip>
    </q-btn>
    <q-dialog v-model="show">
      <!-- <div v-if="userRoles.superEditor"> -->
      <q-card class="q-pl-md q-pr-lg" style="min-width: 800px">
        <q-btn
          flat
          dense
          title="Close"
          icon="close"
          @click="show = !show"
          style="position: absolute; top: 10px; right: 10px; z-index: 5"
        />
        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section class="text-h5">
                Sharing settings
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section v-if="superEditor">
          <q-input
            v-model="newInvitation.email"
            placeholder="Email"
            type="email"
          >
            <template v-slot:before>
              <div class="text-subtitle2">Invite People</div>
            </template>
            <template v-slot:append>
              <q-select
                v-if="superEditor && !owner"
                v-model="newInvitation.role"
                placeholder="Role"
                :options="['viewer', 'editor', 'super editor']"
              />
              <q-select
                v-if="owner"
                v-model="newInvitation.role"
                placeholder="Role"
                :options="['viewer', 'editor', 'super editor', 'owner']"
              />
            </template>
            <template v-slot:after>
              <q-btn
                dense
                @click="sendInvite"
                title="Send Invitation"
                icon="send"
                color="positive"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-separator v-if="superEditor" />
        <q-card-section v-if="requests.length > 0">
          <div class="text-subtitle2">Pending Requests for access</div>
        </q-card-section>
        <q-card-section style="max-height: 40vh" class="scroll">
          <q-list separator>
            <q-item
              v-for="member in requests"
              :key="member.id"
              v-if="requests.length > 0"
              class="shadow-1 rounded-borders"
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="member.photoUrl" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                {{ member.name }}
              </q-item-section>
              <q-item-section style="min-width: 250px">
                {{ member.email }}
              </q-item-section>
              <q-item-section>
                {{ member.role }}
                <q-popup-edit
                  :value="member.role"
                  dense
                  v-if="superEditor"
                  style="cursor: pointer"
                >
                  <q-select
                    v-if="superEditor && !owner"
                    :value="member.role"
                    :options="['viewer', 'editor', 'super editor']"
                    dense
                    autofocus
                    counter
                    @input="updateRequest(member, $event)"
                  />
                  <q-select
                    v-if="owner"
                    :value="member.role"
                    :options="['viewer', 'editor', 'super editor', 'owner']"
                    dense
                    autofocus
                    counter
                    @input="updateRequest(member, $event)"
                  />
                </q-popup-edit>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  dense
                  icon="delete"
                  color="negative"
                  @click="deleteRequest(member)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator v-if="requests.length > 0" />
        <q-card-section>
          <div class="text-subtitle2">Who has access</div>
        </q-card-section>
        <q-card-section style="max-height: 40vh" class="scroll">
          <q-list separator>
            <q-item
              v-for="member in shares"
              :key="member.id"
              class="shadow-1 rounded-borders"
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="member.photoUrl" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                {{ member.name }}
              </q-item-section>
              <q-item-section style="min-width: 250px">
                {{ member.email }}
              </q-item-section>
              <q-item-section style="cursor: pointer">
                {{ member.role }}
                <q-popup-edit
                  :value="member.role"
                  dense
                  v-if="
                    superEditor &&
                    member.email !== user.email &&
                    !owner &&
                    member.role === owner
                  "
                >
                  <q-select
                    v-if="superEditor && !owner"
                    :value="member.role"
                    :options="['viewer', 'editor', 'super editor']"
                    dense
                    autofocus
                    counter
                    @input="updateRole(member, $event)"
                  />
                  <q-select
                    v-if="owner"
                    :value="member.role"
                    :options="['viewer', 'editor', 'super editor', 'owner']"
                    dense
                    autofocus
                    counter
                    @input="updateRole(member, $event)"
                  />
                </q-popup-edit>
              </q-item-section>
              <q-item-section side v-if="superEditor">
                <q-btn
                  dense
                  icon="delete"
                  color="negative"
                  @click="deleteRole(member)"
                  :disabled="
                    member.email === user.email && member.role === owner
                  "
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-separator v-if="invites.length > 0 && superEditor" />
        <q-card-section v-if="invites.length > 0 && superEditor">
          <div class="text-subtitle2">Pending Invites</div>
        </q-card-section>
        <q-card-section
          v-if="invites.length > 0 && superEditor"
          style="max-height: 40vh"
          class="scroll"
        >
          <q-list separator>
            <q-item
              v-for="member in invites"
              :key="member.id"
              class="shadow-1 rounded-borders"
            >
              <q-item-section avatar>
                <!-- {{member}} -->
                <!-- {{''}} -->
                <q-avatar>
                  <img
                    :src="
                      'http://tinygraphs.com/spaceinvaders/' +
                      uuid() +
                      '?theme=bythepool&numcolors=4&size=220&fmt=svg'
                    "
                  />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                {{ member.name }}
              </q-item-section>
              <q-item-section style="min-width: 250px">
                {{ member.email }}
              </q-item-section>
              <q-item-section>
                {{ member.role }}
              </q-item-section>
              <q-item-section side v-if="superEditor">
                <q-btn
                  dense
                  icon="delete"
                  color="negative"
                  @click="deleteInvite(member)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// import mt_member_node from './../components/mt-member-node.vue'
// import storage_objects from './../components/storage-objects.js'
import firebase from "@firebase/app";
require("@firebase/firestore");
import { mapGetters } from "vuex";
import { uid } from "quasar";

export default {
  props: {
    // user: {},
    // userRoles: {},
    // movement: {}
  },
  data() {
    return {
      newInvitation: {
        name: "",
        email: "",
        role: "viewer",
        accepted: false,
        sent: false,
        movementName: "",
        movementId: "",
        fromName: "",
        fromEmail: "",
        style: {},
      },
      share: { empty: true },
      pendingShare: { empty: true },
      pendingRequests: { empty: true },
      show: false,
      // usersViewing:{},
    };
  },
  created: function () {
    // uid = uid()
  },
  methods: {
    uuid() {
      return uid();
    },
    sendInvite() {
      if (this.newInvitation.name <= "") {
        this.newInvitation.name = "";
      } else if (this.newInvitation.email <= "") {
        // this.$toasted.global.toast_error('Invitation Failed! Missing email')
        return;
      } else if (this.newInvitation.role <= "") {
        // this.$toasted.global.toast_error('Invitation Failed! Missing role')
        return;
      }
      for (var key in this.share) {
        if (this.newInvitation.email === this.share[key].email) {
          // this.$toasted.global.toast_error(`${this.newInvitation.email} already invited`)
          return;
        }
      }
      for (key in this.pendingShare) {
        if (this.newInvitation.email === this.pendingShare[key].email) {
          // this.$toasted.global.toast_error(`${this.newInvitation.email} already invited`)
          return;
        }
      }
      console.log(this.user);
      this.newInvitation.movementName = this.movement.name;
      this.newInvitation.movementId = this.movement.id;
      this.newInvitation.style.backgroundColor = this.backgroundColor;
      this.newInvitation.accepted = false;
      this.newInvitation.sent = false;
      this.newInvitation.fromName = this.user.displayName;
      this.newInvitation.fromEmail = this.user.email;
      this.newInvitation.timestamp =
        firebase.firestore.FieldValue.serverTimestamp();
      // var date = new Date
      // console.log(date)
      // this.newInvitation.date = new Date()
      console.log(this.newInvitation);
      // console.log(`/movements/${this.movement.id}/invites/${this.newInvitation.email}`)
      firebase
        .firestore()
        .doc(
          `/movements/${this.movement.id}/invites/${this.newInvitation.email}`
        )
        .set(this.newInvitation)
        .then((res) => {
          // this.$toasted.global.toast_success("Invitation Sent")
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateRole(member, role) {
      console.log(role);
      // member.role = role
      // this.$toasted.global.toast_success(`Making ${member.name} a ${member.role}`)
      firebase
        .firestore()
        .doc(`/movements/${this.movement.id}/roles/${member.id}`)
        .update({ role: role })
        .then((res) => {
          console.log("updated");
          // this.$toasted.global.toast_success("Role Updated")
        });
    },
    deleteInvite(invite) {
      // console.log(event)
      firebase
        .firestore()
        .collection(`/movements/${this.movement.id}/invites`)
        .doc(`${invite.email}`)
        .delete();
    },
    deleteRole(role) {
      console.log(role);
      firebase
        .firestore()
        .collection(`/movements/${this.movement.id}/roles`)
        .doc(`${role.id ? role.id : role.uid}`)
        .delete();
    },
    deleteRequest(request) {
      // console.log(event)
      firebase
        .firestore()
        .collection(`/movements/${this.movement.id}/requests`)
        .doc(`${request.email}`)
        .delete();
    },
    toggleShareModal() {
      this.newInvitation = {
        name: "",
        email: "",
        role: "viewer",
        accepted: false,
        sent: false,
        movementName: this.movement.name,
        style: {},
      };
      this.show = !this.show;
    },
    acceptRequest(request) {
      // console.log(request)
      this.$toasted.global.toast_success(
        `We are making ${request.name} a ${request.role} of the ${this.movement.name} movement, this may take a moment!`
      );
      var acceptRequest = firebase.functions().httpsCallable("acceptRequest");
      acceptRequest({
        request: {
          name: request.name,
          email: request.email,
          uid: request.uid,
          photoURL: request.photoURL,
          role: request.role,
        },
        movement: {
          name: this.movement.name,
          id: this.movement.id,
          style: this.movement.style,
        },
      });
      // firebase.firestore().collection(`/movements/${this.movement.id}/roles`).doc(`${request.uid}`).set({
      //     name:request.name,
      //     email:request.email,
      //     photoURL:request.photoURL,
      //     role:request.role})
      // this.deleteRequest(request)
      // firebase.firestore().collection('/users').doc(`${firebase.auth().currentUser.uid}`).collection('notifications').doc(`${invite.movementId}`).delete()
    },
  },
  computed: {
    lastOwner() {
      var owners = 0;
      for (var member in this.share) {
        if (member.role === "owner") {
          owners++;
          if (owners >= 2) {
            return false;
          }
        }
      }
      return true;
    },
    ...mapGetters([
      "movement",
      "user",
      "shares",
      "requests",
      "invites",
      "superEditor",
      "owner",
      "backgroundColor",
    ]),
  },
  components: {},
};
</script>
