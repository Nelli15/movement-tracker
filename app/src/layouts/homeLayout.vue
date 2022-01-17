<template>
  <div>
    <q-layout view="hHh lpR fFf" v-if="ready">
      <meta name="robots" content="noindex" />
      <q-pull-to-refresh @refresh="refresh">
        <q-header elevated>
          <q-toolbar class="glossy">
            <img
              :src="logo_url"
              style="height: 40px"
              alt="Logo"
              class="logo"
              data-cy="logo"
            />
            <q-btn flat to="/home" aria-label="home" data-cy="home-btn">
              <q-icon name="home" />
              <q-tooltip class="bg-accent text-grey-10">Home</q-tooltip>
            </q-btn>
            <q-space />
            <q-btn
              flat
              no-caps
              aria-label="User info and Logout"
              data-cy="user-signout"
            >
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
              <q-menu
                anchor="bottom left"
                self="top left"
                style="content: fit"
                data-cy="user-signout-menu"
              >
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
                      aria-label="Logout"
                    />
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
        <!-- <transition name="fade" mode="out-in"> -->
        <router-view style="min-height: 90vh" />
        <!-- </transition> -->
        <mt-help-fab />
      </q-page-container>
      <mt-whats-new />
    </q-layout>
    <mt-splashscreen v-if="!ready" />
  </div>
</template>

<script>
// import store from './../store'
// const movementsModule = require('./../store/modules/movements.js')
import { debounce, Notify } from "quasar";
import { logEvent } from "firebase/analytics";
import { onAuthStateChanged, getAuth, signOut } from "@firebase/auth";
// import { getFirestore } from "@firebase/firestore";
import { defineAsyncComponent, ref, computed } from "vue";

import { create } from "../scripts/movement.js";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

let installPromptEvent;

window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent Chrome <= 67 from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  installPromptEvent = event;
  // Update the install UI to notify the user app can be installed
  // document.querySelector('#install-button').disabled = false
  Notify.create({
    message: "Movement Tracker works best when installed! Install now?",
    timeout: 10000,
    color: "primary",
    actions: [
      {
        label: "Install",
        icon: "system_update",
        color: "deep-orange-9",
        handler: () => {
          // Update the install UI to remove the install button
          // document.querySelector('#install-button').disabled = true
          // Show the modal add to home screen dialog
          installPromptEvent.prompt();
          // Wait for the user to respond to the prompt
          installPromptEvent.userChoice.then((choice) => {
            if (choice.outcome === "accepted") {
              // console.log('User accepted the A2HS prompt')
              if (process.env.PROD) logEvent(getAnalytics(), "app_installed");
            } else {
              // console.log('User dismissed the A2HS prompt')
            }
            // Clear the saved prompt since it can't be used again
            installPromptEvent = null;
            return true;
          });
        },
      },
      // { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
    ],
  });
});

export default {
  name: "homeLayout",
  setup() {
    const q = useQuasar();
    const store = useStore();
    const router = useRouter();
    const logo_url = ref("/app-logo-128x128.png");
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
    const createMovement = debounce(() => {
      return create(this), 10000;
    });
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
    const user = computed(() => store.getters["auth/user"]);

    return { q, logo_url, createMovement, logout, refresh, ready, user };
  },
  preFetch({ store, redirect, currentRoute }) {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        store.dispatch("movements/fetchMovements", { uid: user.uid });

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
    // "mt-notifications":defineAsyncComponent(() => import("../components/mt-notifications.vue")),
    "mt-help-fab": defineAsyncComponent(() =>
      import("../components/mt-help-fab.vue")
    ),
    "mt-whats-new": defineAsyncComponent(() =>
      import("../components/mt-whats-new.vue")
    ),
    "mt-splashscreen": defineAsyncComponent(() =>
      import("../components/mt-splashscreen.vue")
    ),
    "mt-online-status": defineAsyncComponent(() =>
      import("../components/mt-online-status.vue")
    ),
  },
};

// const showRefreshUI = registration => {
//   const container = document.querySelector(".new-sw");
//   container.style.display = "block";

//   const button = document.querySelector("button");
//   button.addEventListener("click", () => {
//     button.disabled = true;

//     registration.waiting.postMessage("force-activate");
//   });
// };

// const onNewServiceWorker = (registration, callback) => {
//   if (registration.waiting) {
//     // SW is waiting to activate. Can occur if multiple clients open and
//     // one of the clients is refreshed.
//     return callback();
//   }

//   const listenInstalledStateChange = () => {
//     registration.installing.addEventListener("statechange", () => {
//       if (event.target.state === "installed") {
//         // A new service worker is available, inform the user
//         callback();
//       }
//     });
//   };

//   if (registration.installing) {
//     return listenInstalledStateChange();
//   }

//   // We are currently controlled so a new SW may be found...
//   // Add a listener in case a new SW is found,
//   registration.addEventListener("updatefound", listenInstalledStateChange);
// };

// window.addEventListener("load", () => {
//   // When the user asks to refresh the UI, we'll need to reload the window
//   navigator.serviceWorker.addEventListener("message", event => {
//     if (!event.data) {
//       return;
//     }

//     switch (event.data) {
//       case "reload-window":
//         window.location.reload();
//         break;
//       default:
//         // NOOP
//         break;
//     }
//   });

//   navigator.serviceWorker
//     .register("/service-worker.js")
//     .then(function(registration) {
//       // Track updates to the Service Worker.
//       if (!navigator.serviceWorker.controller) {
//         // The window client isn't currently controlled so it's a new service
//         // worker that will activate immediately
//         return;
//       }

//       onNewServiceWorker(registration, () => {
//         showRefreshUI(registration);
//       });
//     });
// });
</script>
