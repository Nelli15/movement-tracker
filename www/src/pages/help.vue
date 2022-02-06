<template>
  <q-page class="bg-blue-grey-3">
    <!--  <q-parallax style="background-color:black;min-height:calc(100vh - 64px)">
      <template v-slot:media>
        <img
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
          style="opacity: 0.5;filter: alpha(opacity=50);"
        >
      </template>

      <template v-slot:content="scope" style="background-color:black">
        <div
          class="absolute column q-ma-lg"
          :style="{
            top: (scope.percentScrolled * 25) + '%',
            left: 0,
            right: 0
          }"
        >
          <div class="text-h3 text-white q-mx-lg">Help</div>
        </div>
      </template>
    </q-parallax> -->
    <div class="q-mx-md q-py-md row">
      <div class="col-2 q-ml-md"></div>
      <!-- <q-card class="col-2 fixed" style="height: 82vh;">
        <q-scroll-area style="height:100%">
          <q-list dense>
            <q-item-label header>Movements
            </q-item-label>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Create a Movement</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Copy a Movement</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Edit a Movement</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Delete a Movement</q-item-label>
            </q-item>
            <q-separator spaced />
            <q-item-label header>Members</q-item-label>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Add a Member</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Edit a Member</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Copy a Member</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Move a Member</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Delete a Member</q-item-label>
            </q-item>
            <q-separator spaced />
            <q-item-label header>Roles</q-item-label>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Add a Role</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Edit a Role</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Assign a Role to a Member</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Delete a Role</q-item-label>
            </q-item>
            <q-separator spaced />
            <q-item-label header>Modifiers</q-item-label>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Add a Modifier</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Edit a Modifier</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Assign a Modifier to a Member</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Delete a Modifier</q-item-label>
            </q-item>
            <q-separator spaced />
            <q-item-label header>Sharing & Permissions</q-item-label>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Share a Movement</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Change a User Permissions</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Stop Sharing</q-item-label>
            </q-item>
            <q-item dense inset-level="0.3">
               <q-item-label caption>Delete a Role</q-item-label>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-card> -->
      <div class="col-7 q-pl-md">
        <!-- Movements -->
        <q-card class="q-pa-md" style="height: calc(100vh - 64px - 32px)">
          <q-input
            v-model="searchQuery"
            outlined
            class="q-pt-sm q-px-sm"
            label="Search"
            :color="$q.dark.isActive ? 'blue-2' : ''"
          >
            <template v-slot:append>
              <q-icon
                v-if="searchQuery !== ''"
                name="close"
                @click="searchQuery = ''"
                class="cursor-pointer"
              />
              <q-icon name="search" />
            </template>
          </q-input>
          <q-scroll-area style="height: calc(100% - 56px)" class="col">
            <q-card
              v-for="topic in topicsFiltered"
              :key="topic.title"
              style="border: black 1px solid"
              class="q-ma-sm"
            >
              <q-card-section class="text-bold" dense>
                {{ topic.title }}
              </q-card-section>
              <q-separator />
              <q-expansion-item
                expand-separator
                switch-toggle-side
                expand-icon="arrow_drop_down"
              >
                <q-card>
                  <q-card-section
                    v-html="para"
                    v-for="(para, index) in topic.body"
                    :key="topic.title + 'para' + index"
                  >
                  </q-card-section>
                </q-card>
                <template slot="header">
                  <div class="q-gutter-xs">
                    <q-badge
                      color="positive"
                      v-for="permission in topic.permission"
                      :key="'permission-' + topic.title + permission"
                      ><q-icon name="people" />{{ permission }}</q-badge
                    >
                  </div>
                </template>
              </q-expansion-item>
            </q-card>
          </q-scroll-area>
        </q-card>
      </div>
    </div>
    <!-- Movement tree tracking software to record the -->
  </q-page>
</template>

<script>
// import { debounce } from 'quasar'
// import { mapGetters } from 'vuex'
import firebase from "@firebase/app";
require("@firebase/firestore");

export default {
  props: {
    // user: {}
  },
  data() {
    return {
      location: 0,
      topics: {},
      searchQuery: "",
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
    this.getTopics();
  },
  methods: {
    // createMovement () {
    //   movementJS.create(this)
    // }
    getPosition(el) {
      // this.location = this.$refs['anchor-modifiers'].$el.offsetTop
      // console.log(el, this.$refs[el].$el.offsetTop)
      return this.$refs[el].$el.offsetTop;
    },
    getTopics() {
      firebase
        .firestore()
        .collection("help")
        .where("published", "==", true)
        .onSnapshot((snap) => {
          return snap.forEach((doc) => {
            this.$set(this.topics, doc.id, doc.data());
          });
        });
    },
  },
  computed: {
    topicsFiltered() {
      const words = this.searchQuery
        .toLowerCase()
        .split(" ")
        .filter((i) => {
          return i !== "";
        });
      // console.log(words)
      if (words.length === 1 && words[0] !== "") {
        return Object.keys(this.topics)
          .map((i) => this.topics[i])
          .filter(function (topic) {
            for (const i in words) {
              const word = words[i];
              // console.log(word, JSON.stringify(topic).toLowerCase())
              if (JSON.stringify(topic).toLowerCase().indexOf(word) === -1) {
                // console.log(JSON.stringify(topic).toLowerCase().indexOf(word))
                return false;
              }
            }
            return true;
          });
      } else {
        return this.topics;
      }
    },
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
    // 'mt-scroll-to-px': () => import('./../components/mt-scroll-to-px.vue')
  },
};
</script>
