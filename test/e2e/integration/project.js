/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const config = { capture: "fullPage" }
import { user, project } from "../../env"
describe("Project", function() {
  before(function() {
    cy.visit("/")
    cy.delete()
  })
  after(function() {
    cy.visit("/")
    cy.delete()
  })
  it.only("Project", function() {
    cy.get("[data-cy=signup]").click()
    cy.url().should("include", "/accounts/signup")
    cy.signup(user)
    cy.setResolution([1366, 768])
    cy.matchImageSnapshot(`projects-${user.username}-init`, config)
    cy.project()
    cy.matchImageSnapshot(`project-${project["name"]}-init`, config)
    cy.nodes()
    cy.bars()
    cy.applySupport()
    cy.materials()
    cy.Rectangular()
    cy.applySection()
    cy.Uniform_Load()
    cy.applyDls()
    cy.matchImageSnapshot(`project-${project["name"]}-end-modify`, config)
    cy.get("[data-cy=results]").click()
    cy.get("[data-cy=sc]", { timeout: 20000 }).should("contain", "Reactions")
    cy.Rc()
    cy.Dp()
    cy.Dtan()
  })
})
