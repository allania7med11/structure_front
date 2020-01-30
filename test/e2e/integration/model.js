/* eslint-disable no-undef */
import { login } from "./auth"

describe("Node", function() {
  it.only("Node", function() {
    cy.visit("/")
    cy.get("[data-cy=login]").click()
    cy.url().should("include", "/accounts/login")
    login()
    cy.get("[data-cy=open]").click()
    // eslint-disable-next-line prettier/prettier, no-useless-escape
    cy.url().should("match", new RegExp(/projects\/\d+/g))
  })
})
