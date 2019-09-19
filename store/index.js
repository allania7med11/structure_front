const axios = require('axios');
import Cookies from 'js-cookie/src/js.cookie.js'
export const strict = false
export const state = () => ({
  username:false,
  error:false,
  csrf:false,
  id: 1,
  editedIndex: -1,
  detailIndex: -1,
  dialog: false,
  page: 'define',
  search: '',
  slg: "nodes",
  action: 'create',
  projects:[]
})
export const getters ={
  editedItem: state => {
    return state.action 
  }
}
export const mutations = {
  stateChange (state,input) {
    state[input.state]=input.value
  }
}
export const actions = {
  stateChange({commit},input) {
    commit("stateChange",input)
  },
  async login({commit}) {
    try{
      var US= await this.$axios.$get("/api/users/")
      var csrftoken = Cookies.get('csrftoken');
      console.log(csrftoken)
      if (US.length>0){
        commit('stateChange',{state:"username",value:US[0].username})
        commit('stateChange',{state:"csrf",value:csrftoken})        
        var projects= await this.$axios.$get("/api/projects/?auth=private")
        console.log({projects:projects})
        commit('stateChange',{state:"projects",value:projects})
      } else {
        commit('stateChange',{state:"username",value:false})
        commit('stateChange',{state:"csrf",value:false}) 
        commit('stateChange',{state:"projects",value:false})
      }
    } catch (error) {
      console.error(error);
    }
  },
  async aProject({commit},input) {
    try{
      var project= await this.$axios.$get(`/api/projects/${input.id}`)
      console.log({project:project})
      commit('stateChange',{state:"project",value:project})   
    } catch (error) {
      console.error(error);
    }
  }
  
}
