import { settings } from "@/env"
export default async function({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.username) {
    await store.dispatch("login")
  }
  if (!store.state.username) {
    return redirect(settings.baseURL + "accounts/login")
  }
}
