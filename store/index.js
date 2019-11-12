import Cookies from "js-cookie/src/js.cookie.js"
export const strict = false

export const state = () => ({
  username: false,
  error: false,
  csrf: false,
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
  async nuxtServerInit({ dispatch }) {
    await dispatch("login")
  },
  stateChange({ commit }, input) {
    commit("stateChange", input)
  },
  async login({ commit }) {
    try {
      let US
      if (process.server) {
        console.log("/api/users/current/")
        US = await this.$axios.$get("http://server:8000/api/users/current/")
        console.log("/api/users/current/", US)
      } else {
        US = await this.$axios.$get("/api/users/current/")
      }
      console.log("/api/users/current/", US.username)
      var csrftoken = await Cookies.get("csrftoken")
      commit("stateChange", { state: "csrf", value: csrftoken })
      if (US.id) {
        commit("stateChange", { state: "username", value: US.username })
      } else {
        commit("stateChange", { state: "username", value: false })
      }
    } catch (error) {
      console.error(error)
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
