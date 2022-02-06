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
        <q-scroll-area class="fit">
          <div
            class="absolute column q-ma-lg"
            :style="{
              top: scope.percentScrolled * 25 + '%',
              left: 0,
              right: 0
            }"
          >
            <div class="text-h3 text-white q-mx-lg">Features</div>
            <div class="text-h6 text-grey-3 q-ma-lg q-col-8">
              The Movement Tracker app is the best and most flexible way to keep
              track of your discipleship trees in live time. This app allows you
              to create graphical representations of your movement, track
              indivdual people within your movement, and map the state of your
              movement over time. Movement Tracker is constantly being updated
              so keep an eye out for new features.
            </div>
            <!--           <div class="text-subtitle2 text-grey-3 q-mx-lg q-my-md" style="width:400px">
              The Movement Tracker App has been specifically designed to aid you in keeping track of members in a spiritual movement.
            </div>
            <div class="text-subtitle2 text-grey-3 q-mx-lg q-mb-md" style="width:400px">
              Enhance your ministry by making sure that no one slips through the cracks by creating customizable tree like diagrams of who is Discipleing who.
            </div> -->
            <div class="q-mt-lg justify-center row">
              <!-- <span> -->
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
              <!-- </span> -->
            </div>
            <div class="row q-col-gutter-lg q-my-lg" ref="features">
              <div
                class="col-12 col-sm-6 col-md-3 col-lg-2"
                v-for="feature in features"
                :key="feature.title"
              >
                <q-card class="bg-secondary text-white" style="height: 300px">
                  <q-card-section v-if="feature.icon">
                    <!-- <div style="margin:auto;"> -->
                    <q-icon
                      :name="feature.icon"
                      size="lg"
                      style="width: 100%"
                    />
                    <!-- </div> -->
                  </q-card-section>
                  <q-card-section class="text-h6 text-center" dense>
                    {{ feature.title }}
                  </q-card-section>
                  <q-card-section dense>
                    <q-scroll-area style="height: 130px">
                      {{ feature.body }}
                    </q-scroll-area>
                  </q-card-section>
                </q-card>
              </div>
            </div>
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
// import firebase from '../data/firebase'
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
      // featuresHeight: '',
      home_image_url: [],
      home_image_srcset: [],
      home_image_url_portrait: [],
      home_image_srcset_portrait: [],
      features: [
        {
          title: "Graphical Movement Trees",
          body:
            "Create visual representations of the your Movement to track who is meeting with who.",
          icon: "mdi-file-tree"
        },
        {
          title: "Create Multiple Movements",
          body:
            "There are no limits to the number of Movements that you can make or be part of.",
          icon: "content_copy"
        },
        {
          title: "Take Movement Snapshots",
          body:
            "Snapshots allow you to keep a copy of the Movement at a specific moment in time.",
          icon: "photo_library"
        },
        {
          title: "Discover Trends",
          body:
            " Use Snapshots to track Movement statistics over time and create graphs to easily determine the health of your Movement.",
          icon: "timeline"
        },
        {
          title: "Let no one fall through the cracks.",
          body: "Keep track of how individuals are involved in your Movement.",
          icon: "person"
        },
        {
          title: "Share Movements",
          body:
            "Don't leave all the work up to yourself, Collaborate with others to ensure that the Movement is always up to date. You can let others edit the Movement or only allow them to view the Movement",
          icon: "people"
        }
      ]
    };
  },
  preFetch({ store }) {
    // store.dispatch('fetchPages', 'home')
    // firebase.initializeApp()
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
  mounted() {
    // const children = []
    // if (this.$refs.features) {
    //   for (var child in this.$refs.features.children) {
    //     // console.log(child, this.$refs.features.children[child].clientHeight)
    //     if (!isNaN(this.$refs.features.children[child].clientHeight)) {
    //       children.push(this.$refs.features.children[child].clientHeight)
    //     }
    //   }
    //   // console.log(Math.max(...children))
    //   this.featuresHeight = Math.max(...children) + ''
    // }
    // this.featuresHeight = 'auto'
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
