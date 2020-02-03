const test = {
  computed: {
    cypress() {
      if (process.client) {
        const isCypress = typeof window.Cypress !== "undefined"
        return isCypress
      }
      return false
    }
  }
}
export { test }
