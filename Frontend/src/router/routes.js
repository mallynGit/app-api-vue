import { createRouter, createWebHistory } from 'vue-router'
import { HomeView, LoginView, LoggedinView } from '@/views'
import LoginComp from '../components/LoginComp.vue'
import axios from 'axios'
import {toast} from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/loggedin',
    component: LoggedinView,
    meta: { requiresAuth: true }
  },
  {
    path: '/test',
    component: LoginComp,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')
  console.log('comprobando')
  if (token && to.matched.some((record) => record.meta.requiresAuth)) {
    console.log('comprobado auth')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return true
  } else if (to.matched.some((record) => !record.meta.requiresAuth)){
    delete axios.defaults.headers.common['Authorization']
    return true
  } else {
    toast('No tienes acceso a esa ruta.', {pauseOnHover: false, hideProgressBar: true})
    return false
  }
})

export default router
