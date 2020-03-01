export default function({ $axios, app }) {
  $axios.onRequest(config => {
    console.log("token")
    const token = app.$cookies.get("csrftoken")
    console.log(token)
    if (token) {
      config.headers.common["X-CSRFToken"] = token
    }
  })
}
