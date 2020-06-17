import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import chatRoom from '../pages/chatRoom.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },{
    path:'/:uuid',
    name: 'chatRoom',
    component: chatRoom
  }
]

const router = new VueRouter({
  routes
})

export default router
