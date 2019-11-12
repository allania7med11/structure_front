import moment from "moment"
import { sortDate } from "@/constants/static"

const initialState = () => {
  return {
    error: false,
    projects: [],
    editedIndex: -1,
    dialog: false,
    action: "create"
  }
}
export const state = () => initialState()

export const mutations = {
  projectsChange(state, input) {
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
  projectsChange({ commit }, input) {
    commit("projectsChange", input)
  },
  async aProjects({ commit }) {
    try {
      var projects = await this.$axios.$get("/api/projects/")
      commit("projectsChange", {
        state: "projects",
        value: projects.sort(sortDate(false)).map(cv =>
          Object.assign({}, cv, {
            modified_date: moment(String(cv.modified_date)).format(
              "MM/DD/YYYY hh:mm"
            )
          })
        )
      })
    } catch (error) {
      console.error(error)
    }
  }
}
