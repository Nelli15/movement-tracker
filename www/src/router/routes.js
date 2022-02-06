const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MyLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') }
  //   ]
  // },
  // {
  //   // private routes
  //   path: '/',
  //   component: () => import('layouts/homeLayout.vue'),
  //   // meta: { protected: true },
  //   children: [
  //     { path: '', redirect: '/home' },
  //     { path: 'home', name: 'home', component: () => import('pages/home.vue') }
  //   ]
  // },
  // {
  //   // private routes
  //   path: '/movement/:movementId/',
  //   component: () => import('layouts/movementLayout.vue'),
  //   // meta: { protected: true },
  //   children: [
  //     { path: '', name: 'tree', component: () => import('pages/movement.vue') },
  //     { path: 'settings', name: 'settings', component: () => import('pages/movementEdit.vue') },
  //     { path: 'access', name: 'access', component: () => import('pages/accessPage.vue') }
  //   ]
  // },
  // public routes
  {
    // private routes
    path: '/',
    component: () => import('layouts/public.vue'),
    // meta: { protected: true },
    children: [
      { path: '', redirect: '/home' },
      { path: 'home', name: 'home', component: () => import('pages/home.vue') },
      {
        path: 'pricing',
        name: 'priceing',
        component: () => import('pages/pricing.vue')
      },
      {
        path: 'features',
        name: 'features',
        component: () => import('pages/features.vue')
      },
      {
        path: 'whats-new',
        name: 'whats-new',
        component: () => import('pages/whats-new.vue')
      },
      { path: 'help', name: 'help', component: () => import('pages/help.vue') }
      // { path: 'login', name: 'login', component: () => import('pages/login.vue') },
      // { path: 'logout', name: 'logout', component: () => import('pages/logout.vue') }
    ]
  },
  // {
  //   path: '/login',
  //   component: () => import('layouts/home.vue'),
  //   name: 'login',
  //   // meta: { protected: true },
  //   children: [
  //   ]
  // },
  { path: '*', redirect: '/home' }
  // { path: '*', redirect: '/app/home' }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
