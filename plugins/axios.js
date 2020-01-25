export default function({ $axios, app }) {
  $axios.onRequest(config => {
    const token = app.$cookies.get("csrftoken")
    if (token) {
      config.headers.common["X-CSRFToken"] = token
    }
  })
}
