/* eslint-disable no-undef */
import { user } from "../../env"
const signup = () => {
  cy.get("input[name$='username']")
    .type(user.username)
    .should("have.value", user.username)
  cy.get("input[name$='email']")
    .type(user.email)
    .should("have.value", user.email)
  cy.get("input[name$='password1']")
    .type(user.password)
    .should("have.value", user.password)
  cy.get("input[name$='password2']")
    .type(user.password)
    .should("have.value", user.password)
  cy.get("button[type$='submit']").click()
  cy.url().should("include", "/projects/")
}
const logout = () => {
  cy.contains(user.username).click()
  cy.get("a[href*='/accounts/logout']").click()
  cy.url().should("include", "/accounts/login")
}
const login = () => {
  cy.get("input[name$='username']")
    .type(user.username)
    .should("have.value", user.username)
  cy.get("input[name$='password']")
    .type(user.password)
    .should("have.value", user.password)
  cy.get("button[type$='submit']").click()
  cy.url().should("include", "/projects/")
}
describe("Auth", function() {
  before(function() {
    cy.visit("/")
    cy.request("/api/users/delt/").then(resp => {
      expect(resp.status).to.eq(204)
    })
  })
  after(function() {
    cy.visit("/")
    cy.request("/api/users/delt/").then(resp => {
      expect(resp.status).to.eq(204)
    })
  })
  it("Sign up", function() {
    cy.visit("/")
    cy.get("[data-cy=signup]").click()
    cy.url().should("include", "/accounts/signup")
    signup()
    logout()
  })
  it("Login", function() {
    cy.visit("/")
    cy.get("[data-cy=login]").click()
    cy.url().should("include", "/accounts/login")
    login()
  })
})

export { signup, login }
