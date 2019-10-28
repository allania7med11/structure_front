import Cookies from 'js-cookie/src/js.cookie.js'
export const strict = false


export const state = () => ({
  username: false,
  error: false,
  csrf: false,
  tutorials: {},
  listTutorials: ["Beam", "TrussStructure", "FrameStructure", "BeamsInternalHinges"]
})

export const mutations = {
  stateChange(state, input) {
    state[input.state] = input.value
  }
}
export const actions = {
  stateChange({ commit }, input) {
    commit("stateChange", input)
  },
  async login({ commit, dispatch }) {
    try {
      var US = await this.$axios.$get("/api/users/current/")
      var csrftoken = await Cookies.get('csrftoken');
      commit('stateChange', { state: "csrf", value: csrftoken });
      if (!!US.id) {
        commit('stateChange', { state: "username", value: US.username })
        dispatch("projects/aProjects")
      } else {
        commit('stateChange', { state: "username", value: false })
        commit('stateChange', { state: "csrf", value: false })
        commit('projects/projectsChange', { state: "projects", value: false })
      }
    } catch (error) {
      console.error(error);
    }
  },
  async aTutorial({ state }, name) {
    try {
      if (state.listTutorials.includes(name)) {
        if (state.tutorials.hasOwnProperty(name)){
          return true
        } else {
          var tutorial = await this.$axios.$get(`/api/projects/Tutorials/?name=${name}`)
          console.log(tutorial)
          state.tutorials[name] = tutorial[name];
          return true
        }
      } else {
        return false
      }
    } catch (error) {
      console.error(error);
    }
  },

}
