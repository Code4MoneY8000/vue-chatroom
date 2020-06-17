import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let defaultuserName = ''
let defaultchatName = ''
try {
  if(localStorage.userName){
    defaultuserName = localStorage.userName
  }
} catch (error) {}

try {
  if(localStorage.chatName){
    defaultchatName = localStorage.chatName
  }
} catch (error) {}
export default new Vuex.Store({
  state: {
    chatName: defaultchatName,
    userName: defaultuserName
  },
  mutations: {
    change (state, obj){
      if (obj.chatName) {
        state.chatName = obj.chatName
        try {
          localStorage.chatName = obj.chatName
        } catch (error){}
      }
      state.userName = obj.userName
      try {
        localStorage.userName = obj.userName
      } catch (error) {}
    }
  },
  actions: {
  },
  modules: {
  }
})
