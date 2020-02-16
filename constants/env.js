const Production = false
const host = Production ? "0.0.0.0" : "localhost"
const urls = Production
  ? {
      baseURL: "http://unix:/run/gunicornfull.sock",
      browserBaseURL: "https://legacy.effectivewebapp.com/"
    }
  : {
      baseURL: "http://localhost",
      browserBaseURL: "http://localhost"
    }
const Test = true
const TestInfo = { user: "user1" }
export { host, urls, Test, TestInfo }
