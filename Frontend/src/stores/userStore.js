import { defineStore } from 'pinia'
import {router} from '@/router'

const userStore = defineStore('user', {
  state: () => {
    return {
      username: null,
      email: null,
      id: null,
      isLogged: false,
    }
  },
  actions: {
    setUsername(username) {
      this.username = username
    },
    setEmail(email) {
      if (email === null) {
        this.email = 'None'
      }
      this.email = email
    },
    login() {
      this.isLogged = true
    },
    logout() {
      this.isLogged = false
      localStorage.removeItem('token')
      router.push('login')
    }
  },
  getters: {
    getUsername(state) {
      return state.username
    },
    getEmail(state) {
      return state.email
    }
  }
})

export default userStore
