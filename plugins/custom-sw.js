/* eslint-disable no-undef */
let data = []
if (workbox) {
  console.log(`Yay! Workbox3 is loaded 🎉`)
  fetch("/apiCl/test").then(function(response) {
    response.json().then(cv => {
      data = cv.data
    })
  })
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}
self.addEventListener("install", event => {
  const cacheName = workbox.core.cacheNames.runtime
  const preCache = async () => {
    const cache = await caches.open(cacheName)
    return cache.addAll(data)
  }
  event.waitUntil(preCache())
})
self.addEventListener("fetch", event => {
  if (event.request.url.includes("/api/") && !navigator.onLine) {
    event.respondWith(
      caches.match(event.request) || caches.match("/Default/api")
    )
  }
})
