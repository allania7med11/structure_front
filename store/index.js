const axios = require('axios');
import moment from 'moment'
import Cookies from 'js-cookie/src/js.cookie.js'
import { mds, Acs } from "@/constants/app1/static";
import { sortDate  } from "@/constants/static";
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
  project:{'nodes':[],'bars':[],'supports':[]},
  defaultProject:{'nodes':[],'bars':[],'supports':[]}
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
  },
  model:(state,getters) => {
    if (state.defaultProject.id !== state.project.id){
      return [...state.project[getters.md.model],...state.defaultProject[getters.md.model]]
      .sort(sortDate(state.page === "results"))
    } else {
      return state.project[getters.md.model].sort(sortDate(state.page === "results"))
    }
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
  async login({commit,dispatch}) {
    try{
      var US= await this.$axios.$get("/api/users/")
      var csrftoken = await Cookies.get('csrftoken');
      commit('stateChange',{state:"csrf",value:csrftoken}) ;     
      console.log({"csrftoken":csrftoken})
      var defaultProject= await this.$axios.$get(`/api/projects/1/`)
      commit('stateChange',{state:"defaultProject",value:defaultProject})
      if (US.length>0){
        commit('stateChange',{state:"username",value:US[0].username})
        dispatch("aProjects")
      } else {
        commit('stateChange',{state:"username",value:false})
        commit('stateChange',{state:"csrf",value:false}) 
        commit('stateChange',{state:"projects",value:false})
      }
    } catch (error) {
      console.error(error);
    }
  },
  async aProjects({commit}) {
    try{
      var projects= await this.$axios.$get("/api/projects/?auth=private")
        commit('stateChange',{
          state:"projects",
          value:projects.sort(sortDate(false))
          .map(cv => Object.assign({}, cv,{modified_date:moment(String(cv.modified_date)).format('MM/DD/YYYY hh:mm')}))
        })   
    } catch (error) {
      console.error(error);
    }
  },
  async aProject({commit},input) {
    try{
      var project= await this.$axios.$get(`/api/projects/${input.id}/`)
      commit('stateChange',{state:"project",value:project})   
    } catch (error) {
      console.error(error);
    }
  }
  
}
