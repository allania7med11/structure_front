import moment from "moment"
import { sortDate } from "@/constants/static"

const initialState = () => {
  return {
    error: false,
    projects: [],
    editedIndex: -1,
    dialog: false,
    action: "create",
    offlineProjects: []
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
      let items = [...projects]
      commit("projectsChange", {
        state: "projects",
        value: items.sort(sortDate(false)).map(cv =>
          Object.assign({}, cv, {
            date: new Date(String(cv.modified_date)).getTime(),
            last_modified: moment(String(cv.modified_date)).format(
              "DD/MM/YYYY HH:mm"
            )
          })
        )
      })
    } catch (error) {
      console.error(error)
    }
  },
  async aOfflineProjects({ commit }) {
    let runtime = ""
    let list = []
    await caches.keys().then(keys => {
      runtime = keys.find(cv => cv.includes("runtime"))
    })
    caches.open(runtime).then(cache => {
      cache.keys().then(keys => {
        Promise.all(
          keys
            .filter(k => k.url.includes("/api/projects/"))
            .map(cv => {
              list.push(cv.url)
              return cv.url
            })
        ).then(() => {
          commit("projectsChange", {
            state: "offlineProjects",
            value: list.filter(k => k.includes("/api/"))
          })
        })
      })
    })
  }
}
