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
            <q-tabs
              v-if="!q.platform.is.mobile"
              v-model="tab"
              stretch
              dense
              align="left"
            >
              <q-route-tab
                v-for="link in pageLinks"
                :key="link.label"
                :to="link.to"
                :aria-label="link.label"
                flat
                dense
                :data-cy="link['data-cy']"
              >
                <q-icon size="sm">
                  <span v-html="link.icon"></span>
                </q-icon>
                {{ link.label }}
              </q-route-tab>
            </q-tabs>
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
                    <q-icon>
                      <span v-html="link.icon"></span>
                    </q-icon>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ link.label }}</q-item-label>
                  </q-item-section>
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
import { logEvent, getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { defineAsyncComponent, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';

export default {
  name: 'movementLayout',
  setup() {
    const q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const logo_url = ref('/app-logo-128x128.png');
    const user = computed(() => store.getters['auth/user']);
    const movement = computed(() => store.state.movement.movement);
    if (navigator.standalone) {
      // console.log('Launched: Installed (iOS)')
    } else if (matchMedia('(display-mode: standalone)').matches) {
      // console.log('Launched: Installed')
    } else {
      // console.log('Launched: Browser Tab')
      if (q.platform.is.ios && q.platform.is.safari) {
        q.notify({
          message:
            'Movement Tracker works best when installed! Just tap <img src="/icons/Navigation_Action_2x_white.png" height="15px"></img> then "Add to Homescreen"',
          html: true,
          timeout: 10000,
          color: 'primary',
        });
      } else if (q.platform.is.ios && !q.platform.is.safari) {
        q.notify({
          message:
            'Movement Tracker works best when installed! Open Movement Tracker in Safari to install the app.',
          timeout: 10000,
          color: 'primary',
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
          router.push('/login');
          return true;
        })
        .catch((err) => {
          if (process.env.DEV)
            logEvent(getAnalytics(), 'exception', {
              description: err,
              fatal: false,
            });
          console.error(new Error('Oops, something went wrong: ' + err));
        });
    }

    const ready = computed(() => store.getters.ready);

    const permissions = computed(() => store.state.movement.permissions);
    const pageLinks = computed(() => {
      // console.log(permissions);
      let links = [
        {
          label: 'Home',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
          tooltip: 'Home',
          to: '/home',
          permission: true,
          'data-cy': 'home-link',
        },
        {
          label: 'Members',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3,3H9V7H3V3M15,10H21V14H15V10M15,17H21V21H15V17M13,13H7V18H13V20H7L5,20V9H7V11H13V13Z" /></svg>',
          tooltip: 'View Members',
          to: `/movement/${movement.value.id}/members`,
          permission: permissions.value
            ? permissions.value.members_view
            : false,
          'data-cy': 'members-link',
        },
        {
          label: 'Snapshots',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/></svg>',
          tooltip: 'View Snapshots',
          to: `/movement/${movement.value.id}/snapshots`,
          permission: permissions.value
            ? permissions.value.snapshots_view
            : false,
          'data-cy': 'snapshots-link',
        },
        // {
        //   label: "Movement Trends",
        //   icon: "<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M23,8c0,1.1-0.9,2-2,2c-0.18,0-0.35-0.02-0.51-0.07l-3.56,3.55C16.98,13.64,17,13.82,17,14c0,1.1-0.9,2-2,2s-2-0.9-2-2 c0-0.18,0.02-0.36,0.07-0.52l-2.55-2.55C10.36,10.98,10.18,11,10,11s-0.36-0.02-0.52-0.07l-4.55,4.56C4.98,15.65,5,15.82,5,16 c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2c0.18,0,0.35,0.02,0.51,0.07l4.56-4.55C8.02,9.36,8,9.18,8,9c0-1.1,0.9-2,2-2s2,0.9,2,2 c0,0.18-0.02,0.36-0.07,0.52l2.55,2.55C14.64,12.02,14.82,12,15,12s0.36,0.02,0.52,0.07l3.55-3.56C19.02,8.35,19,8.18,19,8 c0-1.1,0.9-2,2-2S23,6.9,23,8z"/></g></g></g></svg>",
        //   tooltip: "View Trends",
        //   to: `/movement/${movement.value.id}/trends`,
        //   permission: permissions.value
        //     ? permissions.value.trends_view && process.env.DEV
        //     : false,
        //   "data-cy": "trends-link",
        // },
        // {
        //   label: "Events",
        //   icon: "<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>",
        //   tooltip: "View Events",
        //   to: `/movement/${movement.value.id}/events`,
        //   permission: permissions.value
        //     ? permissions.value.events_view && process.env.DEV
        //     : false,
        //   "data-cy": "events-link",
        // },
        {
          label: 'Settings',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></g></svg>',
          tooltip: 'Movement Settings',
          to: `/movement/${movement.value.id}/settings`,
          permission: permissions.value
            ? permissions.value.settings_view
            : false,
          'data-cy': 'settings-link',
        },
        {
          label: 'Sharing and Access',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
          tooltip: 'Who has access',
          to: `/movement/${movement.value.id}/access`,
          permission: permissions.value ? permissions.value.access_view : false,
          'data-cy': 'access-link',
        },
      ];
      // console.log(links);

      return links.filter((link) => link.permission);
    });

    return {
      q,
      tab: ref(null),
      logo_url,
      pageLinks,
      user,
      ready,
      logout,
      refresh,
    };
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
        'This app only works on browsers with Javascript enabled. Please enable Javascript and refresh the page to continue.',
    },
  },
  preFetch({ store, redirect, currentRoute }) {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // if (store.state.movements.movements.length <= 0) {
        store.dispatch('movement/fetchMovement', {
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
    'mt-help-fab': defineAsyncComponent(() =>
      import('../components/mt-help-fab.vue')
    ),
    'mt-splashscreen': defineAsyncComponent(() =>
      import('../components/mt-splashscreen.vue')
    ),
    'mt-online-status': defineAsyncComponent(() =>
      import('../components/mt-online-status.vue')
    ),
  },
};
</script>

<style>
.q-item.q-router-link--active,
.q-item--active {
  color: var(--q-info);
}
</style>
