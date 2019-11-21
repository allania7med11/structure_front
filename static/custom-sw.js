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
  const cacheName = workbox.core.cacheNames.runtime
  console.log(cacheName)
  const preCache = async () => {
    const cache = await caches.open(cacheName)
    console.log(event.request)
    const request = new Request("http://localhost/api/projects/21/")
    console.log(request)
    cache.match(request).then(rp => {
      console.log(rp)
      return rp
    })
  }
  if (event.request.url.includes("http://localhost/api/projects/")) {
    event.waitUntil(preCache())
  }
})
