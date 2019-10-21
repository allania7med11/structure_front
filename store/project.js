import { mds } from "~/constants/app1/static";
import { help } from "~/constants/app1/help";
import { Infs } from "~/constants/app1/Infs";
import { sortDate  } from "@/constants/static";
const initialState= () => {
  return {
    id: 1,
    project:{nodes:[],bars:[]},
    editedIndex: -1,
    detailIndex: -1,
    dialog: false,
    page: 'define',
    search: '',
    slg: "nodes",
    action: 'create',
    results: "Solve",
  }
}
export const state = () => initialState()
export const getters ={
    ac: state => {
      return help.Acs[state.action]; 
    },
    md: state => {
      return mds[state.slg]; 
    },
    inf: state => {
      return Infs[state.slg]; 
    },
    model:(state,getters) => {
      var field=getters.md.model
      return state.project[field].sort(sortDate(state.page === "results"))
    },
    modelField:(state) => (field) => {
      return state.project[field].sort(sortDate(state.page === "results"))
    }   
}
export const mutations = {
  projectChange (state,input) {
    state[input.state]=input.value
  }
}
export const actions ={
  reset({state}) {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  },
  projectChange({commit},input) {
    commit("projectChange",input)
  },
  async aProject({commit,state},input) {
    try{
      var project= await this.$axios.$get(`/api/projects/${input.id}/`)
      commit('projectChange',{state:"project",value:project})  
      console.log(state) 
    } catch (error) {
      console.error(error);
    }
  }
}