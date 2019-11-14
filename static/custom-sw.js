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
  console.log("data", data)
  const cacheName = workbox.core.cacheNames.runtime
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(data)))
})
