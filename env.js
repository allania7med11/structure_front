const FRONTEND_URL = process.env.FRONTEND_URL || ""

const settings = {
  prd: process.env.ENVIRONMENT != "dev",
  dir: process.env.GENERATE_DIR || "structure_front",
  frontendUrl: FRONTEND_URL,
  backendUrl: process.env.BACKEND_URL || FRONTEND_URL
}
const Test = true
const TestInfo = { user: "user1" }
export { settings, Test, TestInfo }
