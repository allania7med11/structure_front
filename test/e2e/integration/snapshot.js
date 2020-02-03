/* eslint-disable no-undef */
const config = {
  capture: "fullPage",
  failureThreshold: 0.03,
  customDiffConfig: { threshold: 0.1 }
}
const sizes = [["iphone-6", "landscape"], "iphone-6", [1366, 768]]
const pagesSizes = [{ name: "home", url: "/", config: config }]
const pages = [
  { name: "contact", url: "/contact" },
  { name: "Tutorials-Beam", url: "/Tutorials/Beam" },
  { name: "Tutorials-TrussStructure", url: "/Tutorials/TrussStructure" },
  { name: "Tutorials-FrameStructure", url: "/Tutorials/FrameStructure" },
  {
    name: "Tutorials-BeamsInternalHinges",
    url: "/Tutorials/BeamsInternalHinges"
  }
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
