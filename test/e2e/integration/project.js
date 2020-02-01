/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { user } from "../../env"
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
    cy.project()
    cy.nodes()
    cy.bars()
    cy.applySupport()
    cy.materials()
    cy.Rectangular()
    cy.applySection()
  })
})
