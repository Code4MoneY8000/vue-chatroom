import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let defaultuserName = ''
let defaultchatName = ''
let defaultuuid = ''
try {
  if(localStorage.userName){
    defaultuserName = localStorage.userName
  }
  if(localStorage.chatName){
    defaultchatName = localStorage.chatName
  }
  if(localStorage.uuid){
    defaultuuid = localStorage.uuid
  }
} catch (error) {}

export default new Vuex.Store({
  state: {
    chatName: defaultchatName,
    userName: defaultuserName,
    uuid: defaultuuid
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
      state.uuid = obj.uuid
      try{
        localStorage.uuid = obj.uuid
        localStorage.userName = obj.userName
      } catch (error) {}
    }
  },
  actions: {
  },
  modules: {
  }
})
