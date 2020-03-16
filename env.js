const Production = true
const host = Production ? "0.0.0.0" : "localhost"
const urls = Production
  ? {
      baseURL: "https://effectivewebapp.com/"
    }
  : {
      baseURL: "http://localhost/"
    }
const Test = true
const TestInfo = { user: "user1" }
export { Production, host, urls, Test, TestInfo }