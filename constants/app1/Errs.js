/* eslint-disable no-console */
import { Lists, Groups } from "./static"
import { help } from "./help"
import { Infs } from "./Infs"
import { Flds } from "./Flds"

let derr = (self, name, cv) => {
  return Flds[name][cv].type === "checkbox"
    ? () => []
    : () => {
        const errors = []
        if (!self.$v.editedItem[cv].$dirty) return errors
        !self.$v.editedItem[cv].required && errors.push("Field is required")
        return errors
      }
}
var fErr = function(self, name, obj) {
  let err = Infs[name].flds.reduce((ac, cv) => {
    ac[cv] = help.test(obj, cv, derr(self, name, cv))
    return ac
  }, {})
  return err
}
var fSErr = function(self, name) {
  return {
    name: () => {
      const errors = []
      if (!self.$v.editedItem.name.$dirty) return errors
      !self.$v.editedItem.name.required && errors.push("Field is required")
      !self.$v.editedItem.name.unique &&
        errors.push("Section with this name already exist.")
      return errors
    },
    ...Groups.sections[name].features.reduce((ac, cv) => {
      ac[cv] = () => {
        const errors = []
        if (!self.$v.editedItem[cv].$dirty) return errors
        !self.$v.editedItem[cv].required && errors.push("Field is required")
        !self.$v.editedItem[cv].min0 &&
          errors.push("Ensure this value is greater than 0")
        return errors
      }
      return ac
    }, {})
  }
}
var fDErr = function(self) {
  return {
    name: () => {
      const errors = []
      if (!self.$v.editedItem.name.$dirty) return errors
      !self.$v.editedItem.name.required && errors.push("Field is required")
      !self.$v.editedItem.name.unique &&
        errors.push("Distributed Load with this name already exist.")
      return errors
    }
  }
}
const Errs = {
  nodes: self => {
    return fErr(self, "nodes", {
      name: () => {
        const errors = []
        if (!self.$v.editedItem.name.$dirty) return errors
        !self.$v.editedItem.name.required && errors.push("Field is required")
        !self.$v.editedItem.name.integer &&
          errors.push("Ensure this value is an integer")
        !self.$v.editedItem.name.min0 &&
          errors.push("Ensure this value is greater than 0")
        !self.$v.editedItem.name.unique &&
          errors.push("Node with this name already exist.")
        return errors
      },
      X: () => {
        const errors = []
        if (self.$v.editedItem.Z.$dirty) {
          !self.$v.editedItem.Z.uniqueXZ &&
            errors.push("Node with those X and Z already exist.")
        }
        if (!self.$v.editedItem.X.$dirty) return errors
        !self.$v.editedItem.X.required && errors.push("Field is required")
        !self.$v.editedItem.X.uniqueXZ &&
          errors.push("Node with those X and Z already exist.")
        return errors
      },
      Z: () => {
        const errors = []
        if (self.$v.editedItem.X.$dirty) {
          !self.$v.editedItem.X.uniqueXZ && errors.push("")
        }
        if (!self.$v.editedItem.Z.$dirty) return errors
        !self.$v.editedItem.Z.required && errors.push("Field is required")
        !self.$v.editedItem.Z.uniqueXZ && errors.push("")
        return errors
      }
    })
  },
  bars: self => {
    return fErr(self, "bars", {
      name: () => {
        const errors = []
        if (!self.$v.editedItem.name.$dirty) return errors
        !self.$v.editedItem.name.required && errors.push("Field is required")
        !self.$v.editedItem.name.integer &&
          errors.push("Ensure this value is an integer")
        !self.$v.editedItem.name.min0 &&
          errors.push("Ensure this value is greater than 0")
        !self.$v.editedItem.name.unique &&
          errors.push("Bar with this name already exist.")
        return errors
      },
      N1: () => {
        const errors = []
        if (self.$v.editedItem.N2.$dirty) {
          !self.$v.editedItem.N2.notSameN12 &&
            errors.push("Bar can't have the same N1 and N2")
          !self.$v.editedItem.N2.uniqueN12 &&
            errors.push("Bar with those N1 and N2 already exist.")
        }
        if (!self.$v.editedItem.N1.$dirty) return errors
        !self.$v.editedItem.N1.required && errors.push("Field is required")
        !self.$v.editedItem.N1.notSameN12 &&
          errors.push("Bar can't have the same N1 and N2")
        !self.$v.editedItem.N1.uniqueN12 &&
          errors.push("Bar with those N1 and N2 already exist.")
        return errors
      },
      N2: () => {
        const errors = []
        if (self.$v.editedItem.N1.$dirty) {
          !self.$v.editedItem.N1.notSameN12 && errors.push("")
          !self.$v.editedItem.N1.uniqueN12 && errors.push("")
        }
        if (!self.$v.editedItem.N2.$dirty) return errors
        !self.$v.editedItem.N2.required && errors.push("Field is required")
        !self.$v.editedItem.N2.notSameN12 && errors.push("")
        !self.$v.editedItem.N2.uniqueN12 && errors.push("")

        return errors
      }
    })
  },
  supports: self => {
    return fErr(self, "supports", {
      name: () => {
        const errors = []
        if (!self.$v.editedItem.name.$dirty) return errors
        !self.$v.editedItem.name.required && errors.push("Field is required")
        !self.$v.editedItem.name.unique &&
          errors.push("Support with this name already exist.")
        return errors
      }
    })
  },
  releases: self => {
    return fErr(self, "releases", {
      name: () => {
        const errors = []
        if (!self.$v.editedItem.name.$dirty) return errors
        !self.$v.editedItem.name.required && errors.push("Field is required")
        !self.$v.editedItem.name.unique &&
          errors.push("Releases with this name already exist.")
        return errors
      }
    })
  },
  materials: self => {
    return fErr(self, "materials", {
      name: () => {
        const errors = []
        if (!self.$v.editedItem.name.$dirty) return errors
        !self.$v.editedItem.name.required && errors.push("Field is required")
        !self.$v.editedItem.name.unique &&
          errors.push("Material with this name already exist.")
        return errors
      },
      YM: () => {
        const errors = []
        if (!self.$v.editedItem.YM.$dirty) return errors
        !self.$v.editedItem.YM.required && errors.push("Field is required")
        !self.$v.editedItem.YM.min0 &&
          errors.push("Ensure this value is greater than 0")
        return errors
      },
      Density: () => {
        const errors = []
        if (!self.$v.editedItem.Density.$dirty) return errors
        !self.$v.editedItem.Density.required && errors.push("Field is required")
        !self.$v.editedItem.Density.min &&
          errors.push("Ensure this value is positive")
        return errors
      }
    })
  },
  ...Lists.sections.reduce((ac, cv) => {
    ac[cv] = self => {
      return fErr(self, cv, fSErr(self, cv))
    }
    return ac
  }, {}),
  pls: self => {
    return fErr(self, "pls", {
      name: () => {
        const errors = []
        if (!self.$v.editedItem.name.$dirty) return errors
        !self.$v.editedItem.name.required && errors.push("Field is required")
        !self.$v.editedItem.name.unique &&
          errors.push("Point Load with this name already exist.")
        return errors
      }
    })
  },
  ...Lists.dls.reduce((ac, cv) => {
    ac[cv] = self => {
      return fErr(self, cv, fDErr(self))
    }
    return ac
  }, {}),
  ...Lists.applys.reduce((ac, cv) => {
    ac[cv] = self => {
      return fErr(self, cv, {})
    }
    return ac
  }, {})
}

export { Errs }
