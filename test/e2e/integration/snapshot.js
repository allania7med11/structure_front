/* eslint-disable no-undef */
const config = { capture: "fullPage" }
const sizes = [["iphone-6", "landscape"], "iphone-6", [1366, 768]]
const pagesSizes = [{ name: "home", url: "/", config: config }]
const Tutorials = [
  "Beam",
  "TrussStructure",
  "FrameStructure",
  "BeamsInternalHinges"
]
const pages = [
  { name: "signup", url: "/accounts/signup/" },
  { name: "login", url: "/accounts/login/" },
  { name: "contact", url: "/contact" },
  ...Tutorials.map(cv => {
    return { name: `Tutorials-${cv}`, url: `/Tutorials/${cv}` }
  })
]
const pagesChart = [
  ...Tutorials.map(cv => {
    return { name: `Full_Project-${cv}`, url: `/Full_Project?name=${cv}` }
  })
]
describe("Visual regression tests with sizes", () => {
  sizes.forEach(size => {
    pagesSizes.forEach(page => {
      it(`Match previous screenshot ${page.name} Page When ${size} resolution`, () => {
        cy.setResolution(size)
        cy.visit(`${page.url}`)
        cy.wait(1000)
        cy.matchImageSnapshot(`${page.name}--${size}`, config)
      })
    })
  })
})
describe("Visual regression tests", () => {
  pages.forEach(page => {
    it(`Match previous screenshot ${page.name} Page `, () => {
      cy.setResolution([1366, 768])
      cy.visit(`${page.url}`)
      cy.wait(1000)
      cy.matchImageSnapshot(`${page.name}`, config)
    })
  })
})
describe("Visual regression tests with chart", () => {
  pagesChart.forEach(page => {
    it(`Match previous screenshot ${page.name} Page `, () => {
      cy.setResolution([1366, 768])
      cy.visit(`${page.url}`)
      cy.get("[data-cy=chart]").should("be.visible")
      cy.wait(1000)
      cy.matchImageSnapshot(`${page.name}`, config)
    })
  })
})
