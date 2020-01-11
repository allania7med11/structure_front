export default function({ $axios, app }) {
  $axios.onRequest(config => {
    const token = app.$cookies.get("csrftoken")
    console.log("csrftoken")
    console.log(token)
    if (token) {
      config.headers.common["X-CSRFToken"] = token
    }
  })
}
