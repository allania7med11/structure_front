export default function ({ $axios, redirect,store }) {
    $axios.onRequest(config => {
        if (store.state.csrf) {
            config.headers.common["X-CSRFToken"] = store.state.csrf
          }
    })
  }
  