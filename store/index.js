/* eslint-disable no-undef */
export const strict = false
import { urls } from "~/env"
export const state = () => ({
  urls: urls,
  username: false,
  error: false,
  tutorials: {},
  listTutorials: [
    "Beam",
    "TrussStructure",
    "FrameStructure",
    "BeamsInternalHinges"
  ]
})
export const getters = {
  getUsername: state => {
    return state.username ? state.username : "state.username"
  }
}
export const mutations = {
  stateChange(state, input) {
    state[input.state] = input.value
  },
  stateChangeField(state, input) {
    const rtn = Object.assign({}, state[input.state])
    rtn[input.field] = input.value
    state[input.state] = rtn
  }
}
export const actions = {
  stateChange({ commit }, input) {
    commit("stateChange", input)
  },
  async login({ commit }) {
    try {
      let US
      console.log("login")
      US = await this.$axios.$get("/api/users/current/")
      if (US.id) {
        commit("stateChange", { state: "username", value: US.username })
      } else {
        commit("stateChange", { state: "username", value: false })
      }
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  },
  async aTutorial({ commit, state }, name) {
    try {
      if (state.listTutorials.includes(name)) {
        if (Object.prototype.hasOwnProperty.call(state.tutorials, name)) {
          return true
        } else {
          var tutorial = await this.$axios.$get(
            `/api/projects/Tutorials/?name=${name}`
          )
          commit("stateChangeField", {
            state: "tutorials",
            field: name,
            value: tutorial[name]
          })
          return true
        }
      } else {
        return false
      }
    } catch (error) {
      console.error(error)
    }
  }
}
