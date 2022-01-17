import { register } from 'register-service-worker'
// import { Notify } from 'quasar'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
if(!process.env.DEV){
register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready () {
    if (process.env.DEV) {
      console.log('App is being served from cache by a service worker.')
    }
  },

  registered (/* registration */) {
    if (process.env.DEV) {
      console.log('Service worker has been registered.')
    }
  },

  cached (/* registration */) {
    if (process.env.DEV) {
      console.log('Content has been cached for offline use.')
    }
  },

  updatefound (/* registration */) {
    if (process.env.DEV) {
      console.log('New content is downloading.')
    }
  },

  updated (/* registration */) {
    if (process.env.DEV) {
      console.log('New content is available; please refresh. Bloh Blop')
    }
  },

  offline () {
    if (process.env.DEV) {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    }
  },

  error (err) {
    if (process.env.DEV) {
      console.error('Error during service worker registration:', err)
    }
  }
})

self.addEventListener('message', event => {
  if (!event.data) {
    return
  }

  switch (event.data) {
    case 'force-activate':
      self.skipWaiting()
      self.clients.claim()
      self.clients.matchAll().then(clients => {
        clients.forEach(client => client.postMessage('reload-window'))
      })
      break
    default:
      // NOOP
      break
  }
})
}