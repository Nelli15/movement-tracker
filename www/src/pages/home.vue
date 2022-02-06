<template>
  <q-page>
    <q-parallax style="background-color: black; min-height: calc(100vh - 64px)">
      <template v-slot:media>
        <!--         <img
          class="orientation-landscape"
          src="statics/home-background.jpg"
          srcset="statics/home-background-400.jpg 400w,
            statics/home-background-1050.jpg 1050w,
            statics/home-background-1300.jpg 1300w,
            statics/home-background-1400.jpg 1400w,
            statics/home-background-2000.jpg 2000w,
            statics/home-background-4000.jpg 4000w"
          sizes="(max-width: 400px) 400w,
            (min-width: 400px) and (max-width: 1050px) 1050w,
            (min-width: 1050px) and (max-width: 1300px) 1300w,
            (min-width: 1300px) and (max-width: 1400px) 1400w,
            (min-width: 1400px) and (max-width: 2000px) 2000w,
            (min-width: 2000px) 4000w"
          style="opacity: 0.5;filter: alpha(opacity=50); min-height: 101%; top: -15%;"
        > -->
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
        <div
          class="absolute column q-ma-lg"
          :style="{
            top: scope.percentScrolled * 25 + '%',
            left: 0,
            right: 0
          }"
        >
          <div class="text-h3 text-white q-mx-lg">Movement Tracker</div>
          <div class="text-h6 text-grey-3 q-mx-lg q-mt-lg" style="width: 400px">
            Discipleship tree tracking software for Christian ministries.
          </div>
          <div
            class="text-subtitle2 text-grey-3 q-mx-lg q-my-md"
            style="width: 400px"
          >
            The Movement Tracker App has been specifically designed to aid you
            in keeping track of members in a spiritual movement.
          </div>
          <div
            class="text-subtitle2 text-grey-3 q-mx-lg q-mb-md"
            style="width: 400px"
          >
            Enhance your ministry by making sure that no one slips through the
            cracks by creating customizable tree like diagrams of who is
            Discipleing who.
          </div>
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
          <div>
            <q-btn
              class="q-ma-lg text-subtitle2"
              style="width: 135; height: 40; border: white 1px solid"
              color="black"
              no-caps
            >
              <!-- <img src="statics/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" style="width:100%;height:100%"> -->
              <img
                width="30"
                height="30"
                src="statics/apple.png"
                alt=""
                class="q-mr-xs"
              />
              <!-- <q-badge color="red" floating>Coming Soon</q-badge> -->
              <div class="text-subtitle2 text-left" style="line-height: 1rem">
                Available<br />on iOS
              </div>
            </q-btn>
            <q-btn
              class="q-ma-lg"
              style="width: 135; height: 40; border: white 1px solid"
              color="black"
              no-caps
            >
              <!-- <img src="statics/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" style="width:100%;height:100%"> -->
              <img width="30" height="30" src="statics/android.png" alt="" />
              <!-- <q-badge color="red" floating>Coming Soon</q-badge> -->
              <div class="text-subtitle2 text-left" style="line-height: 1rem">
                Available<br />on Android
              </div>
            </q-btn>
          </div>
        </div>
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

export default {
  props: {
    // user: {}
  },
  data() {
    return {
      // createMovementLoading: false
      // createLoading: false
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
  },
  methods: {
    // createMovement () {
    //   movementJS.create(this)
    // }
  },
  computed: {
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
