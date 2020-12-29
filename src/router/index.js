import Vue from 'vue'
import VueRouter from 'vue-router'
import ChooseFile from '../components/ChooseFile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ChooseFile',
    component: ChooseFile
  },
  {
    path: '/calconvert',
    name: 'CalConverter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CalConverter')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
