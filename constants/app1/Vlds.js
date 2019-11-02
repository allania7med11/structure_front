/* eslint-disable no-console */
import { required, integer, minValue } from "vuelidate/lib/validators"
import { Lists, Groups } from "./static"
import { help } from "./help"
import { Infs } from "./Infs"
import { Flds } from "./Flds"
const vldsF = {
  unique: function(self, args) {
    return value =>
      !self.project[args["from"]].find(cv =>
        cv.id != self.editedIndex ? cv.name == value : false
      )
  },
  uniqueXZ: function(self) {
    return () =>
      !self.project["nodes"].find(cv =>
        cv.id != self.editedIndex
          ? cv.X == self.editedItem.X && cv.Z == self.editedItem.Z
          : false
      )
  },
  uniqueN12: function(self) {
    return () =>
      !self.project["bars"].find(cv =>
        cv.id != self.editedIndex
          ? cv.N1.id == self.$v.editedItem.N1.$model &&
            cv.N2.id == self.$v.editedItem.N2.$model
          : false
      )
  },
  notSameN12: function(self) {
    return () => self.editedItem.N1 != self.editedItem.N2
  }
}

let dvld = (name, cv) => {
  return Flds[name][cv].type === "checkbox" ? {} : { required }
}
var fVld = function(name, obj) {
  let err = Infs[name].flds.reduce((ac, cv) => {
    ac[cv] = help.test(obj, cv, dvld(name, cv))
    return ac
  }, {})
  return err
}
var fSVld = function(self, name) {
  return {
    name: {
      required,
      unique: vldsF.unique(self, { from: "sections" })
    },
    ...Groups.sections[name].features.reduce((ac, cv) => {
      ac[cv] = { required, min0: value => value > 0 }
      return ac
    }, {})
  }
}

const Vlds = {
  nodes: self => {
    return fVld("nodes", {
      name: {
        required,
        integer,
        min0: value => value > 0,
        unique: vldsF.unique(self, { from: "nodes" })
      },
      X: {
        required,
        uniqueXZ: vldsF.uniqueXZ(self)
      },
      Z: {
        required,
        uniqueXZ: vldsF.uniqueXZ(self)
      }
    })
  },
  bars: self => {
    return fVld("bars", {
      name: {
        required,
        integer,
        min0: value => value > 0,
        unique: vldsF.unique(self, { from: "bars" })
      },
      N1: {
        required,
        notSameN12: vldsF.notSameN12(self),
        uniqueN12: vldsF.uniqueN12(self)
      },
      N2: {
        required,
        notSameN12: vldsF.notSameN12(self),
        uniqueN12: vldsF.uniqueN12(self)
      }
    })
  },
  supports: self => {
    return fVld("supports", {
      name: {
        required,
        unique: vldsF.unique(self, { from: "supports" })
      }
    })
  },
  releases: self => {
    return fVld("releases", {
      name: {
        required,
        unique: vldsF.unique(self, { from: "releases" })
      }
    })
  },
  materials: self => {
    return fVld("materials", {
      name: {
        required,
        unique: vldsF.unique(self, { from: "materials" })
      },
      YM: {
        required,
        min0: value => value > 0
      },
      Density: {
        required,
        min: minValue(0)
      }
    })
  },
  ...Lists.sections.reduce((ac, cv) => {
    ac[cv] = self => {
      return fVld(cv, fSVld(self, cv))
    }
    return ac
  }, {}),
  pls: self => {
    return fVld("pls", {
      name: {
        required,
        unique: vldsF.unique(self, { from: "pls" })
      }
    })
  },
  ...Lists.dls.reduce((ac, cv) => {
    ac[cv] = self => {
      return fVld(cv, {
        name: { required, unique: vldsF.unique(self, { from: "dls" }) }
      })
    }
    return ac
  }, {}),
  ...Lists.applys.reduce((ac, cv) => {
    ac[cv] = () => {
      return fVld(cv, {})
    }
    return ac
  }, {})
}

export { Vlds }
