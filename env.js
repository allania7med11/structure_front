const Production = false
const settings = Production
  ? {
      prd: true,
      dir: "structure_front",
      host: "0.0.0.0",
      baseURL: "https://structure.effectivewebapp.com/"
    }
  : {
      prd: false,
      dir: "structure_front",
      host: "localhost",
      baseURL: "http://localhost:2010/"
    }
const Test = true
const TestInfo = { user: "user1" }
export { settings, Test, TestInfo }
