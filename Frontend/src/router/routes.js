import { createRouter, createWebHistory } from 'vue-router'
import { HomeView, LoginView, LoggedinView, RegisterView, ChatView } from '@/views'
// import { userStore } from '@/stores'
import {evaluate} from '@/middleware'
import testPage from '../views/testPage.vue'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'Home'
  },
  {
    path: '/login',
    component: LoginView,
    name: 'Login'
  },
  {
    path: '/register',
    component: RegisterView,
    name: 'Register'
  },
  {
    path: '/loggedin',
    component: LoggedinView,
    meta: { requiresAuth: true },
    name: 'Account'
  },
  {
    path: '/chat',
    component: ChatView,
    meta: { requiresAuth: true },
    name: 'Chat'
  },
  {
    path: '/test',
    component: testPage
  },
  { 
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: testPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // var payload = null
  // const user = userStore()

  if(token&&(['Login','Register'].includes(to.name))){
    next('loggedin')
  }

  try{
    evaluate()
  }
  catch{
    console.log('Hay token, pero es invalido') 
  }
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
