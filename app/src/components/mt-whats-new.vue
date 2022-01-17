<template>
  <div ref="dialog">
    <q-dialog v-model="newVersion" ref="dialog">
      <q-card style="width: 100%">
        <!-- {{compareVersions(version ? version :'', user.lastVersion ? user.lastVersion : '', [])}} -->
        <q-card-section class="text-white" style="background-color: #c54210">
          <!-- <q-icon name="warning" color="warning" size="md"/> -->
          <q-item>
            <q-item-section>
              <span class="text-h5 q-ml-sm">What's New!</span>
            </q-item-section>
            <q-item-section side>
              <q-btn icon="close" @click="updateVersion" flat color="white">
                <q-tooltip
                  class="bg-info"
                  anchor="center right"
                  self="center left"
                  >Close</q-tooltip
                >
              </q-btn>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-scroll-area style="width: 100%; height: calc(100vh - 200px)">
          <q-card-section
            v-for="version in dataFiltered"
            :key="version.version"
            class="q-pt-sm"
          >
            <span class="text-subtitle1 q-ml-sm"
              >Version {{ version.version }}</span
            >
            <br />
            <span class="q-ml-md text-caption"
              >Released: {{ version.date.toDate().getDate() }}/{{
                version.date.toDate().getMonth() + 1
              }}/{{ version.date.toDate().getFullYear() }}</span
            >
            <div class="text-subtitle2 q-ml-sm" v-if="version.new">
              <span v-if="version.new.length > 0">New Features</span>
            </div>
            <q-list dense>
              <q-item v-for="(val, index) in version.new" :key="index">
                <q-item-section class="text-caption">{{ val }}</q-item-section>
              </q-item>
            </q-list>
            <div class="text-subtitle2 q-ml-sm" v-if="version.updates">
              <span v-if="version.updates.length > 0">Updates</span>
            </div>
            <q-list dense>
              <q-item v-for="(val, index) in version.updates" :key="index">
                <q-item-section class="text-caption">{{ val }}</q-item-section>
              </q-item>
            </q-list>
            <div class="text-subtitle2 q-ml-sm" v-if="version.fixes">
              <span v-if="version.fixes.length > 0">Bug Fixes</span>
            </div>
            <q-list dense>
              <q-item v-for="(val, index) in version.fixes" :key="index">
                <q-item-section class="text-caption">{{ val }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-scroll-area>
        <q-card-actions align="right">
          <q-btn label="Don't show again" @click="stopWhatsNew">
            <q-tooltip class="bg-info" anchor="center right" self="center left"
              >Close</q-tooltip
            >
          </q-btn>
          <q-btn label="close" @click="updateVersion">
            <q-tooltip class="bg-info" anchor="center right" self="center left"
              >Close</q-tooltip
            >
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// import { uid } from 'quasar'
import { mapGetters, mapMutations, mapActions } from "vuex";
// import { $firestore, getAnalytics() } from "./../data/firebase.js";
// let md5 = require('js-md5')
import packageJson from "../../package.json";

export default {
  props: {
    // user: {},
    // userRoles: {},
    // movement: {}
  },
  data() {
    return {};
  },
  created: function () {
    // console.log(this.version)
    // console.log(this.lastVersion)
    // if (this.lastVersion && this.version) {
    // this.show = this.compareVersions(this.version ? this.version : '', this.lastVersion ? this.lastVersion : '', [])
    // console.log(this.show)
    // }
  },
  mounted() {},
  methods: {
    ...mapMutations("movement", ["setNewVersion"]),
    ...mapActions("auth", ["fetchVersionInfo"]),
    stopWhatsNew() {
      // console.log(this.user.uid, version);
      this.setNewVersion(packageJson.version);
      updateDoc(doc(getFirestore(), `app-users/${this.user.uid}`), {
        hideWhatsNew: true,
        lastVersion: version,
      }).catch((err) => {
        if (process.env.DEV)
          logEvent(getAnalytics(), "exception", {
            description: err,
            fatal: false,
          });
        console.error(new Error("Oops, something went wrong: " + err));
      });
    },
    updateVersion() {
      // console.log(this.user.uid, this.version)
      this.setNewVersion(packageJson.version);
      updateDoc(doc(getFirestore(), `/app-users/${this.user.uid}`), {
        lastVersion: packageJson.version,
      }).catch((err) => {
        if (process.env.DEV)
          logEvent(getAnalytics(), "exception", {
            description: err,
            fatal: false,
          });
        console.error(new Error("Oops, something went wrong: " + err));
      });
    },
  },
  computed: {
    ...mapGetters("auth", ["user", "newVersion", "versionInfo"]),
    dataFiltered() {
      return this.versionInfo;
    },
    // userNotAuth () {
    //   console.log(Object.keys(this.movements).length > 0, !this.movements[this.$route.params.movId])
    //   return Object.keys(this.movements).length > 0 && !this.movements[this.$route.params.movId]
    //   // return !this.viewer && this.$route.params.movId === this.$route.params.movId
    // }
  },
  watch: {
    newVersion: {
      immediate: true,
      handler() {
        if (this.newVersion) {
          // console.log(this.user.lastVersion)
          this.fetchVersionInfo({
            newVersion: packageJson.version,
            lastVersion: this.user.lastVersion,
          });
        }
      },
    },
    //   // console.log(this.newVersion)
    //   this.show = this.newVersion
    // }
    // movements () {
    //   setTimeout(
    //     () => {
    //       // console.log(Object.keys(this.movements).length > 0, !this.movements[this.$route.params.movId])
    //       this.auth = Object.keys(this.movements).length > 0 && !this.movements[this.$route.params.movId]
    //     }, // enable the input
    //     2000 // after 1 second
    //   )
    // },
    // movement () {
    //   setTimeout(
    //     () => {
    //       // console.log(Object.keys(this.movements).length > 0, !this.movements[this.$route.params.movId])
    //       this.auth = Object.keys(this.movements).length > 0 && !this.movements[this.$route.params.movId]
    //     }, // enable the input
    //     2000 // after 1 second
    //   )
    // }
    // version () {
    // console.log(this.version)
    // this.show = this.compareVersions(this.version ? this.version : '', this.lastVersion ? this.lastVersion : '', [])
    // },
    // lastVersion () {
    // console.log(this.lastVersion)
    // if (this.lastVersion) {
    // console.log(this.lastVersion)
    // this.show = this.compareVersions(this.version ? this.version : '', this.lastVersion ? this.lastVersion : '', [])
    // }
    // }
  },
};
</script>
