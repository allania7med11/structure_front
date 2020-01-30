const isCypress = typeof window.Cypress !== "undefined"

export default ({ store }) => {
  if (isCypress) {
    window.store = store
  }
}
