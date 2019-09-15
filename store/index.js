const axios = require('axios');
export const strict = false
export const state = () => ({
  username:false,
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
  provider: state => {
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
  async login({commit,app,router},input) {
    console.log("login")
    try{
      var US= await axios.get("/api/users/")
      console.log("US2=")
      console.log(US.data[0])
      if (!!US.data){
        commit('stateChange',{state:"username",value:US.data[0].username})
        /* var projects= await axios.get("/api/projects/")
        console.log(projects.data)
        commit('stateChange',{state:"projects",value:projects.data}) */
      } else {
        commit('stateChange',{state:"username",value:false})
        // commit('stateChange',{state:"projects",value:false})
      }
      
    } catch (error) {
      console.error(error);
    }
  }
  
}
