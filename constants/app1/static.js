import { Units,help } from "./help";
class cLists {
	uniques = ["nodes", "bars", "supports", "releases", "materials", "pls", "srs"]
	applys = ["supportsApply", "releasesApply", "sectionsApply", "plsApply", "dlsApply"]
	sections = [
		"Rectangular", "Rectangular_Hollow", "Circular", "Circular_Hollow", "T_Section", "I_Section", "Custom"
	]
	dls = ["Uniform_Load", "Trapezoidal_Load", "Self_Weight"]
	nrs = ["Rc", "Dp"]
	brs = ["Rl", "Rg", "Ql", "Qg"]
	dts = ["FX", "FZ", "MY", "Ssup", "Sinf", "UX", "UZ", "RY"]
	get all() {
		return [
			"nodes", "bars", "supports", "releases", "materials", ...this.sections,
			"pls", ...this.dls,
			...this.applys,
			...this.nrs, "srs", ...this.brs
		];
	}
}
const Lists = new cLists()
const Groups = {
	applys: {
		supportsApply: {
			group: "applys",
			name: "supportsApply",
			model: "supports",
			action: "apply",
			from: "nodes"
		},
		releasesApply: {
			group: "applys",
			name: "releasesApply",
			model: "releases",
			action: "apply",
			from: "bars"
		},
		sectionsApply: {
			group: "applys",
			name: "sectionsApply",
			model: "sections",
			action: "apply",
			from: "bars",
			type: true
		},
		plsApply: {
			group: "applys",
			name: "plsApply",
			model: "pls",
			action: "apply",
			from: "nodes"
		},
		dlsApply: {
			group: "applys",
			name: "dlsApply",
			model: "dls",
			action: "apply",
			from: "bars",
			type: true
		}
	},
	sections: {
		Rectangular: {
			group: "sections",
			image: { src: "Rectangular", height: "150", type: "image" },
			name: "Rectangular",
			features: ["b", "h"],
			unites: ["b", "h"].reduce((ac, cv) => {
				ac[cv] = Units["cm"];
				return ac;
			}, {}),
			flds: ["name", "material", "b", "h"],
			fmhs: [[["name"], ["material"]], [["b", "h"], ["image"]]],
		},
		Rectangular_Hollow: {
			group: "sections",
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
				{ name: "b_h", gp: ["b", "h"], text: "b[cm]\nh[cm]", value: "b_h" },
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
			group: "sections",
			image: { src: "Circular", height: "100", type: "image" },
			name: "Circular",
			features: ["d"],
			unites: { d: Units["cm"] },
			flds: ["name", "material", "d"],
			fmhs: [[["name"], ["material"]], [["d"], ["image"]]]
		},
		Circular_Hollow: {
			group: "sections",
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
			group: "sections",
			image: { src: "T_Section", height: "150", type: "image" },
			name: "T_Section",
			features: ["b", "tf", "tw", "hw"],
			unites: ["b", "tf", "tw", "hw"].reduce((ac, cv) => {
				ac[cv] = Units["cm"];
				return ac;
			}, {}),
			flds: ["name", "material", "b", "tf", "tw", "hw"],
			fltp: [
				{ name: "b_tw", gp: ["b", "tw"], text: "b[cm]\ntw[cm]", value: "b_tw" },
				{
					name: "tf_hw",
					gp: ["tf", "hw"],
					text: "tf[cm]\nhw[cm]",
					value: "tf_hw"
				}
			],
			fldsT: ["name", "material", "b_tw", "tf_hw"],
			fmhs: [[["name"], ["material"]], [["b", "tw"], ["tf", "hw"], ["image"]]]
		},
		I_Section: {
			group: "sections",
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
					text: "b1[cm]\ntw[cm]\nb2[cm]",
					value: "b1_tw_b2"
				},
				{
					name: "tf1_hw_tf2",
					gp: ["tf1", "hw", "tf2"],
					text: "tf1[cm]\nhw[cm]\ntf2[cm]",
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
			group: "sections",
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
					text: "Ax[cm4]\nIy[cm8]",
					value: "Ax_Iy"
				},
				{
					name: "Cy_H",
					gp: ["Cy", "H"],
					text: "Cy[cm]\nH[cm]",
					value: "Cy_H"
				}
			],
			fldsT: ["name", "material", "Ax_Iy", "Cy_H"],
			fmhs: [[["name", "material"], ["Ax", "Iy"], ["Cy", "H"]]]
		}
	},
	dls: {
		Uniform_Load: {
			group: "dls",
			name: "Uniform_Load",
			features: ["PX", "PZ", "MY"],
			unites: { PX: Units["KNpm"], PZ: Units["KNpm"], MY: Units["KN_mpm"] },
			flds: ["name", "Axes", "PX", "PZ", "MY"],
			ds: { Axes: [{type:"Axes",value:help.Dsvalue.axes}] },
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
			group: "dls",
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
			ds: { Axes: [{type:"Axes",value:help.Dsvalue.axes}] },
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
			group: "dls",
			name: "Self_Weight",
			features: ["Factor"],
			unites: { Factor: Units["none"] },
			flds: ["name", "Factor"],
			defaultItem: { Factor: 1 }
		}
	},
	nrs: {
		Rc: {
			group: "nrs",
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
			group: "nrs",
			name: "Dp",
			features: ["UX", "UZ", "RY"],
			unites: {
				UX: Units["mm"],
				UZ: Units["mm"],
				RY: Units["deg"]
			},
			flds: ["name", "UX", "UZ", "RY"]
		}
	},
	brs: {
		...["Rl", "Rg"].reduce((ac, cv) => {
			ac[cv] = {
				group: "brs",
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
				group: "brs",
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
	},
	dts: {
		...["FX", "FZ"].reduce((ac, cv) => {
			ac[cv] = {
				group: "dts",
				name: cv,
				unite: Units["KN"],
				from: "EF",
				max: "EFm"
			};
			return ac;
		}, {}),
		MY: {
			group: "dts",
			name: "MY",
			unite: Units["KN_m"],
			from: "EF",
			max: "EFm"
		},
		...["Ssup", "Sinf"].reduce((ac, cv) => {
			ac[cv] = {
				group: "dts",
				name: cv,
				unite: Units["MPa"],
				from: "S",
				max: "Sm"
			};
			return ac;
		}, {}),
		...["UX", "UZ"].reduce((ac, cv) => {
			ac[cv] = {
				group: "dts",
				name: cv,
				unite: Units["mm"],
				from: "DP",
				max: "DPm"
			};
			return ac;
		}, {}),
		RY: {
			group: "dts",
			name: "RY",
			unite: Units["deg"],
			from: "DP",
			max: "DPm"
		}
	}
}

const Statics = {
	nodes: {
		group: "unique",
		name: "nodes",
		flds: ["name", "X", "Z"],
	},
	bars: {
		group: "unique",
		name: "bars",
		flds: ["name", "N1", "N2"],
		ds: { N1: [{ type: "name", value: help.Dsvalue.name }], N2: [{ type: "name", value: help.Dsvalue.name }] }
	},
	supports: {
		group: "unique",
		name: "supports",
		flds: ["name", "UX", "UZ", "RY"],
		ds: {
			UX: [{ type: "bl", value: help.Dsvalue.bl }],
			UZ: [{ type: "bl", value: help.Dsvalue.bl }],
			RY: [{ type: "bl", value: help.Dsvalue.bl }]
		},
		fltR: vl => {
			return vl.filter(cv => cv["nodes"].length > 0);
		}
	},
	releases: {
		group: "unique",
		name: "releases",
		flds: ["name", "UX1", "UZ1", "RY1", "UX2", "UZ2", "RY2"],
		fldsT: ["name", "UX", "UZ", "RY"],
		fmhs: [[["name"], ["UX1", "UX2"], ["UZ1", "UZ2"], ["RY1", "RY2"]]],
		ds: {
			UX: [{ type: "bl", value: help.Dsvalue.bl }, { type: "bl", value: help.Dsvalue.bl }],
			UZ: [{ type: "bl", value: help.Dsvalue.bl }, { type: "bl", value: help.Dsvalue.bl }],
			RY: [{ type: "bl", value: help.Dsvalue.bl }, { type: "bl", value: help.Dsvalue.bl }]
		},
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
	},
	materials: {
		group: "unique",
		name: "materials",
		flds: ["name", "YM", "Density"],
		defaultItem: { Density: 0 },
		ds: { Density: [{ type: "unite", value: help.Dsvalue.unite(10 ** 3) }] },
		fe: item => {
			return {
				name: item.name,
				Density: item.Density * 10 ** 3,
				YM: item.YM
			};
		},
		fm: item => Object.assign({}, item, { Density: item.Density / 10 ** 3 }),
		fltR: vl => vl.filter(cv => !!cv["sections"].find(cv => cv.bars.length > 0))
	},
	...Groups.applys, ...Groups.sections,
	pls: {
		group: "unique",
		name: "pls",
		flds: ["name", "FX", "FZ", "CY"],
		defaultItem: ["FX", "FZ", "CY"].reduce((ac, cv) => {
			ac[cv] = 0;
			return ac;
		}, {}),
		ds: ["FX", "FZ", "CY"].reduce((ac, cv) => {
			ac[cv] = [{ type: "unite", value: help.Dsvalue.unite(10 ** 3) }];
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
	},
	...Groups.dls, ...Groups.nrs,
	srs: {
		group: "unique",
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
				text: "Ax[cm4]\nIy[cm8]",
				value: "Ax_Iy",
			},
			{
				name: "Cy_H",
				gp: ["Cy", "H"],
				text: "Cy[cm]\nH[cm]",
				value: "Cy_H"
			}
		],
		fldsT: ["name", "type", "Ax_Iy", "Cy_H"]
	},
	...Groups.brs
}
const mds = {
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
	...Lists.sections.reduce((ac, cv) => {
		ac[cv] = {
			name: cv,
			model: "sections",
			action: "define",
			type: cv
		};
		return ac;
	}, {}),
	pls: { name: "pls", model: "pls", action: "define" },
	...Lists.dls.reduce((ac, cv) => {
		ac[cv] = {
			name: cv,
			model: "dls",
			action: "define",
			type: cv
		};
		return ac;
	}, {}),
	...Lists.applys.reduce((ac, cv) => {
		ac[cv] = Groups.applys[cv];
		return ac;
	}, {}),
	...Lists.nrs.reduce((ac, cv) => {
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
	...Lists.brs.reduce((ac, cv) => {
		ac[cv] = {
			name: cv,
			model: "bars",
			action: "results",
			type: cv
		};
		return ac;
	}, {}),
	...Lists.dts.reduce((ac, cv) => {
		ac[cv] = {
			...Groups.dts[cv],
			action: "details"
		};
		return ac;
	}, {})
};

export { mds,Statics, Groups, Lists }
