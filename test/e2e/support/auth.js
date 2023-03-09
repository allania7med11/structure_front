/* eslint-disable no-undef */
Cypress.Commands.add("signup", user => {
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
})

Cypress.Commands.add("login", user => {
  cy.get("input[name$='username']")
    .type(user.username)
    .should("have.value", user.username)
  cy.get("input[name$='password']")
    .type(user.password)
    .should("have.value", user.password)
  cy.get("button[type$='submit']").click()
  cy.url().should("include", "/projects/")
})

Cypress.Commands.add("logout", user => {
  cy.contains(user.username).click()
  cy.get("a[href*='/accounts/logout']").click()
  cy.url().should("include", "/accounts/login/")
})

Cypress.Commands.add("delete", () => {
  cy.request("/api/users/delt/").then(resp => {
    expect(resp.status).to.eq(204)
  })
})
