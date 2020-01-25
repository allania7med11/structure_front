const Docker = false
const host = Docker ? "0.0.0.0" : "localhost"
const urls = Docker
  ? { baseURL: "http://server", browserBaseURL: "http://localhost" }
  : {
      baseURL: "http://localhost",
      browserBaseURL: "http://localhost"
    }
const Test = true
const TestInfo = { user: "user1" }
export { host, urls, Test, TestInfo }
