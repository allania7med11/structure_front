import { Groups, Lists, Statics } from "./static"
import { help } from "./help"
export const groupF = {
  applys: function(name) {
    let obj = {}
    const apply = Groups.applys[name]
    obj["name"] = {
      text: "Name",
      value: "name",
      type: "select",
      from: apply.model
    }
    obj[apply.from] = {
      text: "List of " + apply.from,
      value: apply.from,
      type: "text"
    }
    if (apply.type) {
      obj["type"] = { text: "type", value: "type", type: "text" }
    }
    return obj
  },
  sections: function(name) {
    const section = Groups.sections[name]
    return {
      name: { text: "Name", value: "name", type: "text" },
      material: {
        text: "material",
        value: "material",
        type: "select",
        from: "materials"
      },
      ...help.test(section, "fltp", []).reduce((ac, cv) => {
        ac[cv.name] = cv
        return ac
      }, {}),
      image: section.image ? section.image : undefined,
      ...section.features.reduce((ac, cv) => {
        ac[cv] = {
          text: cv + section.unites[cv].lb,
          value: cv,
          type: "number"
        }
        return ac
      }, {})
    }
  },
  dls: function(name) {
    const dl = Groups.dls[name]
    return {
      name: { text: "Name", value: "name", type: "text" },
      ...help.test(dl, "fltp", []).reduce((ac, cv) => {
        ac[cv.name] = cv
        return ac
      }, {}),
      Axes: dl.flds.includes("Axes")
        ? {
            name: "Axes",
            text: "Axes",
            value: "Axes",
            type: "select",
            chs: [
              { name: "Global", id: "G" },
              { name: "Local", id: "L" }
            ]
          }
        : undefined,
      ...dl.features.reduce((ac, cv) => {
        ac[cv] = {
          text: cv + dl.unites[cv].lb,
          value: cv,
          type: "number"
        }
        return ac
      }, {})
    }
  },
  nrs: function(name) {
    const nr = Groups.nrs[name]
    return {
      name: { text: "Name", value: "name", type: "text" },
      ...nr.features.reduce((ac, cv) => {
        ac[cv] = {
          text: cv + nr.unites[cv].lb,
          value: cv,
          type: "number"
        }
        return ac
      }, {})
    }
  },
  brs: function(name) {
    const br = Groups.brs[name]
    return {
      name: { text: "Name", value: "name", type: "text" },
      nodes: { text: "Nodes", value: "nodes", type: "text" },
      ...br.features.reduce((ac, cv) => {
        ac[cv] = {
          text: cv + br.unites[cv].lb,
          value: cv,
          type: "number"
        }
        return ac
      }, {})
    }
  }
}

export const Flds = {
  nodes: {
    name: { text: "Name", value: "name", type: "number" },
    X: { text: "X[m]", value: "X", type: "number" },
    Z: { text: "Z[m]", value: "Z", type: "number" }
  },
  bars: {
    name: { text: "Name", value: "name", type: "number" },
    N1: {
      text: "N1",
      value: "N1",
      type: "select",
      from: "nodes"
    },
    N2: { text: "N2", value: "N2", type: "select", from: "nodes" }
  },
  supports: {
    name: { text: "Name", value: "name", type: "text" },
    UX: { text: "UX", value: "UX", type: "checkbox" },
    UZ: { text: "UZ", value: "UZ", type: "checkbox" },
    RY: { text: "RY", value: "RY", type: "checkbox" }
  },
  releases: {
    name: { text: "Name", value: "name", type: "text" },
    ...["UX", "UZ", "RY", "UX1", "UZ1", "RY1", "UX2", "UZ2", "RY2"].reduce(
      (ac, cv) => {
        ac[cv] = { text: cv, value: cv, type: "checkbox" }
        return ac
      },
      {}
    )
  },
  materials: {
    name: { text: "Name", value: "name", type: "text" },
    YM: { text: "E[MPa]", value: "YM", type: "number" },
    Density: {
      text: "Density[KN/m3]",
      value: "Density",
      type: "number"
    }
  },
  ...Lists.sections.reduce((ac, cv) => {
    ac[cv] = groupF.sections(cv)
    return ac
  }, {}),
  pls: {
    name: { text: "Name", value: "name", type: "text" },
    FX: { text: "FX[KN]", value: "FX", type: "number" },
    FZ: { text: "FZ[KN]", value: "FZ", type: "number" },
    CY: { text: "CY[KN*m]", value: "CY", type: "number" }
  },
  ...Lists.dls.reduce((ac, cv) => {
    ac[cv] = groupF.dls(cv)
    return ac
  }, {}),
  ...Lists.applys.reduce((ac, cv) => {
    ac[cv] = groupF.applys(cv)
    return ac
  }, {}),
  ...Lists.nrs.reduce((ac, cv) => {
    ac[cv] = groupF.nrs(cv)
    return ac
  }, {}),
  srs: {
    name: { text: "Name", value: "name", type: "text" },
    type: { text: "Type", value: "type", type: "text" },
    ...Statics.srs.fltp.reduce((ac, cv) => {
      ac[cv.name] = cv
      return ac
    }, {})
  },
  ...Lists.brs.reduce((ac, cv) => {
    ac[cv] = groupF.brs(cv)
    return ac
  }, {})
}
