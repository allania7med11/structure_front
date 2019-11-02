import { Lists } from "./static"
class cOrders {
  chs = {
    Nodes: {
      label: "Nodes",
      name: "nodes"
    },
    Bars: { label: "Bars", name: "bars" },
    Supports: {
      label: "Supports",
      children: {
        Define: {
          label: "Define",
          name: "supports",
          text: "Define Support"
        },
        Apply: {
          label: "Apply",
          name: "supportsApply",
          text: "Apply Support"
        }
      }
    },
    Releases: {
      label: "Releases",
      children: {
        Define: {
          label: "Define",
          name: "releases",
          text: "Define Release"
        },
        Apply: {
          label: "Apply",
          name: "releasesApply",
          text: "Apply Release"
        }
      }
    },
    Materials: { label: "Materials", name: "materials" },
    Sections: {
      label: "Sections",
      children: {
        Define: {
          label: "Define",
          children: Lists.sections.reduce((ac, cv) => {
            ac[cv] = { name: cv, label: cv.replace("_", " ") }
            return ac
          }, {})
        },
        Apply: {
          label: "Apply",
          name: "sectionsApply",
          text: "Apply Section"
        }
      }
    },
    PLs: {
      label: "Point Loads",
      children: {
        Define: {
          label: "Define",
          name: "pls",
          text: "Define PL"
        },
        Apply: {
          label: "Apply",
          name: "plsApply",
          text: "Apply PL"
        }
      }
    },
    DLs: {
      label: "Distributed Loads",
      children: {
        Define: {
          label: "Define",
          children: Lists.dls.reduce((ac, cv) => {
            ac[cv] = { name: cv, label: cv.replace("_", " ") }
            return ac
          }, {})
        },
        Apply: {
          label: "Apply",
          name: "dlsApply",
          text: "Apply DL"
        }
      }
    },
    Nrs: {
      label: "Nodes Results",
      children: {
        Rc: {
          label: "Reactions",
          name: "Rc"
        },
        Dp: {
          label: "Displacements",
          name: "Dp"
        }
      }
    },
    Srs: { label: "Sections Results", name: "srs" },
    Brs: {
      label: "Bars Results",
      children: {
        Rl: {
          label: "Local Forces",
          name: "Rl"
        },
        Rg: {
          label: "Global Forces",
          name: "Rg"
        },
        Ql: {
          label: "Local Displacements",
          name: "Ql"
        },
        Qg: {
          label: "Global Displacements",
          name: "Qg"
        }
      }
    }
  }
  order = [
    "Nodes",
    "Bars",
    { name: "Supports", children: ["Define", "Apply"] },
    { name: "Releases", children: ["Define", "Apply"] },
    "Materials",
    {
      name: "Sections",
      children: [{ name: "Define", children: Lists.sections }, "Apply"]
    },
    { name: "PLs", children: ["Define", "Apply"] },
    {
      name: "DLs",
      children: [{ name: "Define", children: Lists.dls }, "Apply"]
    }
  ]
  dls = ["Uniform_Load", "Trapezoidal_Load", "Self_Weight"]
  nrs = ["Rc", "Dp"]
  brs = ["Rl", "Rg", "Ql", "Qg"]
  dts = ["FX", "FZ", "MY", "Ssup", "Sinf", "UX", "UZ", "RY"]
  orderR(pr) {
    return [
      { name: "Nrs", children: ["Rc", "Dp"] },
      "Srs",
      { name: "Brs", children: ["Rl", "Rg", "Ql", "Qg"] },
      {
        label: "Detailed Analysis",
        id: 3,
        children: pr.bars
          .sort((a, b) => a.name - b.name)
          .map((cv, i) => {
            return {
              label: cv.name,
              name: cv.id,
              id: i,
              children: Lists.dts.map((cv2, i2) => {
                return {
                  label: cv2,
                  id: i2,
                  name: cv2,
                  text: "Detailed Analysis"
                }
              })
            }
          })
      },
      "Nodes",
      "Bars",
      { name: "Supports", children: ["Apply", "Define"] },
      { name: "Releases", children: ["Apply", "Define"] },
      "Materials",
      {
        name: "Sections",
        children: [
          "Apply",
          {
            name: "Define",
            children: Lists.sections.filter(
              tp =>
                !!pr.sections.find(sc => sc.type == tp && sc.bars.length > 0)
            )
          }
        ]
      },
      {
        name: "PLs",
        children: pr.pls.find(cv => cv.nodes.length > 0)
          ? ["Apply", "Define"]
          : ["Apply"]
      },
      {
        name: "DLs",
        children: pr.dls.find(cv => cv.bars.length > 0)
          ? [
              "Apply",
              {
                name: "Define",
                children: Lists.dls.filter(
                  tp => !!pr.dls.find(dl => dl.type == tp && dl.bars.length > 0)
                )
              }
            ]
          : ["Apply"]
      }
    ]
  }
  orderT(pr) {
    return [
      "Nodes",
      "Bars",
      { name: "Supports", children: ["Apply", "Define"] },
      { name: "Releases", children: ["Apply", "Define"] },
      "Materials",
      {
        name: "Sections",
        children: [
          "Apply",
          {
            name: "Define",
            children: Lists.sections.filter(
              tp =>
                !!pr.sections.find(sc => sc.type == tp && sc.bars.length > 0)
            )
          }
        ]
      },
      {
        name: "PLs",
        children: pr.pls.find(cv => cv.nodes.length > 0)
          ? ["Apply", "Define"]
          : ["Apply"]
      },
      {
        name: "DLs",
        children: pr.dls.find(cv => cv.bars.length > 0)
          ? [
              "Apply",
              {
                name: "Define",
                children: Lists.dls.filter(
                  tp => !!pr.dls.find(dl => dl.type == tp && dl.bars.length > 0)
                )
              }
            ]
          : ["Apply"]
      },
      { name: "Nrs", children: ["Rc", "Dp"] },
      "Srs",
      { name: "Brs", children: ["Rl", "Rg", "Ql", "Qg"] },
      {
        label: "Detailed Analysis",
        id: 11,
        children: pr.bars
          .sort((a, b) => a.name - b.name)
          .map((cv, i) => {
            return {
              label: cv.name,
              name: cv.id,
              id: i,
              children: Lists.dts.map((cv2, i2) => {
                return {
                  label: cv2,
                  id: i2,
                  name: cv2,
                  text: "Detailed Analysis"
                }
              })
            }
          })
      }
    ]
  }
  fchs(order) {
    let rs = order.map((cv, i) =>
      typeof cv === "string" || cv instanceof String
        ? { ...this.chs[cv], id: i }
        : cv.label
        ? cv
        : {
            id: i,
            label: this.chs[cv.name].label,
            children: cv.children.map((cv2, i2) =>
              typeof cv2 === "string" || cv2 instanceof String
                ? { ...this.chs[cv.name].children[cv2], id: i2 }
                : {
                    id: i2,
                    label: this.chs[cv.name].children[cv2.name].label,
                    children: cv.children[i2].children.map((cv3, i3) =>
                      Object.assign(
                        this.chs[cv.name].children[cv2.name].children[cv3],
                        {
                          id: i3
                        }
                      )
                    )
                  }
            )
          }
    )
    return rs
  }
  get tbs() {
    return this.fchs(this.order)
  }
  tbsR(pr) {
    let rs = this.fchs(this.orderR(pr))
    return rs
  }
  tbsT(pr) {
    let rs = this.fchs(this.orderT(pr))
    return rs
  }
}

export const Orders = new cOrders()
