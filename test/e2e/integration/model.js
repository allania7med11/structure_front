/* eslint-disable no-undef */
import { login } from "./auth"
import { project } from "../../env"

const createModel = model => {
  // eslint-disable-next-line no-unused-vars
  const lst = project[model]
  cy.get("tbody>tr:eq(0)>td").should($elms => {
    expect($elms).to.have.length(4)
    expect($elms[1]).to.contain("1")
    expect($elms[2]).to.contain("0")
    expect($elms[3]).to.contain("0")
  })
}

describe("Node", function() {
  it.only("Node", function() {
    cy.visit("/")
    cy.get("[data-cy=login]").click()
    cy.url().should("include", "/accounts/login")
    login()
    cy.get("[data-cy=open]").click()
    cy.url().should("include", "/projects/")
    cy.pause()
    createModel("nodes")
  })
})
