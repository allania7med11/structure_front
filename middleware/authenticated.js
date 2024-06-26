export default async function({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.username) {
    await store.dispatch("login")
  }
  if (!store.state.username) {
    return redirect("/accounts/login/")
  }
}
