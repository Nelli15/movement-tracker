import { getDoc, doc, getFirestore } from '@firebase/firestore'
import { onAuthStateChanged, getAuth } from '@firebase/auth'

const routes = [
  {
    // private routes
    path: '/home',
    component:() => import('layouts/homeLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component:() => import('pages/home.vue'),
        beforeEnter: (to, from) => isLoggedIn(to, from)
      }
    ]
  },
  {
    // private routes
    path: '/unauthorised',
    component:() => import('layouts/homeLayout.vue'),
    children: [
      {
        path: '',
        name: 'unauthorised',
        component:() => import('pages/unauthorised.vue'),
        beforeEnter: (to, from) => isLoggedIn(to, from)
      }
    ]
  },

  {
    // private routes
    path: '/movement/:movId/',
    component:() => import('layouts/movementLayout.vue'),
    beforeEnter: (to, from) => hasPermission(to, from),
    children: [
      {
        meta: { rule: 'members_view' },
        path: 'members',
        name: 'members',
        component:() => import('pages/movement.vue')
      },
      {
        meta: { rule: 'members_view' },
        path: 'printable',
        name: 'printable',
        component:() => import('pages/movementPrintable.vue')
      },
      {
        meta: { rule: 'snapshots_view' },
        path: 'snapshots',
        name: 'snapshots',
        component:() => import('pages/snapshots.vue')
      },
      {
        meta: { rule: 'snapshots_view' },
        path: 'snapshot/:snapId',
        name: 'snapshot',
        component:() => import('pages/snapshot.vue')
      },
      {
        meta: { rule: 'snapshots_view' },
        path: 'snapshot/:snapId/printable',
        name: 'snapshot-printable',
        component:() => import('pages/snapshotPrintable.vue')
      },
      {
        meta: { rule: 'trends_view' },
        path: 'trends',
        name: 'trends',
        component:() => import('pages/trends.vue')
      },
      {
        meta: { rule: 'events_view' },
        path: 'events',
        name: 'events',
        component:() => import('pages/events.vue')
      },
      {
        meta: { rule: 'events_view' },
        path: 'event/:eventId',
        name: 'event',
        component:() => import('pages/event.vue')
      },
      {
        meta: { rule: 'settings_view' },
        path: 'settings',
        name: 'settings',
        component:() => import('pages/settings.vue')
      },
      {
        meta: { rule: 'access_view' },
        path: 'access',
        name: 'access',
        component:() => import('pages/accessPage.vue')
      }
    ]
  },
  {
    // private routes
    path: '/movement/:movId/',
    component:() => import('layouts/homeLayout.vue'),
    children: [
      {
        path: 'insufficient',
        name: 'insufficient',
        component:() => import('pages/insufficient.vue'),
        beforeEnter: (to, from) => isLoggedIn(to, from)
      }
    ]
  },
  {
    path: '/login',
    component:() => import('layouts/signinLayout.vue'),
    children: [
      { path: '', name: 'login', component:() => import('pages/login.vue') }
    ]
  },
]

// Always leave this as last one
routes.push({
  path: '/:catchAll(.*)*',
  redirect: { name: 'home'}
})

export default routes

async function hasPermission (to, from) {
    const user = await AuthUser();
    const res = await getDoc(
      doc(
        getFirestore(),
        `/movements/${to.params.movId}/users/${user.uid}`
      )
    )
      if (!res || !res.exists()) return { name: 'home'}
      else if (res.get('role')) {
        const permissionsDoc = await getDoc(doc(getFirestore(), `/movements/${to.params.movId}/user-role-definitions/${res.get('role')}`)
        )
        if(!permissionsDoc.exists()) return { name: 'home'}
        const permissions = permissionsDoc.get('rules')
        if (permissions[to.meta.rule]) return 
      }
    return { name: 'home'}
}

async function isLoggedIn (to, from) {
  onAuthStateChanged(getAuth(), user => {
    console.log(user)
    if (user) {
      return
    } else {
      return '/login'
    }
  })
}

function AuthUser() {
  return new Promise((resolve) => {
    onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        resolve(false);
      } else {
        resolve(user);
      }
    });
  });
}