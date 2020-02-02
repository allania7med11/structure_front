class cLists {
  uniques = ["nodes", "bars", "supports", "releases", "materials", "pls", "srs"]
  applys = [
    "supportsApply",
    "releasesApply",
    "sectionsApply",
    "plsApply",
    "dlsApply"
  ]
  sections = [
    "Rectangular",
    "Rectangular_Hollow",
    "Circular",
    "Circular_Hollow",
    "T_Section",
    "I_Section",
    "Custom"
  ]
  dls = ["Uniform_Load", "Trapezoidal_Load", "Self_Weight"]
  nrs = ["Rc", "Dp"]
  brs = ["Rl", "Rg", "Ql", "Qg"]
  dts = ["FX", "FZ", "MY", "UX", "UZ", "RY", "Ssup", "Sinf"]
  get dtsChildren() {
    const fn = (lst, st) =>
      lst.map((cv2, i2) => {
        return {
          label: cv2,
          id: st + i2,
          name: cv2,
          text: "Detailed Analysis"
        }
      })
    const rtn = [{ header: "NTM" }, { divider: true }]
    Array.prototype.push.apply(rtn, fn(["FX", "FZ", "MY"], 0))
    Array.prototype.push.apply(rtn, [
      { header: "Deformations" },
      { divider: true }
    ])
    Array.prototype.push.apply(rtn, fn(["UX", "UZ", "RY"], 3))
    Array.prototype.push.apply(rtn, [{ header: "Stresses" }, { divider: true }])
    Array.prototype.push.apply(rtn, fn(["Ssup", "Sinf"], 6))
    console.log(rtn)
    return rtn
  }
  get all() {
    return [
      "nodes",
      "bars",
      "supports",
      "releases",
      "materials",
      ...this.sections,
      "pls",
      ...this.dls,
      ...this.applys,
      ...this.nrs,
      "srs",
      ...this.brs
    ]
  }
}
const Lists = new cLists()
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
      label: "Point",
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
      label: "Distributed",
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
    { header: "Structure" },
    "Nodes",
    "Bars",
    { name: "Supports", children: ["Define", "Apply"] },
    { name: "Releases", children: ["Define", "Apply"] },
    "Materials",
    {
      name: "Sections",
      children: [{ name: "Define", children: Lists.sections }, "Apply"]
    },
    { header: "Loads" },
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
      { header: "Results" },
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
      { header: "Structure" },
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
      { header: "Loads" },
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
      { header: "Structure" },
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
      { header: "Loads" },
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
    console.log("this.chs", this.chs)
    let chs = this.chs
    let i = -1
    let rtn = []
    order.forEach(function(cv) {
      // eslint-disable-next-line no-prototype-builtins
      if (cv.hasOwnProperty("header")) {
        Array.prototype.push.apply(rtn, [cv, { divider: true }])
      } else {
        i = i + 1
        let add
        if (typeof cv === "string" || cv instanceof String) {
          add = { ...chs[cv], id: i }
        } else if (cv.label) {
          add = cv
        } else {
          add = {
            id: i,
            label: chs[cv.name].label,
            children: cv.children.map((cv2, i2) =>
              typeof cv2 === "string" || cv2 instanceof String
                ? { ...chs[cv.name].children[cv2], id: i2 }
                : {
                    id: i2,
                    label: chs[cv.name].children[cv2.name].label,
                    children: cv.children[i2].children.map((cv3, i3) =>
                      Object.assign(
                        chs[cv.name].children[cv2.name].children[cv3],
                        {
                          id: i3
                        }
                      )
                    )
                  }
            )
          }
        }
        rtn.push(add)
      }
    })
    console.log("rtn", rtn)
    return rtn
  }
  get tbs() {
    return this.fchs(this.order)
  }
  tbsR(pr) {
    let rs = this.fchs(this.orderR(pr))
    console.log(rs)
    return rs
  }
  tbsT(pr) {
    let rs = this.fchs(this.orderT(pr))
    return rs
  }
}

const Orders = new cOrders()
console.log("Orders.tbs", Orders.tbs)
