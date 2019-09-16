/* eslint-disable no-console */
export const query = `{
  id,name,nodes{id,name,X,Z,Support{name},pls{name},N1{name},N2{name},Rc,Dp},
  bars{id,name,N1{id,name,X,Z},N2{id,name,X,Z},Release{name},Section{name,type},dls{name,type},
       L,Rl,Rg,Ql,Qg,EF,DP,S,EFm,DPm,Sm},
  supports{id,name,UX,UZ,RY,nodes{id,name}},
  releases{id,name,UX1,UZ1,RY1,UX2,UZ2,RY2,bars{id,name}},materials{id,name,YM,Density,sections{name,bars{name}}}
  sections{id,name,material{id,name},type,features,bars{id,name},Ax,Iy,H,Cy},
  pls{id,name,FX,FZ,CY,nodes{id,name}},
  dls{id,name,Axes,type,features,bars{id,name}},
}`;
export const us_query=`{name,projects{id,name}}`;

export const test = function(obj, key, df) {
  if (obj.hasOwnProperty(key)) {
    return obj[key];
  }
  return df;
};
export const Units = {
  deg: { lb: "[Deg]", vl: 180 / Math.PI, rd: 5 },
  m: { lb: "[m]", vl: 1, rd: 5 },
  mm: { lb: "[mm]", vl: 10 ** 3, rd: 5 },
  cm: { lb: "[cm]", vl: 10 ** 2, rd: 5 },
  cm2: { lb: "[cm2]", vl: 10 ** 4, rd: 5 },
  cm4: { lb: "[cm4]", vl: 10 ** 8, rd: 5 },
  KNpm: { lb: "[KN/m]", vl: 10 ** 3, rd: 5 },
  KN_mpm: { lb: "[KN*m/m]", vl: 10 ** 3, rd: 5 },
  KN: { lb: "[KN]", vl: 10 ** 3, rd: 5 },
  KN_m: { lb: "[KN*m]", vl: 10 ** 3, rd: 5 },
  MPa: { lb: "[MPa]", vl: 1, rd: 5 },
  none: { lb: "", vl: 1, rd: 5 }
};
export const sections = {
  List: [
    "Rectangular",
    "Rectangular_Hollow",
    "Circular",
    "Circular_Hollow",
    "T_Section",
    "I_Section",
    "Custom"
  ],
  Rectangular: {
    image: { src: "Rectangular", height: "150", type: "image" },
    name: "Rectangular",
    features: ["b", "h"],
    unites: ["b", "h"].reduce((ac, cv) => {
      ac[cv] = Units["cm"];
      return ac;
    }, {}),
    flds: ["name", "material", "b", "h"],
    fmhs: [[["name"], ["material"]], [["b", "h"], ["image"]]]
  },
  Rectangular_Hollow: {
    image: {
      src: "Rectangular_Hollow",
      height: "150",
      type: "image"
    },
    name: "Rectangular_Hollow",
    features: ["b", "h", "t"],
    unites: ["b", "h", "t"].reduce((ac, cv) => {
      ac[cv] = Units["cm"];
      return ac;
    }, {}),
    flds: ["name", "material", "b", "h", "t"],
    fltp: [
      { name: "b_h", gp: ["b", "h"], text: "b[cm]<br>h[cm]", value: "b_h" },
      {
        name: "t",
        gp: ["t"],
        text: "t[cm]",
        value: "t"
      }
    ],
    fldsT: ["name", "material", "b_h", "t"],
    fmhs: [[["name"], ["material"]], [["b", "h", "t"], ["image"]]]
  },
  Circular: {
    image: { src: "Circular", height: "100", type: "image" },
    name: "Circular",
    features: ["d"],
    unites: { d: Units["cm"] },
    flds: ["name", "material", "d"],
    fmhs: [[["name"], ["material"]], [["d"], ["image"]]]
  },
  Circular_Hollow: {
    image: { src: "Circular_Hollow", height: "150", type: "image" },
    name: "Circular_Hollow",
    features: ["d", "t"],
    unites: ["d", "t"].reduce((ac, cv) => {
      ac[cv] = Units["cm"];
      return ac;
    }, {}),
    flds: ["name", "material", "d", "t"],
    fmhs: [[["name"], ["material"]], [["d", "t"], ["image"]]]
  },
  T_Section: {
    image: { src: "T_Section", height: "150", type: "image" },
    name: "T_Section",
    features: ["b", "tf", "tw", "hw"],
    unites: ["b", "tf", "tw", "hw"].reduce((ac, cv) => {
      ac[cv] = Units["cm"];
      return ac;
    }, {}),
    flds: ["name", "material", "b", "tf", "tw", "hw"],
    fltp: [
      { name: "b_tw", gp: ["b", "tw"], text: "b[cm]<br>tw[cm]", value: "b_tw" },
      {
        name: "tf_hw",
        gp: ["tf", "hw"],
        text: "tf[cm]<br>hw[cm]",
        value: "tf_hw"
      }
    ],
    fldsT: ["name", "material", "b_tw", "tf_hw"],
    fmhs: [[["name"], ["material"]], [["b", "tw"], ["tf", "hw"], ["image"]]]
  },
  I_Section: {
    image: { src: "I_Section", height: "150", type: "image" },
    name: "I_Section",
    features: ["b1", "tf1", "tw", "hw", "b2", "tf2"],
    unites: ["b1", "tf1", "tw", "hw", "b2", "tf2"].reduce((ac, cv) => {
      ac[cv] = Units["cm"];
      return ac;
    }, {}),
    flds: ["name", "material", "b1", "tf1", "tw", "hw", "b2", "tf2"],
    fltp: [
      {
        name: "b1_tw_b2",
        gp: ["b1", "tw", "b2"],
        text: "b1[cm]<br>tw[cm]<br>b2[cm]",
        value: "b1_tw_b2"
      },
      {
        name: "tf1_hw_tf2",
        gp: ["tf1", "hw", "tf2"],
        text: "tf1[cm]<br>hw[cm]<br>tf2[cm]",
        value: "tf1_hw_tf2"
      }
    ],
    fldsT: ["name", "material", "b1_tw_b2", "tf1_hw_tf2"],
    fmhs: [
      [["name"], ["material"]],
      [["b1", "tw", "b2"], ["tf1", "hw", "tf2"], ["image"]]
    ]
  },
  Custom: {
    name: "Custom",
    features: ["Ax", "Cy", "Iy", "H"],
    unites: {
      Ax: Units["cm2"],
      Cy: Units["cm"],
      Iy: Units["cm4"],
      H: Units["cm"]
    },
    flds: ["name", "material", "Ax", "Cy", "Iy", "H"],
    fltp: [
      {
        name: "Ax_Iy",
        gp: ["Ax", "Iy"],
        text: "Ax[cm4]<br>Iy[cm8]",
        value: "Ax_Iy"
      },
      {
        name: "Cy_H",
        gp: ["Cy", "H"],
        text: "Cy[cm]<br>H[cm]",
        value: "Cy_H"
      }
    ],
    fldsT: ["name", "material", "Ax_Iy", "Cy_H"],
    fmhs: [[["name", "material"], ["Ax", "Iy"], ["Cy", "H"]]]
  }
};
export const dls = {
  List: ["Uniform_Load", "Trapezoidal_Load", "Self_Weight"],
  Uniform_Load: {
    name: "Uniform_Load",
    features: ["PX", "PZ", "MY"],
    unites: { PX: Units["KNpm"], PZ: Units["KNpm"], MY: Units["KN_mpm"] },
    flds: ["name", "Axes", "PX", "PZ", "MY"],
    ds: { Axes: vl => (vl === "G" ? "Global" : "Local") },
    defaultItem: {
      Axes: "G",
      ...["PX", "PZ", "MY"].reduce((ac, cv) => {
        ac[cv] = 0;
        return ac;
      }, {})
    },
    Axes: {
      name: "Axes",
      text: "Axes",
      value: "Axes",
      type: "select",
      chs: [{ name: "Global", id: "G" }, { name: "Local", id: "L" }]
    },
    fmhs: [[["name"], ["Axes"]], [["PX"], ["PZ"], ["MY"]]]
  },
  Trapezoidal_Load: {
    name: "Trapezoidal_Load",
    features: ["PX1", "PZ1", "MY1", "PX2", "PZ2", "MY2"],
    unites: {
      ...["PX1", "PZ1", "PX2", "PZ2"].reduce((ac, cv) => {
        ac[cv] = Units["KNpm"];
        return ac;
      }, {}),
      MY1: Units["KN_mpm"],
      MY2: Units["KN_mpm"]
    },
    flds: ["name", "Axes", "PX1", "PZ1", "MY1", "PX2", "PZ2", "MY2"],
    fltp: [
      {
        name: "PX",
        gp: ["PX1", "PX2"],
        text: "PX[KN/m]",
        value: "PX"
      },
      {
        name: "PZ",
        gp: ["PZ1", "PZ2"],
        text: "PZ[KN/m]",
        value: "PZ"
      },
      {
        name: "MY",
        gp: ["MY1", "MY2"],
        text: "MY[KN*m/m]",
        value: "MY"
      }
    ],
    fldsT: ["name", "Axes", "PX", "PZ", "MY"],
    ds: { Axes: vl => (vl === "G" ? "Global" : "Local") },
    defaultItem: {
      Axes: "G",
      ...["PX1", "PZ1", "MY1", "PX2", "PZ2", "MY2"].reduce((ac, cv) => {
        ac[cv] = 0;
        return ac;
      }, {})
    },
    Axes: {
      name: "Axes",
      text: "Axes",
      value: "Axes",
      type: "select",
      chs: [{ name: "Global", id: "G" }, { name: "Local", id: "L" }]
    },
    fmhs: [
      [["name"], ["Axes"]],
      [["PX1"], ["PZ1"], ["MY1"]],
      [["PX2"], ["PZ2"], ["MY2"]]
    ]
  },
  Self_Weight: {
    name: "Self_Weight",
    features: ["Factor"],
    unites: { Factor: Units["none"] },
    flds: ["name", "Factor"],
    defaultItem: { Factor: 1 }
  }
};
export const nrs = {
  List: ["Rc", "Dp"],
  Rc: {
    name: "Rc",
    features: ["FX", "FZ", "CY"],
    unites: {
      FX: Units["KN"],
      FZ: Units["KN"],
      CY: Units["KN_m"]
    },
    flds: ["name", "FX", "FZ", "CY"],
    fltR: vl => {
      return vl.filter(cv => cv["Support"].name != "None");
    }
  },
  Dp: {
    name: "Dp",
    features: ["UX", "UZ", "RY"],
    unites: {
      UX: Units["mm"],
      UZ: Units["mm"],
      RY: Units["deg"]
    },
    flds: ["name", "UX", "UZ", "RY"]
  }
};
export const brs = {
  List: ["Rl", "Rg", "Ql", "Qg"],
  ...["Rl", "Rg"].reduce((ac, cv) => {
    ac[cv] = {
      name: cv,
      features: ["nodes", "FX", "FZ", "CY"],
      unites: {
        nodes: Units["none"],
        FX: Units["KN"],
        FZ: Units["KN"],
        CY: Units["KN_m"]
      },
      flds: ["name", "nodes", "FX", "FZ", "CY"],
      fltp: [
        {
          name: "FX",
          gp: [0, 3],
          text: "FX[KN]",
          value: "FX"
        },
        {
          name: "FZ",
          gp: [1, 4],
          text: "FZ[KN]",
          value: "FZ"
        },
        {
          name: "CY",
          gp: [2, 5],
          text: "CY[KN*m]",
          value: "CY"
        }
      ]
    };
    return ac;
  }, {}),
  ...["Ql", "Qg"].reduce((ac, cv) => {
    ac[cv] = {
      name: cv,
      features: ["nodes", "UX", "UZ", "RY"],
      unites: {
        nodes: Units["none"],
        UX: Units["mm"],
        UZ: Units["mm"],
        RY: Units["deg"]
      },
      flds: ["name", "nodes", "UX", "UZ", "RY"],
      fltp: [
        {
          name: "UX",
          gp: [0, 3],
          text: "UX[mm]",
          value: "UX"
        },
        {
          name: "UZ",
          gp: [1, 4],
          text: "UZ[mm]",
          value: "UZ"
        },
        {
          name: "RY",
          gp: [2, 5],
          text: "RY[deg]",
          value: "RY"
        }
      ]
    };
    return ac;
  }, {})
};
export const srs = {
  name: "srs",
  features: ["Ax", "Cy", "Iy", "H"],
  unites: {
    Ax: Units["cm2"],
    Cy: Units["cm"],
    Iy: Units["cm4"],
    H: Units["cm"]
  },
  flds: ["name", "type", "Ax", "Cy", "Iy", "H"],
  fltp: [
    {
      name: "Ax_Iy",
      gp: ["Ax", "Iy"],
      text: "Ax[cm4]<br>Iy[cm8]",
      value: "Ax_Iy"
    },
    {
      name: "Cy_H",
      gp: ["Cy", "H"],
      text: "Cy[cm]<br>H[cm]",
      value: "Cy_H"
    }
  ],
  fldsT: ["name", "type", "Ax_Iy", "Cy_H"]
};
export const dts = {
  List: ["FX", "FZ", "MY", "Ssup", "Sinf", "UX", "UZ", "RY"],
  ...["FX", "FZ"].reduce((ac, cv) => {
    ac[cv] = {
      name: cv,
      unite: Units["KN"],
      from: "EF",
      max: "EFm"
    };
    return ac;
  }, {}),
  MY: {
    name: "MY",
    unite: Units["KN_m"],
    from: "EF",
    max: "EFm"
  },
  ...["Ssup", "Sinf"].reduce((ac, cv) => {
    ac[cv] = {
      name: cv,
      unite: Units["MPa"],
      from: "S",
      max: "Sm"
    };
    return ac;
  }, {}),
  ...["UX", "UZ"].reduce((ac, cv) => {
    ac[cv] = {
      name: cv,
      unite: Units["mm"],
      from: "DP",
      max: "DPm"
    };
    return ac;
  }, {}),
  RY: {
    name: "RY",
    unite: Units["deg"],
    from: "DP",
    max: "DPm"
  }
};

export const applys = {
  List: [
    "supportsApply",
    "releasesApply",
    "sectionsApply",
    "plsApply",
    "dlsApply"
  ],
  supportsApply: {
    name: "supportsApply",
    model: "supports",
    action: "apply",
    from: "nodes"
  },
  releasesApply: {
    name: "releasesApply",
    model: "releases",
    action: "apply",
    from: "bars"
  },
  sectionsApply: {
    name: "sectionsApply",
    model: "sections",
    action: "apply",
    from: "bars",
    type: true
  },
  plsApply: {
    name: "plsApply",
    model: "pls",
    action: "apply",
    from: "nodes"
  },
  dlsApply: {
    name: "dlsApply",
    model: "dls",
    action: "apply",
    from: "bars",
    type: true
  }
};
export const mds = {
  nodes: {
    name: "nodes",
    model: "nodes",
    action: "define",
    text: "Node"
  },
  bars: {
    name: "bars",
    model: "bars",
    action: "define",
    text: "Bar"
  },
  supports: {
    name: "supports",
    model: "supports",
    action: "define"
  },
  releases: {
    name: "releases",
    model: "releases",
    action: "define"
  },
  materials: {
    name: "nodes",
    model: "materials",
    action: "define"
  },
  ...sections.List.reduce((ac, cv) => {
    ac[cv] = {
      name: cv,
      model: "sections",
      action: "define",
      type: cv
    };
    return ac;
  }, {}),
  pls: { name: "pls", model: "pls", action: "define" },
  ...dls.List.reduce((ac, cv) => {
    ac[cv] = {
      name: cv,
      model: "dls",
      action: "define",
      type: cv
    };
    return ac;
  }, {}),
  ...applys.List.reduce((ac, cv) => {
    ac[cv] = applys[cv];
    return ac;
  }, {}),
  ...nrs.List.reduce((ac, cv) => {
    ac[cv] = {
      name: cv,
      model: "nodes",
      action: "results",
      type: cv
    };
    return ac;
  }, {}),
  srs: {
    name: "srs",
    model: "sections",
    action: "results"
  },
  ...brs.List.reduce((ac, cv) => {
    ac[cv] = {
      name: cv,
      model: "bars",
      action: "results",
      type: cv
    };
    return ac;
  }, {}),
  ...dts.List.reduce((ac, cv) => {
    ac[cv] = {
      ...dts[cv],
      action: "details"
    };
    return ac;
  }, {})
};
export const labels = {
  define: ["Model", "Action", "Type"],
  apply: ["Model", "Action"],
  results: ["Results", "Display"],
  details: ["Results", "Bar", "Display"]
};
export const chs = {
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
        children: sections.List.reduce((ac, cv) => {
          ac[cv] = { name: cv, label: cv.replace("_", " ") };
          return ac;
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
        children: dls.List.reduce((ac, cv) => {
          ac[cv] = { name: cv, label: cv.replace("_", " ") };
          return ac;
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
};
export const order = [
  "Nodes",
  "Bars",
  { name: "Supports", children: ["Define", "Apply"] },
  { name: "Releases", children: ["Define", "Apply"] },
  "Materials",
  {
    name: "Sections",
    children: [{ name: "Define", children: sections.List }, "Apply"]
  },
  { name: "PLs", children: ["Define", "Apply"] },
  {
    name: "DLs",
    children: [{ name: "Define", children: dls.List }, "Apply"]
  }
];
export const orderR = pr => [
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
          children: dts.List.map((cv2, i2) => {
            return {
              label: cv2,
              id: i2,
              name: cv2,
              text: "Detailed Analysis"
            };
          })
        };
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
        children: sections.List.filter(
          tp => !!pr.sections.find(sc => sc.type == tp && sc.bars.length > 0)
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
            children: dls.List.filter(
              tp => !!pr.dls.find(dl => dl.type == tp && dl.bars.length > 0)
            )
          }
        ]
      : ["Apply"]
  }
];

const fchs = function(order) {
  let rs = order.map((cv, i) =>
    typeof cv === "string" || cv instanceof String
      ? { ...chs[cv], id: i }
      : cv.label
      ? cv
      : {
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
  );
  return rs;
};

export const tbs = fchs(order);
export const tbsR = function(pr) {
  let rs = fchs(orderR(pr));
  return rs;
};
export const Acs = {
  create: { class: "m_add", name: "save" },
  copy: { class: "m_add", name: "save" },
  update: { class: "m_edit", name: "save" },
  delete: { class: "m_delete", name: "delete" }
};
