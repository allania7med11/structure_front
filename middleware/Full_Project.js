import { urls } from "@/env"
export default async function({ store, route, redirect }) {
  await store.dispatch("project/reset")
  const name = route.query.name
  const test = await store.dispatch("aTutorial", name)
  if (test) {
    store.dispatch("project/reset")
    store.dispatch("project/projectChange", { state: "pages", value: false })
    store.dispatch("project/projectChange", {
      state: "project",
      value: store.state.tutorials[name]
    })
    store.dispatch("project/projectChange", { state: "page", value: "results" })
  } else {
    return redirect(urls.baseURL)
  }
}
