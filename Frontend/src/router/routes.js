import { createRouter, createWebHistory } from 'vue-router'
import { HomeView, LoginView, LoggedinView } from '@/views'
import LoginComp from '../components/LoginComp.vue'

import { toast } from 'vue3-toastify'
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
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      toast('No tienes acceso a esa ruta.', { pauseOnHover: false, hideProgressBar: true })
      next('login')
    }
  } else {
    next()
  }
})

export default router
