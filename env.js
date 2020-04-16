const Production = true
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
      baseURL: "http://localhost/"
    }
const Test = true
const TestInfo = { user: "user1" }
export { settings, Test, TestInfo }
