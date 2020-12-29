import Vue from 'vue'
import VueRouter from 'vue-router'
import CalConverter from '../views/CalConverter'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CalConverter',
    component: CalConverter
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
