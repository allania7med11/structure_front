const Production = false
const host = Production ? "0.0.0.0" : "localhost"
const urls = Production
  ? {
      baseURL: "https://effectivewebapp.com/",
      browserBaseURL: "https://effectivewebapp.com/"
    }
  : {
      baseURL: "http://localhost:8000"
    }
const Test = false
const TestInfo = { user: "user1" }
export { host, urls, Test, TestInfo }
