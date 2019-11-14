import { search } from "./search"
const express = require("express")
const app = express()

app.get("/test", (req, res) => {
  search()
    .then(cv => res.json({ data: cv }))
    .catch(e => res.json({ error: e }))
})

module.exports = {
  path: "apiCl",
  handler: app
}
