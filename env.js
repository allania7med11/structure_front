const settings = {
  prd: process.env.ENVIRONMENT != "dev",
  dir: process.env.GENERATE_DIR || "structure_front",
  frontendUrl: process.env.FRONTEND_URL || "",
  backendUrl: process.env.BACKEND_URL || ""
}
const Test = true
const TestInfo = { user: "user1" }
console.log("settings", settings)
export { settings, Test, TestInfo }
