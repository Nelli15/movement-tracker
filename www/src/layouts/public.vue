<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar class="glossy">
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <span class="q-ma-md text-h6"> Movement Tracker </span>
        <span class="q-ma-md gt-sm">
          Discipleship tree tracking software for Christian ministries.
        </span>
        <q-space />
        <q-btn
          flat
          type="a"
          href="https://pwa.movementtracker.app/home"
          icon="mdi-login"
          label="Sign In"
        />
        <q-btn
          flat
          type="a"
          href="https://pwa.movementtracker.app/home"
          label="Sign Up"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="left"
      show-if-above
      elevated
      :width="200"
      :breakpoint="500"
      content-style="background-color: #c54210; color: white;"
    >
      <q-list padding class="text-grey-1">
        <q-item
          class="MT__drawer-link"
          v-ripple
          v-for="link in links1"
          :key="link.text"
          clickable
          :to="link.to"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
          <q-badge color="red" floating v-if="link.badge > ''">{{
            link.badge
          }}</q-badge>
        </q-item>
      </q-list>
      <template v-slot:mini>
        <q-list padding class="text-grey-1">
          <q-item
            class="MT__drawer-link"
            v-ripple
            v-for="link in links1"
            :key="link.text"
            clickable
            :to="link.to"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
          </q-item>
        </q-list>
      </template>
    </q-drawer>
    <q-page-container>
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="cookie">
        <q-card class="bg-primary text-white" style="max-width: 400px">
          <q-card-section
            >Our app and it's third-party tools use cookies, these are necessary
            for the apps functioning and are required to achieve the purposes
            illustrated in the cookie policy.</q-card-section
          >
          <q-card-actions align="right">
            <q-btn
              label="Accept"
              no-caps
              @click="
                cookie = !cookie;
                $q.localStorage.set('cookies', cookie);
              "
            />
            <q-btn label="Learn More" no-caps disable />
          </q-card-actions>
        </q-card>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
// import { openURL } from 'quasar'
require("../data/firebase");
// const firebase = require("@firebase/app")
// require('@firebase/auth')
// require("@firebase/firestore")

// import {mapActions} from 'vuex'
// import {mapGetters} from 'vuex'

export default {
  name: "default",
  props: {
    // user: {}
  },
  data() {
    return {
      left: false,
      links1: [
        { icon: "home", text: "Home", to: "/home", badge: "" },
        {
          icon: "mdi-feature-search",
          text: "Features",
          to: "/features"
        },
        // { icon: 'launch', text: 'Get Started', href: 'https://pwa.movementtracker.app/home', badge: '' },
        { icon: "attach_money", text: "Pricing", to: "/pricing", badge: "" },
        {
          icon: "new_releases",
          text: "What's New",
          to: "/whats-new"
        },
        { icon: "help", text: "Help", to: "/help" }
      ],
      miniState: true,
      cookie: true
      // leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  // preFetch ({ store, router }) {
  preFetch({ store, Router, redirect, currentRoute }) {
    // firebase.auth().onAuthStateChanged((user) => {
    // if (user) {
    // } else {
    // redirect(`/login?signInSuccessUrl=${currentRoute.fullPath}`)
    // }
    // })
  },
  created() {
    this.cookie = this.$q.localStorage.has("cookies")
      ? this.$q.localStorage.getItem("cookies")
      : true;
  },
  methods: {},
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  components: {
    // 'mt-notifications': () => import('../components/mt-notifications.vue')
    // 'mt-user': mt_user,
  }
};
</script>

<style scoped lang="stylus">
.MT__drawer-link
  line-height: 24px;
  border-radius: 0 24px 24px 0;
  margin-right: 12px;
</style>
