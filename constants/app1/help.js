
class cHelps {
	testArray = (x, id) => (Array.isArray(x) ? x[id] : x)
	Acs = {
		create: { class: "m_add", name: "save" },
		copy: { class: "m_add", name: "save" },
		update: { class: "m_edit", name: "save" },
		delete: { class: "m_delete", name: "delete" }
	}
	labels = {
		define: ["Model", "Action", "Type"],
		apply: ["Model", "Action"],
		results: ["Results", "Display"],
		details: ["Results", "Bar", "Display"]
	}
	test = function (obj, key, df) {
		if (obj.hasOwnProperty(key)) {
			return obj[key];
		}
		return df;
	}
	get Dsvalue() {
		return {
			bl: (x, id) => this.testArray(x, id) ? "check" : "times",
			name: (x, id) => this.testArray(x, id).name,
			unite: (value) => (x, id) => this.testArray(x, id) * value,
			idt: (x, id) => x[id],
			axes: (x, id) => this.testArray(x, id)==="G" ? "Global" : "Local",
		}
	}
}
const help = new cHelps()
const Units = {
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

export { Units, help }