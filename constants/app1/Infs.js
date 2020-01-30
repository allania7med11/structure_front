const math = require("mathjs")
import { Lists, Groups, Statics } from "./static"
import { help } from "./help"
import { Flds } from "./Flds"
class cInfs {
  constructor(Static, Fld) {
    this.Static = Static
    this.Fld = Fld
  }
  get name() {
    return this.Static.name
  }
  get flds() {
    if (this.Static.group == "applys") {
      return ["name", this.Static.from]
    }
    return this.Static.flds
  }
  get fldsGroup() {
    if ("features" in this.Static) {
      return this.flds.filter(cv => !this.Static.features.includes(cv))
    }
    return []
  }
  get fldsT() {
    if (this.Static.group == "applys") {
      return this.Static.type
        ? ["name", "type", this.Static.from]
        : ["name", this.Static.from]
    }
    return !("fldsT" in this.Static) ? this.flds : this.Static.fldsT
  }
  get tbhs() {
    return this.fldsT.map(cv => this.Fld[cv])
  }
  featuretr(cv, vl) {
    return math.round(
      this.Static.unites[vl].vl * JSON.parse(cv.features)[vl],
      this.Static.unites[vl].rd
    )
  }
  Unitetr(value, unite) {
    const unt = this.Static.unites[unite]
    return String(math.round(unt.vl * value, unt.rd))
  }
  get flt() {
    if (["sections", "dls"].includes(this.Static.group)) {
      let fltFeatures = !("fltp" in this.Static)
        ? features =>
            this.Static.features.reduce((ac, fld) => {
              ac[fld] = this.Unitetr(features[fld], fld)
              return ac
            }, {})
        : features =>
            this.Static.fltp.reduce((ac, Gp) => {
              ac[Gp.name] = Gp.gp
                .map(fld => this.Unitetr(features[fld], fld))
                .join("\n")
              return ac
            }, {})
      return vl =>
        vl
          .filter(cv => cv.type == this.name)
          .map(cv => {
            return {
              project: cv.project,
              id: cv.id,
              ...this.fldsGroup.reduce((ac, vl) => {
                ac[vl] = help.test(cv[vl], "name", cv[vl])
                return ac
              }, {}),
              ...fltFeatures(JSON.parse(cv.features))
            }
          })
    }
    if (this.Static.group === "applys") {
      return vl => {
        return vl.filter(cv => cv[this.Static.from].length > 0)
      }
    }
    if (this.Static.group == "nrs") {
      return vl => {
        let nr = vl
        if (this.Static.name == "Rc") {
          nr = nr.filter(cv => cv["Support"])
        }
        return nr.map(cv => {
          return {
            id: cv.id,
            name: cv.name,
            type: cv.type,
            ...this.Static.features.reduce((ac, fld, i) => {
              ac[fld] = this.Unitetr(cv[this.name][i], fld)
              return ac
            }, {})
          }
        })
      }
    }
    if (this.Static.name == "srs") {
      return vl =>
        vl.map(cv => {
          return {
            id: cv.id,
            name: cv.name,
            type: cv.type,
            ...this.Static.fltp.reduce((ac, Gp) => {
              ac[Gp.name] = Gp.gp
                .map(fld => this.Unitetr(cv[fld], fld))
                .join("\n")
              return ac
            }, {})
          }
        })
    }
    if (this.Static.group == "brs") {
      return vl =>
        vl.map(cv => {
          return {
            id: cv.id,
            name: cv.name,
            nodes: `${cv.N1.name}\n${cv.N2.name}`,
            ...this.Static.fltp.reduce((ac, Gp) => {
              ac[Gp.name] = Gp.gp
                .map(fld => this.Unitetr(cv[this.name][fld], Gp.name))
                .join("\n")
              return ac
            }, {})
          }
        })
    }
    return !("flt" in this.Static) ? false : this.Static.flt
  }
  get fltR() {
    let name = this.name + "Apply"
    if (Lists.applys.includes(name)) {
      let apply = Groups.applys[name].from
      return vl => {
        return vl.filter(cv => cv[apply].length > 0)
      }
    }
    return false
  }
  get fltRM() {
    if (this.name === "materials") {
      return (pr, md) => {
        const materials = pr["sections"]
          .filter(cv => cv["bars"].length > 0)
          .map(cv2 => cv2.material.name)
        return md.filter(cv => materials.includes(cv.name))
      }
    }
    if (this.name === "Rc") {
      return (pr, md) => {
        const supports = pr["supports"]
          .filter(cv => cv["UX"] || cv["UZ"] || cv["RY"])
          .map(cv2 => cv2.name)
        return md.filter(cv => supports.includes(cv.Support.name))
      }
    }
    return false
  }
  get ds() {
    let rtn = !("ds" in this.Static) ? {} : this.Static.ds
    if (this.Static.group == "applys") {
      rtn[this.Static.from] = [
        {
          type: "list",
          value: x => {
            return x
              .map(a => a.name)
              .sort((a, b) => a - b)
              .join(",")
          }
        }
      ]
      if (this.Static.type) {
        rtn["type"] = [
          {
            type: "aaa",
            value: (x, id) => help.testArray(x, id).replace("_", " ")
          }
        ]
      }
      return rtn
    }
    return rtn
  }
  get fmhs() {
    return !("fmhs" in this.Static)
      ? [this.flds.map(x => [this.Fld[x]])]
      : this.Static.fmhs.map(cv => cv.map(cv2 => cv2.map(cv3 => this.Fld[cv3])))
  }
  get defaultItem() {
    let di = this.flds.reduce((ac, cv) => {
      ac[cv] = this.Fld[cv].type === "checkbox" ? false : null
      return ac
    }, {})
    if (["sections", "dls"].includes(this.Static.group)) {
      di["type"] = this.name
    }
    if (!("defaultItem" in this.Static)) {
      return di
    } else {
      return Object.assign({}, di, this.Static["defaultItem"])
    }
  }
  get fe() {
    if (["sections", "dls"].includes(this.Static.group)) {
      return item => {
        const features = JSON.parse(item.features)
        return {
          type: item.type,
          ...this.fldsGroup.reduce((ac, vl) => {
            ac[vl] = item[vl]
            return ac
          }, {}),
          ...this.Static.features.reduce((ac, vl) => {
            ac[vl] = math.round(
              this.Static.unites[vl].vl * features[vl],
              this.Static.unites[vl].rd
            )
            return ac
          }, {})
        }
      }
    }
    return "fe" in this.Static
      ? this.Static.fe
      : item =>
          this.flds.reduce((ac, vl) => {
            ac[vl] = item[vl]
            return ac
          }, {})
  }
  get fm() {
    if (["sections", "dls"].includes(this.Static.group)) {
      return item => {
        return {
          type: item.type,
          ...this.fldsGroup.reduce((ac, vl) => {
            ac[vl] = item[vl]
            return ac
          }, {}),
          features: JSON.stringify(
            this.Static.features.reduce((ac, vl) => {
              ac[vl] = item[vl] / this.Static.unites[vl].vl
              return ac
            }, {})
          )
        }
      }
    }
    return !("fm" in this.Static) ? x => x : this.Static.fm
  }
}

/* var Infs = {}
Lists.all.forEach(function(cv) {
  Infs[cv] = new cInfs(Statics[cv], Flds[cv])
}) */
const Infs = cv => new cInfs(Statics[cv], Flds[cv])
export { Infs }
