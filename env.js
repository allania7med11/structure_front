const Production = false
const settings = Production
  ? {
      prd: true,
      dir: "dist",
      host: "0.0.0.0",
      baseURL: "https://effectivewebapp.com/"
    }
  : {
      prd: false,
      dir: "distLocal",
      host: "localhost",
      baseURL: "http://localhost:2000/"
    }
const Test = true
const TestInfo = { user: "user1" }
export { settings, Test, TestInfo }
