import { Lists,Statics } from "./static";
import { Flds } from "./Flds";
var Dsvalue={
    bl:(x,id) => testArray(x,id) ? "check" : "times",
    name : (x,id) => testArray(x,id).name ,
    unite : (value) => (x,id) => testArray(x,id)*value ,
    idt : (x,id) =>  x[id],
  }
class cInfs {
    constructor(Static, Fld) {
      this.Static = Static;
      this.Fld = Fld;
    }
    get name() {
        return this.Static.name;
      }
    get flds() {
        if(this.Static.group=="applys"){
            return this.Static.type ? ["name", "type", static.from]:["name", static.from]
        }
        return this.Static.flds;
    }
    get fldsGroup() {
        if(this.Static.hasOwnProperty("features")){
            return this.flds.filter(cv => !this.flds.includes(cv))
        }
        return [];
    }
    get fldsT() {
        return !this.Static.hasOwnProperty("fldsT")?this.flds:this.Static.fldsT;
      }
    get tbhs() {
        return this.fldsT.map(cv => this.Fld[cv]);;
      }
    get flt(){
        if(["sections","dls"].includes(this.Static.group) ){
            let fltFeatures=!this.Static.hasOwnProperty("fltp")? 
                (ac, vl) => {ac[vl] = gftr(obj, cv, vl);return ac}:
                (ac, vl) => {ac[vl.name] = vl.gp.map(cv2 => gftr(obj, cv, cv2)).join("\n");return ac;}                 
            return vl =>
                vl.filter(cv => cv.type == this.Static.name)
                .map(cv => {
                    return {
                        project: cv.project,
                        id: cv.id,
                        ...this.fldsGroup.reduce((ac, vl) => {ac[vl] = cv[vl];return ac;}, {}),
                        ...this.Static.features.reduce(fltFeatures, {})
                    };
                }); 
        }
        if (this.Static.name=="nrs"){
            return vl =>
                vl.map(cv => {
                    return {
                        id: cv.id,
                        name: cv.name,
                        type: cv.type,
                        ...obj.fltp.reduce((ac, Gp) => {
                        ac[Gp.name] = Gp.gp
                            .map(fld => String(math.round(obj.unites[fld].vl * cv[fld], obj.unites[fld].rd))
                            ).join("\n");
                        return ac;
                        }, {})
                    };
                })
        }
        return false
    }
    get fltR(){
        let name=this.Static.group+"Apply"
        if(Lists.applys.includes(name)){
            let apply=Groups.applys[apply].from
            return vl =>{ return vl.filter(cv => cv[apply].length > 0) };
        }
    }
    get ds() {
        let rtn={}
        if(this.Static.group=="applys"){
            rtn[this.Static.from]=[{
                type:"list",value:x => {
                return x.map(a => a.name).sort((a, b) => a - b).join(",")
                }
            }]
            return !this.Static.type ? rtn:
                rtn.update({type:[{type:"aaa",value:(x,id) => testArray(x,id).replace("_", " ")}]})
		}
		if(this.Static.group=="sections"){
            return !this.Static.hasOwnProperty("fltp") ? rtn:
                rtn.update(
					this.Static.fltp.reduce((ac, vl) => {
						ac[vl.name] = vl.gp.map(() => {return {type:"idt",value:Dsvalue.idt} });
						return ac;
					}, {}))
        }
        return !this.Static.hasOwnProperty("ds")?{}:this.Static.ds;
    }
    get fmhs() {
        return !this.Static.hasOwnProperty("fmhs")?
          [this.flds.map(x => [this.Fld[x]])]:
          this.Static.fmhs.map(cv =>
            cv.map(cv2 => cv2.map(cv3 => this.Fld[cv3]))
          );
    }
    get fe() {
        if(this.Static.group=="sections"){
            return item => {
                return {
                    name: item.name,
                    material: item.material,
                    ...obj.features.reduce((ac, vl) => {
                        ac[vl] = math.round(obj.unites[vl].vl * JSON.parse(item.features)[vl],obj.unites[vl].rd);
                        return ac;
                    }, {})
                };
            }
        }
        return this.Static.hasOwnProperty("fe")?this.Static.fe:
            item =>this.flds.reduce((ac, vl) => {ac[vl] = item[vl];return ac;}, {});
    }
    get fm() {
        if(this.Static.group=="sections"){
            return item => {
                return {
                    name: item.name,
                    material: item.material,
                    type: obj.name,
                    features: JSON.stringify(
                    obj.features.reduce((ac, vl) => {
                        ac[vl] = item[vl] / obj.unites[vl].vl;
                        return ac;
                    }, {})
                    )
                };
            }
        }
        return !this.Static.hasOwnProperty("fm")?x => x:this.Static.fm;
    }
}

export const Infs = Lists.all.reduce((ac,cv)=>{ac[cv]=new cInfs(Statics[cv],Flds[cv])})