/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

/* global workbox */

import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL
} from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'

precacheAndRoute(self.__WB_MANIFEST)

// catch-all for single page application
const handler = createHandlerBoundToURL('index.html')
const navigationRoute = new NavigationRoute(handler, {
  // ignore requests for static assets
  denyList: [/^\/css\//, /^\/fonts\//, /^\/img\//, /^\/js\//]
})
registerRoute(navigationRoute)

cleanupOutdatedCaches()

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting()
  }
})

self.addEventListener('activate', () => self.clients.claim())
