const mStore = {
  state: (moduleName, List) => {
    const rtn = List.reduce((ac, cv) => {
      ac[cv] = state => state[moduleName][cv]
      return ac
    }, {})
    return rtn
  },
  getter: (moduleName, List) => {
    const rtn = List.reduce((ac, cv) => {
      ac[cv] = moduleName + "/" + cv
      return ac
    }, {})
    return rtn
  }
}
const sortDateDown = function(a, b) {
  a = new Date(String(a.modified_date)).getTime()
  b = new Date(String(b.modified_date)).getTime()
  return a < b ? -1 : a > b ? 1 : 0
}

const sortDateUp = function(a, b) {
  a = new Date(String(a.modified_date)).getTime()
  b = new Date(String(b.modified_date)).getTime()
  return a > b ? -1 : a < b ? 1 : 0
}

const sortDate = function(e) {
  if (e == true) {
    return sortDateDown
  } else {
    return sortDateUp
  }
}
export { mStore, sortDate }
