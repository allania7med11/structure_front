import { settings } from "@/env"
export default async function({ store, redirect, route }) {
  await store.dispatch("project/reset")
  const test = await store.dispatch("project/aProject", { id: route.query.id })
  if (!test) {
    return redirect(settings.baseURL + "projects")
  }
}
