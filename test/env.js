const user = {
  username: "user1",
  email: "user1@gmail.com",
  password: "Ahmed.va.2000",
  project: "project 1"
}
import * as data from "./json/Beam.json"
const project = data["Beam"]
const mds = {
  nodes: { flds: ["name", "X", "Z"] },
  bars: { flds: ["name", "N1", "N2"] }
}
export { user, project, mds }
