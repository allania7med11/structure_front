export default function({ $axios, store }) {
  $axios.onRequest(config => {
    if (store.state.csrf) {
      config.headers.common["X-CSRFToken"] = store.state.csrf
    }
  })
}
