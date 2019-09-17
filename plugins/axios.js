export default function ({ $axios, redirect,store }) {
    $axios.onRequest(config => {
        console.log({token:store.state.csrf})
        if (store.state.csrf) {
            config.headers.common["X-CSRFToken"] = store.state.csrf
          }
    })
  
    /* $axios.onError(error => {
      const code = parseInt(error.response && error.response.status)
      console.log({error:error})
      if (code === 500) {
        redirect('/projects')
      }
    }) */
  }
  