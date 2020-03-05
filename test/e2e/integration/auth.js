/* eslint-disable no-undef */
import { user } from "../../env"
describe("Auth", function() {
  before(function() {
    cy.visit("/")
    cy.delete()
    cy.clearCookies()
  })
  after(function() {
    cy.visit("/")
    cy.delete()
    cy.clearCookies()
  })
  it("Sign up", function() {
    cy.visit("/")
    cy.get("[data-cy=signup]").click()
    cy.url().should("include", "/accounts/signup")
    cy.signup(user)
    cy.logout(user)
  })
  it("Login", function() {
    cy.visit("/")
    cy.get("[data-cy=login]").click()
    cy.url().should("include", "/accounts/login")
    cy.login(user)
  })
})
