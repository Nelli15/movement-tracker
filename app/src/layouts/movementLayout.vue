<template>
  <div>
    <q-layout view="hHh lpR fFf" v-if="ready">
      <meta name="robots" content="noindex" />
      <q-pull-to-refresh @refresh="refresh">
        <q-header elevated class="print-hide">
          <q-toolbar class="glossy">
            <img
              :src="logo_url"
              style="height: 40px; cursor: pointer"
              @click="$router.push('/home')"
              alt="Logo"
            />
            <div v-if="!q.platform.is.mobile">
              <q-btn
                v-for="link in pageLinks"
                :key="link.label"
                :to="link.to"
                :aria-label="link.label"
                flat
                :data-cy="link['data-cy']"
              >
                <q-icon :name="link.icon" />
                <q-tooltip class="bg-accent text-grey-10">{{
                  link.tooltip
                }}</q-tooltip>
              </q-btn>
            </div>
            <!-- Mobile menu -->
            <q-btn-dropdown
              stretch
              flat
              icon="menu"
              v-if="q.platform.is.mobile"
            >
              <q-list class="text-white bg-primary">
                <q-item
                  clickable
                  v-close-popup
                  v-for="link in pageLinks"
                  :key="link.label"
                  :to="link.to"
                  :aria-label="link.label"
                  flat
                  :data-cy="link['data-cy']"
                >
                  <q-item-section avatar>
                    <q-icon :name="link.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ link.label }}</q-item-label>
                  </q-item-section>
                  <q-tooltip class="bg-accent text-grey-10">{{
                    link.tooltip
                  }}</q-tooltip>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-space />
            <q-btn flat no-caps aria-label="User info and Logout" v-if="user">
              <q-tooltip class="bg-accent text-grey-10">Who am I?</q-tooltip>
              <q-avatar class size="md">
                <q-img
                  :src="
                    user.photoURL
                      ? user.photoURL
                      : 'https://avatars.dicebear.com/api/bottts/' +
                        user.uid +
                        '.svg'
                  "
                  alt="Profile Picture"
                >
                  <template v-slot:error>
                    <q-img
                      :src="
                        'https://avatars.dicebear.com/api/bottts/' +
                        user.uid +
                        '.svg'
                      "
                      alt="Profile Picture"
                    >
                      <template v-slot:error>
                        <div
                          class="absolute-full flex flex-center bg-negative text-white"
                        >
                          Cannot load image
                        </div>
                      </template>
                    </q-img>
                  </template>
                </q-img>
                <!-- <q-badge v-if="props.row.online" color="positive" text-color="positive" floating round label="o" size="xs" /> -->
              </q-avatar>
              <div class="q-pl-sm">{{ user.displayName }}</div>
              <q-menu anchor="bottom left" self="top left" style="content: fit">
                <q-card class="my-card">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar class size="md">
                        <q-img
                          :src="
                            user.photoURL
                              ? user.photoURL
                              : 'https://avatars.dicebear.com/api/bottts/' +
                                user.uid +
                                '.svg'
                          "
                          alt="Profile Picture"
                        >
                          <template v-slot:error>
                            <q-img
                              :src="
                                'https://avatars.dicebear.com/api/bottts/' +
                                user.uid +
                                '.svg'
                              "
                              alt="Profile Picture"
                            >
                              <template v-slot:error>
                                <div
                                  class="absolute-full flex flex-center bg-negative text-white"
                                >
                                  Cannot load image
                                </div>
                              </template>
                            </q-img>
                          </template>
                        </q-img>
                        <!-- <q-badge v-if="props.row.online" color="positive" text-color="positive" floating round label="o" size="xs" /> -->
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ user.displayName }}</q-item-label>
                      <q-item-label caption>{{ user.email }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-card-actions vertical align="center">
                    <q-btn
                      flat
                      :icon="
                        q.dark.isActive
                          ? 'img:icons/logout-white.svg'
                          : 'img:icons/logout.svg'
                      "
                      label="Logout"
                      @click="logout"
                    />
                    <!-- <q-btn
                      flat
                      icon="settings"
                      label=""

                    >
                      <q-menu>
                        <mt-user-edit/>
                      </q-menu>
                    </q-btn>-->
                  </q-card-actions>
                </q-card>
              </q-menu>
            </q-btn>
            <mt-online-status />
            <!-- <mt-notifications /> -->
          </q-toolbar>
        </q-header>
      </q-pull-to-refresh>
      <q-page-container style="min-height: 90vh">
        <!-- <transition appear enter-active-class="animated fadeIn" duration="1000"> -->
        <!-- <router-view style="min-height: calc(90vh-45px)" /> -->
        <!-- </transition> -->
        <router-view v-slot="{ Component }">
          <transition
            appear
            enter-active-class="animated fadeIn"
            duration="1000"
          >
            <component :is="Component" />
          </transition>
        </router-view>
        <mt-help-fab />
      </q-page-container>
    </q-layout>
    <mt-splashscreen v-if="!ready" />
  </div>
</template>

<script>
import { logEvent, getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import { defineAsyncComponent, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "movementLayout",
  setup() {
    const q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const logo_url = ref("/app-logo-128x128.png");
    const user = computed(() => store.getters["auth/user"]);
    const movement = computed(() => store.state.movement.movement);
    if (navigator.standalone) {
      // console.log('Launched: Installed (iOS)')
    } else if (matchMedia("(display-mode: standalone)").matches) {
      // console.log('Launched: Installed')
    } else {
      // console.log('Launched: Browser Tab')
      if (q.platform.is.ios && q.platform.is.safari) {
        Notify.create({
          message:
            'Movement Tracker works best when installed! Just tap <img src="/icons/Navigation_Action_2x_white.png" height="15px"></img> then "Add to Homescreen"',
          html: true,
          timeout: 10000,
          color: "primary",
        });
      } else if (q.platform.is.ios && !q.platform.is.safari) {
        Notify.create({
          message:
            "Movement Tracker works best when installed! Open Movement Tracker in Safari to install the app.",
          timeout: 10000,
          color: "primary",
          // actions: [{
          //   label: 'Install',
          //   icon: 'system_update',
          //   color: 'deep-orange-9',
          //   handler: () => {
          //     window.location = 'googlechrome-x-callback://x-callback-url/open/?url=' + encodeURIComponent(location.href) + '&x-source=Safari&x-success=' + encodeURIComponent(location.href)
          //   }
          // }]
        });
      }
    }

    function refresh() {
      window.location.reload();
    }
    function logout() {
      signOut(getAuth())
        .then(() => {
          router.push("/login");
          return true;
        })
        .catch((err) => {
          if (process.env.DEV)
            logEvent(getAnalytics(), "exception", {
              description: err,
              fatal: false,
            });
          console.error(new Error("Oops, something went wrong: " + err));
        });
    }

    const ready = computed(() => store.getters.ready);

    const permissions = computed(() => store.state.movement.permissions);
    const pageLinks = computed(() => {
      // console.log(permissions);
      let links = [
        {
          label: "Home",
          icon: "home",
          tooltip: "Home",
          to: "/home",
          permission: true,
          "data-cy": "home-link",
        },
        {
          label: "Movement Members",
          icon: "img:icons/file-tree-white.svg",
          tooltip: "View Members",
          to: `/movement/${movement.value.id}/members`,
          permission: permissions.value
            ? permissions.value.members_view
            : false,
          "data-cy": "members-link",
        },
        {
          label: "Movement Snapshots",
          icon: "photo_library",
          tooltip: "View Snapshots",
          to: `/movement/${movement.value.id}/snapshots`,
          permission: permissions.value
            ? permissions.value.snapshots_view
            : false,
          "data-cy": "snapshots-link",
        },
        // {
        //   label: "Movement Trends",
        //   icon: "timeline",
        //   tooltip: "View Trends",
        //   to: `/movement/${movement.value.id}/trends`,
        //   permission: permissions.value
        //     ? permissions.value.trends_view && process.env.DEV
        //     : false,
        //   "data-cy": "trends-link",
        // },
        // {
        //   label: "Events",
        //   icon: "event",
        //   tooltip: "View Events",
        //   to: `/movement/${movement.value.id}/events`,
        //   permission: permissions.value
        //     ? permissions.value.events_view && process.env.DEV
        //     : false,
        //   "data-cy": "events-link",
        // },
        {
          label: "Movement Settings",
          icon: "settings",
          tooltip: "Movement Settings",
          to: `/movement/${movement.value.id}/settings`,
          permission: permissions.value
            ? permissions.value.settings_view
            : false,
          "data-cy": "settings-link",
        },
        {
          label: "Sharing and Access",
          icon: "people",
          tooltip: "Who has access",
          to: `/movement/${movement.value.id}/access`,
          permission: permissions.value ? permissions.value.access_view : false,
          "data-cy": "access-link",
        },
      ];
      // console.log(links);

      return links.filter((link) => link.permission);
    });

    return { q, logo_url, pageLinks, user, ready, logout, refresh };
  },
  data() {
    return {
      whatsNew: true,
    };
  },
  meta: {
    // <noscript> tags
    noscript: {
      default:
        "This app only works on browsers with Javascript enabled. Please enable Javascript and refresh the page to continue.",
    },
  },
  preFetch({ store, redirect, currentRoute }) {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // if (store.state.movements.movements.length <= 0) {
        store.dispatch("movement/fetchMovement", {
          uid: user.uid,
          movId: currentRoute.params.movId,
        });
        // }

        // // Create a reference to this user's specific status node.
        // // This is where we will store data about being online/offline.
        // var userStatusDatabaseRef = firebase.database().ref('/status/' + user.uid)

        // // We'll create two constants which we will write to
        // // the Realtime database when this device is offline
        // // or online.
        // var isOfflineForDatabase = {
        //   state: 'offline',
        //   last_changed: firebase.database.ServerValue.TIMESTAMP
        // }

        // var isOnlineForDatabase = {
        //   state: 'online',
        //   last_changed: firebase.database.ServerValue.TIMESTAMP
        // }

        // var isAwayForDatabase = {
        //   state: 'away',
        //   last_changed: firebase.database.ServerValue.TIMESTAMP
        // }

        // var userStatusFirestoreRef = $firestore.doc('/status/' + user.uid)

        // // Firestore uses a different server timestamp value, so we'll
        // // create two more constants for Firestore state.
        // var isOfflineForFirestore = {
        //   state: 'offline',
        //   last_changed: firebase.firestore.FieldValue.serverTimestamp()
        // }

        // var isOnlineForFirestore = {
        //   state: 'online',
        //   last_changed: firebase.firestore.FieldValue.serverTimestamp()
        // }

        // var isAwayForFirestore = {
        //   state: 'away',
        //   last_changed: firebase.firestore.FieldValue.serverTimestamp()
        // }

        // firebase.database().ref('.info/connected').on('value', (snapshot) => {
        //   if (snapshot.val() === false) {
        //     // Instead of simply returning, we'll also set Firestore's state
        //     // to 'offline'. This ensures that our Firestore cache is aware
        //     // of the switch to 'offline.'
        //     userStatusFirestoreRef.set(isOfflineForFirestore)
        //     return
        //   };

        //   userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(() => {
        //     userStatusDatabaseRef.set(isOnlineForDatabase)

        //     // We'll also add Firestore set here for when we come online.
        //     return userStatusFirestoreRef.set(isOnlineForFirestore)
        //   })
        // })

        // document.onvisibilitychange = (event) => {
        //   // console.log(document.visibilityState)
        //   if (document.visibilityState === 'hidden') {
        //     userStatusDatabaseRef.set(isAwayForDatabase)
        //     userStatusFirestoreRef.set(isAwayForFirestore)
        //   } else {
        //     userStatusDatabaseRef.set(isOnlineForDatabase)
        //     userStatusFirestoreRef.set(isOnlineForFirestore)
        //   }
        // }
      } else {
        redirect(`/login?signInSuccessUrl=${currentRoute.fullPath}`);
      }
    });
  },
  components: {
    "mt-help-fab": defineAsyncComponent(() =>
      import("../components/mt-help-fab.vue")
    ),
    "mt-splashscreen": defineAsyncComponent(() =>
      import("../components/mt-splashscreen.vue")
    ),
    "mt-online-status": defineAsyncComponent(() =>
      import("../components/mt-online-status.vue")
    ),
  },
};
</script>

<style></style>
