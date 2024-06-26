import { mds } from "~/constants/app1/static"
import { help } from "~/constants/app1/help"
import { Infs } from "~/constants/app1/Infs"
import { sortDate } from "@/constants/static"
import { Orders } from "@/constants/app1/order"
const initialState = () => {
  return {
    id: 1,
    error: false,
    project: { nodes: [], bars: [] },
    editedIndex: -1,
    detailIndex: -1,
    dialog: false,
    page: "define",
    search: "",
    slg: "nodes",
    action: "create",
    pages: true
  }
}
export const state = () => initialState()
export const getters = {
  results: state => {
    return state.project["results"] ? "Results" : "Solve"
  },
  ac: state => {
    return help.Acs[state.action]
  },
  md: state => {
    return mds[state.slg]
  },
  inf: state => {
    const rtn = Infs(state.slg)
    return rtn
  },
  model: (state, getters) => {
    var field = getters.md.model
    return state.project[field].sort(sortDate(state.page === "results"))
  },
  modelField: state => field => {
    return state.project[field].sort(sortDate(state.page === "results"))
  },
  tbs: state => {
    if (state.page == "results") {
      return Orders.tbsR(state.project)
    }
    return Orders.tbs
  }
}
export const mutations = {
  projectChange(state, input) {
    state[input.state] = input.value
  }
}
export const actions = {
  reset({ state }) {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  },
  projectChange({ commit }, input) {
    commit("projectChange", input)
  },
  async aProject({ commit }, input) {
    try {
      const project = await this.$axios.$get(`/api/projects/${input.id}/`)
      commit("projectChange", { state: "project", value: project })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
