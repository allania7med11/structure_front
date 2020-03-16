importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn@4.3.1/workbox/workbox-sw.js')

// --------------------------------------------------
// Configure
// --------------------------------------------------

// Set workbox config
workbox.setConfig({
  "debug": false
})

// Set workbox cache names
workbox.core.setCacheNameDetails({
  "prefix": "app",
  "suffix": "v1",
  "precache": "precache",
  "runtime": "runtime"
})

// Start controlling any existing clients as soon as it activates
workbox.core.clientsClaim()

// Skip over the SW waiting lifecycle stage
workbox.core.skipWaiting()

workbox.precaching.cleanupOutdatedCaches()

// -- Start of workboxExtensions --
/* eslint-disable no-undef */
if (workbox) {
  console.log(`Yay! Workbox3 is loaded 🎉`)
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}
self.addEventListener("fetch", event => {
  if (event.request.url.includes("/api/") && !navigator.onLine) {
    event.respondWith(caches.match(event.request))
  }
})
// -- End of workboxExtensions --

// --------------------------------------------------
// Precaches
// --------------------------------------------------

// Precache assets

workbox.precaching.precacheAndRoute([
  "/",
  "/contact",
  "/favicon.ico",
  "Tutorials/Beam",
  "Tutorials/BeamsInternalHinges",
  "Tutorials/FrameStructure",
  "Tutorials/TrussStructure"
], {
  "cacheId": "client-prod",
  "directoryIndex": "/"
})

// --------------------------------------------------
// Runtime Caching
// --------------------------------------------------

// Register route handlers for runtimeCaching
workbox.routing.registerRoute(new RegExp('/_nuxt/'), new workbox.strategies.CacheFirst ({}), 'GET')
workbox.routing.registerRoute(new RegExp('/'), new workbox.strategies.NetworkFirst ({}), 'GET')
