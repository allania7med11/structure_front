/* eslint-disable no-console */
import { required, integer, minValue } from "vuelidate/lib/validators";
import { sections, dls, applys, test } from "./static2";
import { Infs } from "./Infs2";
import { Flds } from "./Flds2";
var unique = function(self, args) {
  return value =>
    !self.project[args["from"]].find(cv =>
      cv.id != self.editedIndex ? cv.name == value : false
    );
};
var uniqueXZ = function(self) {
  return () =>
    !self.project["nodes"].find(cv =>
      cv.id != self.editedIndex
        ? cv.X == self.editedItem.X && cv.Z == self.editedItem.Z
        : false
    );
};
var uniqueN12 = function(self) {
  return () =>
    !self.project["bars"].find(cv =>
      cv.id != self.editedIndex
        ? cv.N1.id == self.$v.editedItem.N1.$model &&
          cv.N2.id == self.$v.editedItem.N2.$model
        : false
    );
};
var notSameN12 = function(self) {
  return () => self.editedItem.N1 != self.editedItem.N2;
};
let dvld = (name, cv) => {
  return Flds[name][cv].type === "checkbox" ? {} : { required };
};
var fVld = function(name, obj) {
  let err = Infs[name].flds.reduce((ac, cv) => {
    ac[cv] = test(obj, cv, dvld(name, cv));
    return ac;
  }, {});
  return err;
};
var fSVld = function(self, name) {
  return {
    name: {
      required,
      unique: unique(self, { from: "sections" })
    },
    ...sections[name].features.reduce((ac, cv) => {
      ac[cv] = { required, min0: value => value > 0 };
      return ac;
    }, {})
  };
};

export const Vlds = {
  nodes: self => {
    return fVld("nodes", {
      name: {
        required,
        integer,
        min0: value => value > 0,
        unique: unique(self, { from: "nodes" })
      },
      X: {
        required,
        uniqueXZ: uniqueXZ(self)
      },
      Z: {
        required,
        uniqueXZ: uniqueXZ(self)
      }
    });
  },
  bars: self => {
    return fVld("bars", {
      name: {
        required,
        integer,
        min0: value => value > 0,
        unique: unique(self, { from: "bars" })
      },
      N1: {
        required,
        notSameN12: notSameN12(self),
        uniqueN12: uniqueN12(self)
      },
      N2: {
        required,
        notSameN12: notSameN12(self),
        uniqueN12: uniqueN12(self)
      }
    });
  },
  supports: self => {
    return fVld("supports", {
      name: {
        required,
        unique: unique(self, { from: "supports" })
      }
    });
  },
  releases: self => {
    return fVld("releases", {
      name: {
        required,
        unique: unique(self, { from: "releases" })
      }
    });
  },
  materials: self => {
    return fVld("materials", {
      name: {
        required,
        unique: unique(self, { from: "materials" })
      },
      YM: {
        required,
        min0: value => value > 0
      },
      Density: {
        required,
        min: minValue(0)
      }
    });
  },
  ...sections.List.reduce((ac, cv) => {
    ac[cv] = self => {
      return fVld(cv, fSVld(self, cv));
    };
    return ac;
  }, {}),
  pls: self => {
    return fVld("pls", {
      name: {
        required,
        unique: unique(self, { from: "pls" })
      }
    });
  },
  ...dls.List.reduce((ac, cv) => {
    ac[cv] = self => {
      return fVld(cv, {
        name: { required, unique: unique(self, { from: "dls" }) }
      });
    };
    return ac;
  }, {}),
  ...applys.List.reduce((ac, cv) => {
    ac[cv] = () => {
      return fVld(cv, {});
    };
    return ac;
  }, {})
};
