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
  const vlg = typeof vl === "string"? vl.replace(/\s/g, ''): vl
  cy.get(`${slc}s:has([data-cy=${fld}])`).click()
  cy.get(`.v-list-item:has([data-cy=${vlg}]):visible`).click() 
  cy.get(`${slc}s:has([data-cy=${fld}])>${slc}`).should("contain", vl)
  cy.scrollTo('top')
}
Cypress.Commands.add("nodes", () => {
  const model = "nodes"
  const name = "Nodes"
  cy.log(`create ${model}`)
  select("sl1",name)
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
  cy.get("[data-cy=sc]").should("contain", name)
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

Cypress.Commands.add("materials", () => {
  const model = "materials"
  const name = "Materials"
  cy.log(`create ${model}`)
  select("sl1",name)
  cy.get("[data-cy=sc]").should("contain", name)
  const lst = project[model].filter(cv => cv.project.id !== "1")
  const flds = ["name", "YM", "Density"]
  if (lst.length > 0) {
    cy.get("[data-cy=newItem]").click()
    lst.forEach(elm => {
      let search = ""
      cy.get(`[data-cy=name]`)
        .clear()
        .type(elm["name"])
        .should("have.value", String(elm["name"]))
      search = search + `:has(td:eq(1):contains(${elm["name"]}))`
      cy.get(`[data-cy=YM]`)
          .clear()
          .type(elm["YM"])
          .should("have.value", String(elm["YM"]))
      search = search + `:has(td:eq(2):contains(${String(elm["YM"])}))`
      cy.get(`[data-cy=Density]`)
          .clear()
          .type(elm["Density"]*10**3)
          .should("have.value", String(elm["Density"]*10**3))
      search = search + `:has(td:eq(3):contains(${String(elm["Density"]*10**3)}))`
      cy.get("[data-cy=save]").click()
      cy.get(`tbody>tr${search}>td`).should("have.length", flds.length + 1)
    })
    cy.log(`create ${model} successful`)
  }
})

Cypress.Commands.add("Rectangular", () => {
  const model = "sections"
  const name = "Rectangular"
  const mdl = "Sections"
  const typ = "Rectangular"
  cy.log(`create ${name}`)
  select("sl1",mdl)
  select("sl3",typ)
  cy.get("[data-cy=sc]").should("contain", name)
  const lst = project[model].filter(cv => cv.type === typ)
  const flds = ["name", "material", "b", "h"]
  const nbrs = ["b", "h"]
  if (lst.length > 0) {
    cy.get("[data-cy=newItem]").click()
    lst.forEach(elm => {
      let search = ""
      cy.get(`[data-cy=name]`)
        .clear()
        .type(elm["name"])
        .should("have.value", String(elm["name"]))
      search = search + `:has(td:eq(1):contains(${elm["name"]}))`
      select("material",elm["material"]["name"])
      search =
        search + `:has(td:eq(2):contains(${elm["material"]["name"]}))`
      const features = JSON.parse(elm.features)
      nbrs.forEach((fld, id) => {
        const vl = features[fld]*10**2
        cy.get(`[data-cy=${fld}]`)
          .clear()
          .type(vl)
          .should("have.value", String(vl))
        search = search + `:has(td:eq(${id + 3}):contains(${String(vl)}))`
      })
      cy.get("[data-cy=save]").click()
      cy.get(`tbody>tr${search}>td`).should("have.length", flds.length + 1)
    })
    cy.log(`create ${name} successful`)
  }
})