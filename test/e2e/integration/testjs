/* eslint-disable no-undef */
import { project } from "../../env"
describe("Project", function() {
  it.only("Project", function() {
    cy.visit("/accounts/login")
    cy.login({ username: "user2", password: "Ahmed.va.2000" })
    cy.get("[data-cy=open]").click()
    cy.get("[data-cy=project]").should("contain", project["name"])
    cy.url().should("match", new RegExp(/projects\/\d+/g))
    cy.get("[data-cy=results]").click()
    cy.get("[data-cy=sc]", { timeout: 10000 }).should("contain", "Reactions")
    cy.get("[data-cy=sc]").click()
    cy.Dtan()
  })
})
