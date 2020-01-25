/* eslint-disable no-undef */
import { signup } from "./auth"
import { user, project } from "../../env"
const createProject = () => {
  cy.get("[data-cy=newItem]").click()
  cy.get("[data-cy=name]")
    .type(project["name"])
    .should("have.value", user.project)
  cy.get("[data-cy=save]").click()
  cy.log("create Project successful")
}
const createModel = model => {
  const lst = project[model]
  if (lst.length > 0) {
    cy.get("[data-cy=newItem]").click()
    lst.forEach(elm => {
      cy.get("[data-cy=name]")
        .clear()
        .type(elm["name"])
        .should("have.value", String(elm["name"]))
      cy.get("[data-cy=X]")
        .clear()
        .type(elm["X"])
        .should("have.value", String(elm["X"]))
      cy.get("[data-cy=Z]")
        .clear()
        .type(elm["Z"])
        .should("have.value", String(elm["Z"]))
      cy.get("[data-cy=save]").click()
      cy.get("tbody>tr:eq(0)>td").should($elms => {
        expect($elms).to.have.length(4)
        expect($elms[1]).to.contain(String(elm["name"]))
        expect($elms[2]).to.contain(String(elm["X"]))
        expect($elms[3]).to.contain(String(elm["Z"]))
      })
    })
    cy.log(`create ${model} successful`)
  }
}

describe("Project", function() {
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
  it.only("Project", function() {
    cy.get("[data-cy=signup]").click()
    cy.url().should("include", "/accounts/signup")
    signup()
    createProject()
    cy.get("[data-cy=open]").click()
    cy.url().should("include", "/projects/")
    cy.pause()
    createModel("nodes")
  })
})
