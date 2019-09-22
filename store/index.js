const axios = require('axios');
import Cookies from 'js-cookie/src/js.cookie.js'
import { mds, Acs, test } from "@/constants/app1/static";
import { Infs } from "@/constants/app1/Infs";
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
  projects:[],
  project:{'nodes':[],'bars':[],'supports':[]}
})
export const getters ={
  ac: state => {
    return Acs[state.action]; 
  },
  md: state => {
    return mds[state.slg]; 
  },
  inf: state => {
    return Infs[state.slg]; 
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
      var csrftoken = await Cookies.get('csrftoken');
      commit('stateChange',{state:"csrf",value:csrftoken}) ;     
      console.log({"csrftoken":csrftoken})
      if (US.length>0){
        commit('stateChange',{state:"username",value:US[0].username})
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
      var project= await this.$axios.$get(`/api/projects/${input.id}/`)
      console.log({project:project})
      commit('stateChange',{state:"project",value:project})   
    } catch (error) {
      console.error(error);
    }
  }
  
}
