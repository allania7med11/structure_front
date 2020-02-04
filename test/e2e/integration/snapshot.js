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
  }),
  ...Tutorials.map(cv => {
    return { name: `Full_Project-${cv}`, url: `/Full_Project/${cv}` }
  })
]
describe("Visual regression tests with sizes", () => {
  sizes.forEach(size => {
    pagesSizes.forEach(page => {
      it(`Match previous screenshot ${page.name} Page When ${size} resolution`, () => {
        cy.setResolution(size)
        cy.visit(`${page.url}`)
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
      cy.matchImageSnapshot(`${page.name}`, config)
    })
  })
})
