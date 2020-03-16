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
