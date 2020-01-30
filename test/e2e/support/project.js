/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { project } from "../../env"
Cypress.Commands.add("project", () => {
  cy.log("create Project")
  cy.get("[data-cy=newItem]").click()
  cy.get("[data-cy=name]")
    .type(project["name"])
    .should("have.value", project["name"])
  cy.get("[data-cy=save]").click()
  cy.get("[data-cy=open]").click()
  cy.get("[data-cy=project]").should("contain", project["name"])
  cy.url().should("match", new RegExp(/projects\/\d+/g))
  cy.get("[data-cy=sc]").click()
  cy.log("create Project successful")
})
const select=(fld,vl) => {
  const slc = ".v-select__selection"
  cy.get(`${slc}s:has([data-cy=${fld}])`).click()
  cy.get(`.v-list-item__title:contains(${vl}):visible`).click()  
  cy.get(`${slc}s:has([data-cy=${fld}])>${slc}`).should("contain", vl)
}
Cypress.Commands.add("nodes", () => {
  const model = "nodes"
  const name = "Nodes"
  cy.log(`create ${model}`)
  select("sl1",name)
  cy.scrollTo('top')
  cy.get("[data-cy=sc]").should("contain", name)
  const lst = project[model]
  const flds = ["name", "X", "Z"]
  if (lst.length > 0) {
    cy.get("[data-cy=newItem]").click()
    lst.forEach(elm => {
      let search = ""
      flds.forEach((fld, id) => {
        cy.get(`[data-cy=${fld}]`)
          .clear()
          .type(elm[fld])
          .should("have.value", String(elm[fld]))
        search = search + `:has(td:eq(${id + 1}):contains(${String(elm[fld])}))`
      })
      cy.get("[data-cy=save]").click()
      cy.get(`tbody>tr${search}>td`).should("have.length", flds.length + 1)
    })
    cy.log(`create ${model} successful`)
  }
})

Cypress.Commands.add("bars", () => {
  const model = "bars"
  const name = "Bars"
  cy.log(`create ${model}`)
  select("sl1",name)
  cy.scrollTo('top')
  cy.get("[data-cy=sc]").should("contain", name)
  cy.pause()
  const lst = project[model]
  const flds = ["name", "N1", "N2"]
  const selects = ["N1", "N2"]
  if (lst.length > 0) {
    cy.get("[data-cy=newItem]").click()
    lst.forEach(elm => {
      let search = ""
      cy.get(`[data-cy=name]`)
        .clear()
        .type(elm["name"])
        .should("have.value", String(elm["name"]))
      search = search + `:has(td:eq(1):contains(${String(elm["name"])}))`
      selects.forEach((fld, id) => {
        select(fld,elm[fld]["name"])
        search =
          search + `:has(td:eq(${id + 2}):contains(${elm[fld]["name"]}))`
        })
      cy.get("[data-cy=save]").click()
      cy.get(`tbody>tr${search}>td`).should("have.length", flds.length + 1)
    })
    cy.log(`create ${model} successful`)
  }
})
Cypress.Commands.add("applySupport", () => {
  const model = "supports"
  const name = "Apply Support"
  const mdl = "Supports"
  const action = "Apply"
  cy.log(`apply ${model}`)
  select("sl1",mdl)
  select("sl2",action)
  cy.scrollTo('top')
  cy.get("[data-cy=sc]").should("contain", name)
  const lst = project[model].filter(cv => cv.nodes.length > 0)
  const flds = ["name", "nodes"]
  if (lst.length > 0) {
    cy.get("[data-cy=applyItem]").click()
    lst.forEach(elm => {
      let search = ""
      select("name",elm["name"])
      search =
          search + `:has(td:eq(0):contains(${elm["name"]}))`
      const nodes = elm.nodes.map(cv => cv.name ).join()
      cy.get(`[data-cy=nodes]`)
        .clear()
        .type(nodes)
        .should("have.value", nodes)
      search =search + `:has(td:eq(1):contains(${nodes}))`
      cy.get("[data-cy=apply]").click()
      cy.get(`tbody>tr${search}>td`).should("have.length", flds.length)
    })
    cy.log(`create ${model} successful`)
  }
})