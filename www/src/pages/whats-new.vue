<template>
  <q-page>
    <q-parallax style="background-color: black; min-height: calc(100vh - 64px)">
      <template v-slot:media>
        <img
          class="orientation-landscape"
          :src="home_image_url"
          :srcset="home_image_srcset"
          sizes="(max-width: 400px) 400w,
            (min-width: 400px) and (max-width: 1050px) 1050w,
            (min-width: 1050px) and (max-width: 1300px) 1300w,
            (min-width: 1300px) and (max-width: 1400px) 1400w,
            (min-width: 1400px) and (max-width: 2000px) 2000w,
            (min-width: 2000px) 4000w"
          style="
            opacity: 0.5;
            filter: alpha(opacity=50);
            min-height: 101%;
            top: -50%;
          "
        />
        <img
          class="orientation-portrait"
          :src="home_image_url_portrait"
          :srcset="home_image_srcset_portrait"
          sizes="(max-width: 400px) 400w,
            (min-width: 400px) and (max-width: 1050px) 1050w,
            (min-width: 1050px) and (max-width: 1300px) 1300w,
            (min-width: 1300px) and (max-width: 1400px) 1400w,
            (min-width: 1400px) and (max-width: 2000px) 2000w,
            (min-width: 2000px) 4000w"
          style="opacity: 0.5; filter: alpha(opacity=50); left: 0"
        />
      </template>

      <template v-slot:content="scope" style="background-color: black">
        <q-scroll-area style="width: 100%; height: calc(100vh - 64px)">
          <div
            class="absolute column q-ma-lg"
            :style="{
              top: scope.percentScrolled * 25 + '%',
              left: 0,
              right: 0
            }"
          >
            <div class="text-h3 text-white q-mx-lg">What's New</div>
            <div class="text-h6 text-grey-3 q-ma-lg" style="width: 400px">
              The Movement Tracker app is regularly being updated with new
              features. See below for all our most recent feature updates.
            </div>
            <!--           <div class="text-subtitle2 text-grey-3 q-mx-lg q-my-md" style="width:400px">
              The Movement Tracker App has been specifically designed to aid you in keeping track of members in a spiritual movement.
            </div>
            <div class="text-subtitle2 text-grey-3 q-mx-lg q-mb-md" style="width:400px">
              Enhance your ministry by making sure that no one slips through the cracks by creating customizable tree like diagrams of who is Discipleing who.
            </div> -->
            <div>
              <a
                href="https://pwa.movementtracker.app/home"
                style="text-decoration: inherit"
              >
                <q-btn
                  label="Get Started"
                  color="positive"
                  style="width: 310px"
                  class="q-mx-lg"
                  icon="launch"
                />
              </a>
            </div>
            <!-- <q-card style="width:100%" class="q-mt-lg"> -->
            <!-- {{compareVersions(version ? version :'', user.lastVersion ? user.lastVersion : '', [])}} -->
            <q-card class="bg-secondary q-mt-lg" style="max-width: 950px">
              <q-card-section
                v-for="version in dataFiltered"
                :key="version.version"
                class="q-pt-sm text-white"
              >
                <span class="text-subtitle1 q-ml-sm text-bold"
                  >Version {{ version.version }}</span
                ><br />
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
                    <q-item-section class="text-caption">
                      {{ val }}
                    </q-item-section>
                  </q-item>
                </q-list>
                <div class="text-subtitle2 q-ml-sm" v-if="version.updates">
                  <span v-if="version.updates.length > 0">Updates</span>
                </div>
                <q-list dense>
                  <q-item v-for="(val, index) in version.updates" :key="index">
                    <q-item-section class="text-caption">
                      {{ val }}
                    </q-item-section>
                  </q-item>
                </q-list>
                <div class="text-subtitle2 q-ml-sm" v-if="version.fixes">
                  <span v-if="version.fixes.length > 0">Bug Fixes</span>
                </div>
                <q-list dense>
                  <q-item v-for="(val, index) in version.fixes" :key="index">
                    <q-item-section class="text-caption">
                      {{ val }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
              <q-card-section>
                <q-card-actions align="center">
                  <q-btn
                    label="See More"
                    class="text-white"
                    @click="showMore()"
                  />
                </q-card-actions>
              </q-card-section>
            </q-card>
            <!-- </q-scroll-area> -->
            <!-- </q-card> -->
          </div>
        </q-scroll-area>
      </template>
    </q-parallax>
    <!-- Movement tree tracking software to record the -->
  </q-page>
</template>

<script>
// import { debounce } from 'quasar'
// import { mapGetters } from 'vuex'
import firebase from "@firebase/app";
// require('@firebase/functions')
require("firebase/remote-config");
require("@firebase/firestore");

export default {
  props: {
    // user: {}
  },
  data() {
    return {
      // createMovementLoading: false
      // createLoading: false
      data: [],
      next: {}
    };
  },
  preFetch({ store }) {
    // store.dispatch('fetchPages', 'home')
  },
  created() {
    // this.createMovement = debounce(this.createMovement, 2000)
    // store.dispatch('fetchMovements', { uid: this.user.uid })
    let homeObject = firebase.remoteConfig().getValue("home_image_url")._value;
    let homeObjectPortrait = firebase
      .remoteConfig()
      .getValue("home_image_url_portrait")._value;
    if (homeObject) {
      homeObject = JSON.parse(homeObject);
      // console.log(homeObject)
      this.home_image_url = homeObject["400"];
      this.home_image_srcset = `${homeObject["400"]} 400w,
            ${homeObject["1050"]} 1050w,
            ${homeObject["1300"]} 1300w,
            ${homeObject["1400"]} 1400w,
            ${homeObject["2000"]} 2000w,
            ${homeObject["4000"]} 4000w`;
    }
    if (homeObjectPortrait) {
      homeObjectPortrait = JSON.parse(homeObjectPortrait);
      // console.log(homeObjectPortrait)
      this.home_image_url_portrait = homeObjectPortrait["400"];
      this.home_image_srcset_portrait = `${homeObjectPortrait["400"]} 400w,
            ${homeObjectPortrait["1050"]} 1050w,
            ${homeObjectPortrait["1300"]} 1300w,
            ${homeObjectPortrait["1400"]} 1400w,
            ${homeObjectPortrait["2000"]} 2000w,
            ${homeObjectPortrait["4000"]} 4000w`;
    }
    firebase
      .firestore()
      .collection("/version-info")
      .orderBy("date", "desc")
      .where("published", "==", true)
      .limit(2)
      .get()
      .then(snap => {
        // console.log(snap)
        this.data = [];
        snap.forEach(doc => {
          this.data.push(doc.data());
        });
        this.next = firebase
          .firestore()
          .collection("/version-info")
          .orderBy("date", "desc")
          .where("published", "==", true)
          .startAfter(snap.docs[snap.docs.length - 1])
          .limit(2);
        return true;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    // createMovement () {
    //   movementJS.create(this)
    // }
    showMore() {
      this.next
        .get()
        .then(snap => {
          // console.log(snap)
          snap.forEach(doc => {
            this.data.push(doc.data());
          });
          this.next = firebase
            .firestore()
            .collection("/version-info")
            .orderBy("date", "desc")
            .where("published", "==", true)
            .startAfter(snap.docs[snap.docs.length - 1])
            .limit(2);
          return true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    dataFiltered() {
      return this.data;
    }
    // ...mapGetters([
    // 'movements'
    // ])
    // movementsExist () {
    //   return this.movements.length > 0
    // },
    // user () {
    //   return this.$store.state.auth.user
    // },
    // movements () {
    //   return this.$store.state.movements.movements
    // }
  },
  components: {
    // 'mt-movement-card': () => import('./../components/mt-movement-card.vue')
  }
};
</script>
