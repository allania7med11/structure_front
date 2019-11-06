/* eslint-disable no-undef */
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}

workbox.routing.registerRoute(
  new RegExp("/.*"),
  new workbox.strategies.NetworkFirst()
)
