import { getDoc, doc, getFirestore } from '@firebase/firestore'
import { onAuthStateChanged, getAuth } from '@firebase/auth'

const routes = [
  // {
  //   // use this when performing server maintainance
  //   path: '/',
  //   component:() => import('layouts/serverMaintenance.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'home',
  //       component:() => import('pages/blank.vue'),
  //       // beforeEnter: (to, from) => isLoggedIn(to, from)
  //     }
  //   ]
  // },
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
    children: [
      {
        path: '',
        name: 'smartRedirect',
        beforeEnter: (to, from) => smartRedirect(to, from),
        component:() => import('pages/movement.vue')
      },
    ]
  },
  {
    // private routes
    path: '/movement/:movId/',
    component:() => import('layouts/movementLayout.vue'),
    beforeEnter: (to, from) => hasPermission(to, from),
    children: [
      {
        meta: { rules: ['members_view', 'trees_view'] },
        path: 'members',
        name: 'members',
        component:() => import('pages/movement.vue')
      },
      {
        meta: { rules: ['members_view', 'trees_view'] },
        path: 'printable',
        name: 'printable',
        component:() => import('pages/movementPrintable.vue')
      },
      {
        meta: { rules: ['snapshots_view'] },
        path: 'snapshots',
        name: 'snapshots',
        component:() => import('pages/snapshots.vue')
      },
      {
        meta: { rules: ['snapshots_view'] },
        path: 'snapshot/:snapId',
        name: 'snapshot',
        component:() => import('pages/snapshot.vue')
      },
      {
        meta: { rules: ['snapshots_view'] },
        path: 'snapshot/:snapId/printable',
        name: 'snapshot-printable',
        component:() => import('pages/snapshotPrintable.vue')
      },
      {
        meta: { rules: ['trends_view'] },
        path: 'trends',
        name: 'trends',
        component:() => import('pages/trends.vue')
      },
      {
        meta: { rules: ['events_view'] },
        path: 'events',
        name: 'events',
        component:() => import('pages/events.vue')
      },
      {
        meta: { rules: ['events_view'] },
        path: 'event/:eventId',
        name: 'event',
        component:() => import('pages/event.vue')
      },
      {
        meta: { rules: ['settings_view'] },
        path: 'settings',
        name: 'settings',
        component:() => import('pages/settings.vue')
      },
      {
        meta: { rules: ['access_view'] },
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
        for (let rule of to.meta.rules) {
        if (permissions[rule]) return 
        }
      }
    return { name: 'home'}
}
async function smartRedirect (to, from) {
    const user = await AuthUser();
    const res = await getDoc(
      doc(
        getFirestore(),
        `/movements/${to.params.movId}/users/${user.uid}`
      )
    ).catch(err => console.log(err))
    
      if (!res || !res.exists()) return { name: 'home'}
      else if (res.get('role')) {
        
        const permissionsDoc = await getDoc(doc(getFirestore(), `/movements/${to.params.movId}/user-role-definitions/${res.get('role')}`)
        )
        
        
        if(!permissionsDoc.exists()) return { name: 'home'}
        const permissions = permissionsDoc.get('rules')
        if (permissions['members_view'] || permissions['trees_view']) return { name: 'members', params: to.params}
        if (permissions['snapshots_view']) return { name: 'snapshots', params: to.params}
        // if (permissions['trends_view']) return { name: 'trends', params: to.params}
        if (permissions['settings_view'] || permissions['trees_view']) return { name: 'settings', params: to.params}
        if (permissions['access_view'] || permissions['trees_view']) return { name: 'access', params: to.params}
        console.log(`/movements/${to.params.movId}/users/${user.uid}`)
      }
    return { name: 'home'}
}

async function isLoggedIn (to, from) {
  const user = await AuthUser()
    if (user) {
      return
    } else {
      return '/login'
    }
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