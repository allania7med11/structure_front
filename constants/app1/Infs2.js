/* eslint-disable no-console */
import { sections, dls, applys, nrs, srs, brs, mds } from "./static2";
import { Flds } from "./Flds2";
const math = require("mathjs");
export let idt = x => x;
let testArray = (x,id) => (Array.isArray(x) ? x[id] : x);
var Dsvalue={
  bl:(x,id) => testArray(x,id) ? "check" : "times",
  name : (x,id) => testArray(x,id).name ,
  unite : (value) => (x,id) => testArray(x,id)*value ,
  idt : (x,id) =>  x[id],

}
const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
var fInf = function(obj) {
  if (!obj.hasOwnProperty("fldsT")) {
    obj["fldsT"] = obj["flds"];
  }
  obj["tbhs"] = obj["fldsT"].map(cv => Flds[obj.name][cv]);
  if (!obj.hasOwnProperty("fmhs")) {
    obj["fmhs"] = [obj["flds"].map(x => [Flds[obj.name][x]])];
  } else {
    obj["fmhs"] = obj["fmhs"].map(cv =>
      cv.map(cv2 => cv2.map(cv3 => Flds[obj.name][cv3]))
    );
  }
  let di = obj["flds"].reduce((ac, cv) => {
    ac[cv] = Flds[obj.name][cv].type === "checkbox" ? false : null;
    return ac;
  }, {});
  if (!obj.hasOwnProperty("defaultItem")) {
    obj["defaultItem"] = di;
  } else {
    obj["defaultItem"] = Object.assign({}, di, obj["defaultItem"]);
  }
  /* let ds = obj["fldsT"].reduce((ac, cv) => {
    ac[cv] = idt;
    return ac;
  }, {}); */
  if (!obj.hasOwnProperty("ds")) {
    obj["ds"] = {};
  } else {
    obj["ds"] = Object.assign({}, obj["ds"]);
  }
  if (mds[obj.name].action === "define") {
    if (!obj.hasOwnProperty("fe")) {
      obj["fe"] = item =>
        obj.flds.reduce((ac, vl) => {
          ac[vl] = item[vl];
          return ac;
        }, {});
    }
    if (!obj.hasOwnProperty("fm")) {
      obj["fm"] = idt;
    }
    let name = capitalize(mds[obj.name].model.slice(0, -1));
    obj["create"] = {
      mutation: "create" + name,
      type: "Create" + name + "Input!"
    };
    obj["update"] = {
      mutation: "update" + name,
      type: "Update" + name + "Input!"
    };
  } else if (mds[obj.name].action === "apply") {
    let model = mds[obj.name].model;
    let from = mds[obj.name].from;
    obj["mt"] = vl => {
      return {
        project: vl.project,
        lst: vl[from],
        action: vl.action,
      };
    };
    obj["flt"] = vl => {
      return vl.filter(cv => cv[from].length > 0);
    };
  }
  return obj;
};
var gftr = (obj, cv, vl) =>{
  console.log(JSON.parse(cv.features),vl,JSON.parse(cv.features)["PX"])
  return math.round(obj.unites[vl].vl *JSON.parse(cv.features)[vl], obj.unites[vl].rd)
}
  
var fSrsInf = function(obj) {
  obj["tbhs"] = obj["fldsT"].map(cv => Flds[obj.name][cv]);
  obj["flt"] = vl =>
    vl.map(cv => {
      return {
        id: cv.id,
        name: cv.name,
        type: cv.type,
        ...obj.fltp.reduce((ac, Gp) => {
          ac[Gp.name] = Gp.gp
            .map(fld =>
              String(
                math.round(obj.unites[fld].vl * cv[fld], obj.unites[fld].rd)
              )
            )
            .join("<br>");
          return ac;
        }, {})
      };
    });
  obj["fltR"] = vl => {
    return vl.filter(cv => cv["bars"].length > 0);
  };
  let ds = obj["fldsT"].reduce((ac, cv) => {
    ac[cv] = idt;
    return ac;
  }, {});
  if (!obj.hasOwnProperty("ds")) {
    obj["ds"] = ds;
  } else {
    obj["ds"] = Object.assign({}, ds, obj["ds"]);
  }
  return obj;
};
var fSInf = function(obj) {
  if (!obj.hasOwnProperty("fltp")) {
    obj["flt"] = vl =>
      vl
        .filter(cv => cv.type == obj.name)
        .map(cv => {
          return {
            project: cv.project,
            id: cv.id,
            name: cv.name,
            material: cv.material.name,
            ...obj.features.reduce((ac, vl) => {
              ac[vl] = gftr(obj, cv, vl);
              return ac;
            }, {})
          };
        });
  } else {
    obj["flt"] = vl =>
      vl
        .filter(cv => cv.type == obj.name)
        .map(cv => {
          return {
            project: cv.project,
            id: cv.id,
            name: cv.name,
            material: cv.material.name,
            ...obj.fltp.reduce((ac, vl) => {
              ac[vl.name] = vl.gp.map(cv2 => gftr(obj, cv, cv2));
              return ac;
            }, {})
          };
        });
    obj["ds"] =obj.fltp.reduce((ac, vl) => {
          ac[vl.name] = vl.gp.map(() => {return {type:"idt",value:Dsvalue.idt} });
          return ac;
        }, {})
  }

  obj["fe"] = item => {
    return {
      name: item.name,
      material: item.material,
      ...obj.features.reduce((ac, vl) => {
        ac[vl] = math.round(obj.unites[vl].vl * JSON.parse(item.features)[vl],obj.unites[vl].rd);
        return ac;
      }, {})
    };
  };
  obj["fm"] = item => {
    return {
      name: item.name,
      material: item.material,
      type: obj.name,
      /* features: obj.features.reduce((ac, vl) => {
          ac[vl] = item[vl] / obj.unites[vl].vl;
          return ac;
        }, {}
      ), */
      features: JSON.stringify(
        obj.features.reduce((ac, vl) => {
          ac[vl] = item[vl] / obj.unites[vl].vl;
          return ac;
        }, {})
      )
    };
  };
  obj["fltR"] = vl => {
    return vl.filter(cv => cv["bars"].length > 0);
  };
  return obj;
};
var fDInf = function(obj) {
  if (!obj.hasOwnProperty("fltp")) {
    obj["flt"] = vl =>
      vl
        .filter(cv => cv.type == obj.name)
        .map(cv => {
          return {
            project:cv.project,
            id: cv.id,
            name: cv.name,
            Axes: cv.Axes,
            ...obj.features.reduce((ac, vl) => {
              ac[vl] = gftr(obj, cv, vl);
              return ac;
            }, {})
          };
        });
  } else {
    obj["flt"] = vl =>
      vl
        .filter(cv => cv.type == obj.name)
        .map(cv => {
          return {
            project:cv.project,
            id: cv.id,
            name: cv.name,
            Axes: cv.Axes,
            ...obj.fltp.reduce((ac, vl) => {
              ac[vl.name] = vl.gp.map(cv2 => gftr(obj, cv, cv2));
              return ac;
            }, {})
          };
        });
    obj["ds"] =obj.fltp.reduce((ac, vl) => {
          ac[vl.name] = vl.gp.map(() => {return {type:"idt",value:Dsvalue.idt} });
          return ac;
        }, {})
  }

  obj["fe"] = item => {
    return {
      name: item.name,
      Axes: item.Axes,
      ...obj.features.reduce((ac, vl) => {
        ac[vl] = obj.unites[vl].vl * JSON.parse(item.features)[vl];
        return ac;
      }, {})
    };
  };
  obj["fm"] = item => {
    return {
      name: item.name,
      Axes: item.Axes ? item.Axes : "G",
      type: obj.name,
      features: JSON.stringify(
        obj.features.reduce((ac, vl) => {
          ac[vl] = item[vl] / obj.unites[vl].vl;
          return ac;
        }, {})
      )
    };
  };
  obj["fltR"] = vl => {
    return vl.filter(cv => cv["bars"].length > 0);
  };
  return obj;
};
var fAInf = function(obj) {
  obj["flds"] = ["name", obj.from];
  obj["ds"] = {};
  if (obj.type) {
    obj["fldsT"] = ["name", "type", obj.from];
    obj["ds"]["type"] = [{type:"aaa",value:(x,id) => testArray(x,id).replace("_", " ")}];
  }
  obj["ds"][obj.from] = [{
    type:"list",value:x => {
      return x.map(a => a.name).sort((a, b) => a - b).join(",")
    }
  }];
  return obj;
};
function frd(x, rd) {
  return parseFloat(x.toFixed(rd)).toString();
}
var rstr = (value, tr) => frd(value * tr.vl, tr.rd);
var fNInf = function(obj) {
  obj["tbhs"] = obj["flds"].map(cv => Flds[obj.name][cv]);
  obj["flt"] = vl =>
    vl.map(cv => {
      return {
        id: cv.id,
        name: cv.name,
        ...obj.features.reduce((ac, vl, i) => {
          ac[vl] = rstr(cv[obj.name][i], obj.unites[vl]);
          return ac;
        }, {})
      };
    });
  let ds = obj["flds"].reduce((ac, cv) => {
    ac[cv] = idt;
    return ac;
  }, {});
  if (!obj.hasOwnProperty("ds")) {
    obj["ds"] = ds;
  } else {
    obj["ds"] = Object.assign({}, ds, obj["ds"]);
  }
  return obj;
};
var fBInf = function(obj) {
  obj["tbhs"] = obj["flds"].map(cv => Flds[obj.name][cv]);
  obj["flt"] = vl =>
    vl.map(cv => {
      return {
        id: cv.id,
        name: cv.name,
        nodes: `${cv.N1.name}<br>${cv.N2.name}`,
        ...obj.fltp.reduce((ac, vl) => {
          ac[vl.name] = vl.gp
            .map(cv2 => rstr(cv[obj.name][cv2], obj.unites[vl.name]))
            .join("<br>");
          return ac;
        }, {})
      };
    });
  let ds = obj["flds"].reduce((ac, cv) => {
    ac[cv] = idt;
    return ac;
  }, {});
  if (!obj.hasOwnProperty("ds")) {
    obj["ds"] = ds;
  } else {
    obj["ds"] = Object.assign({}, ds, obj["ds"]);
  }
  return obj;
};
export const Infs = {
  nodes: fInf({
    name: "nodes",
    flds: ["name", "X", "Z"],
  }),
  bars: fInf({
    name: "bars",
    flds: ["name", "N1", "N2"],
    ds: { N1: [{type:"name",value:Dsvalue.name}], N2: [{type:"name",value:Dsvalue.name}] }
  }),
  supports: fInf({
    name: "supports",
    flds: ["name", "UX", "UZ", "RY"],
    ds: { UX: [{type:"bl",value:Dsvalue.bl}], 
          UZ: [{type:"bl",value:Dsvalue.bl}], 
          RY: [{type:"bl",value:Dsvalue.bl}] },
    fltR: vl => {
      return vl.filter(cv => cv["nodes"].length > 0);
    }
  }),
  releases: fInf({
    name: "releases",
    flds: ["name", "UX1", "UZ1", "RY1", "UX2", "UZ2", "RY2"],
    fldsT: ["name", "UX", "UZ", "RY"],
    fmhs: [[["name"], ["UX1", "UX2"], ["UZ1", "UZ2"], ["RY1", "RY2"]]],
    ds: { UX: [{type:"bl",value:Dsvalue.bl},{type:"bl",value:Dsvalue.bl}], 
          UZ: [{type:"bl",value:Dsvalue.bl},{type:"bl",value:Dsvalue.bl}], 
          RY: [{type:"bl",value:Dsvalue.bl},{type:"bl",value:Dsvalue.bl}] },
    flt: vl =>
      vl.map(cv => {
        return {
          id: cv.id,
          name: cv.name,
          project: cv.project,
          UX: [cv.UX1, cv.UX2],
          UZ: [cv.UZ1, cv.UZ2],
          RY: [cv.RY1, cv.RY2]
        };
      }),
    fltR: vl => {
      return vl.filter(cv => cv["bars"].length > 0);
    }
  }),
  materials: fInf({
    name: "materials",
    flds: ["name", "YM", "Density"],
    defaultItem: { Density: 0 },
    ds: { Density: [{ type:"unite",value:Dsvalue.unite(10**3)}] },
    fe: item => {
      return {
        name: item.name,
        Density: item.Density * 10 ** 3,
        YM: item.YM
      };
    },
    fm: item => Object.assign({}, item, { Density: item.Density / 10 ** 3 }),
    fltR: vl => vl.filter(cv => !!cv["sections"].find(cv => cv.bars.length > 0))
  }),
  ...sections.List.reduce((ac, cv) => {
    ac[cv] = fInf(fSInf(sections[cv]));
    return ac;
  }, {}),
  pls: fInf({
    name: "pls",
    flds: ["name", "FX", "FZ", "CY"],
    defaultItem: ["FX", "FZ", "CY"].reduce((ac, cv) => {
      ac[cv] = 0;
      return ac;
    }, {}),
    ds: ["FX", "FZ", "CY"].reduce((ac, cv) => {
      ac[cv] = [{ type:"unite",value:Dsvalue.unite(10**3)}];
      return ac;
    }, {}),
    fe: item => {
      return {
        name: item.name,
        ...["FX", "FZ", "CY"].reduce((ac, vl) => {
          ac[vl] = item[vl] * 10 ** 3;
          return ac;
        }, {})
      };
    },
    fm: item =>
      Object.assign(
        {},
        item,
        ["FX", "FZ", "CY"].reduce((ac, cv) => {
          ac[cv] = item[cv] / 10 ** 3;
          return ac;
        }, {})
      ),
    fltR: vl => {
      return vl.filter(cv => cv["nodes"].length > 0);
    }
  }),
  ...dls.List.reduce((ac, cv) => {
    ac[cv] = fInf(fDInf(dls[cv]));
    return ac;
  }, {}),
  ...applys.List.reduce((ac, cv) => {
    ac[cv] = fInf(fAInf(applys[cv]));
    return ac;
  }, {}),
  ...nrs.List.reduce((ac, cv) => {
    ac[cv] = fNInf(nrs[cv]);
    return ac;
  }, {}),
  srs: fSrsInf(srs),
  ...brs.List.reduce((ac, cv) => {
    ac[cv] = fBInf(brs[cv]);
    return ac;
  }, {})
};
