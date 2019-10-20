const axios = require('axios');
import moment from 'moment'
import Cookies from 'js-cookie/src/js.cookie.js'
import { sortDate  } from "@/constants/static";
export const strict = false


export const state = () => ({
  username:false,
  error:false,
  csrf:false,
  projects:[],
})

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
      var US= await this.$axios.$get("/api/users/current/")
      var csrftoken = await Cookies.get('csrftoken');
      commit('stateChange',{state:"csrf",value:csrftoken}) ;     
      if (!!US.id){
        commit('stateChange',{state:"username",value:US.username})
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
  async aProjects({commit,state}) {
    try{
      var projects= await this.$axios.$get("/api/projects/")
        commit('stateChange',{
          state:"projects",
          value:projects.sort(sortDate(false))
          .map(cv => Object.assign({}, cv,{modified_date:moment(String(cv.modified_date)).format('MM/DD/YYYY hh:mm')}))
        })  
      console.log(state) 
    } catch (error) {
      console.error(error);
    }
  },
}
