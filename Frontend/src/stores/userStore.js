import { defineStore } from 'pinia'
import { router } from '@/router'
import { api } from '@/middleware'
import { auth } from '@/middleware'
import { evaluate } from '@/middleware'
import 'vue3-toastify/dist/index.css'
import { toast } from 'vue3-toastify'


const userStore = defineStore('user', {
  state: () => {
    return {
      data: {},
      isLogged: false
    }
  },
  actions: {
    async getAll() {
      return await api.get('/getAll')
    },

    async get() {
      const e =await api.get('getUser')

      console.log('eeeeeeeeeeeeeeeeeeee',JSON.parse(JSON.stringify(e.data)) )


      return JSON.parse(JSON.stringify(e.data))
    },
    async delete(id) {
      if (!id) {
        return
      }
      return await api.delete(`deleteUser/${id}`)
    },
    async create(body) {
      return await api.post('createUser', body)
    },
    async update(id, body) {
      if (!id) {
        id = this.id
      }
      return await api.put(`updateUser/${id}`, body)
    },

    async login(body, register) {
      if (!body.username || !body.password) {
        toast('Se requiere usuario y contrasenya', {
          type: 'error',
          pauseOnHover: false,
          pauseOnFocusLoss: false
        })
        return
      }
      api
        .post('login', body)
        .then((res) => {
          console.log('res', res)
          if (auth.checkToken() === true) {
            toast('Ya estas logueado.', { type: 'error', pauseOnHover: false })
            return
          }
          if (res.data.token) {
            localStorage.setItem('token', res.data.token)
            api.defaults.headers.Authorization=res.data.token
            console.log(res.data.token)
            if(!register){
            toast('Login correcto!', {
              type: 'success',
              pauseOnHover: false,
              pauseOnFocusLoss: false
            })}
            evaluate()
            router.push('loggedin')
          }
        })
        .catch((err) => {
          console.log(err)
          const res = err.response
          if (res.data.errorCode === 106 || res.data.errorCode === 109) {
            toast('Login incorrecto.', {
              type: 'error',
              pauseOnHover: false,
              pauseOnFocusLoss: false
            })
            router.push('login')
          }
        })
        console.log('alo',api.defaults.headers);
    },

    async register(body) {
      if (!body.username || !body.password) {
        toast('Se requiere usuario y contrasenya', {
          type: 'error',
          pauseOnHover: false,
          pauseOnFocusLoss: false
        })
        return 0
      }
      console.log('cuerpo', body)
      api
        .post('register', body)
        .then((res) => {
          console.log('res', res)
          if (res.data.errorCode && res.data.errorCode === 107) {
            toast('El usuario ya existe.', {
              type: 'error',
              pauseOnHover: false,
              pauseOnFocusLoss: false
            })
            router.push('login')
          }
          if (res.data.token) {
            toast('Registro correcto!', {
              type: 'success',
              pauseOnHover: false,
              pauseOnFocusLoss: false
            })
            this.login(body, 'sip')
            return res.data
          }
          return 1
        })
        .catch((err) => {
          console.log('ERR',err)
          const res = err.response
          if (res.data?.errorCode === 107) {
            toast('El usuario ya existe.', {
              type: 'error',
              pauseOnHover: false,
              pauseOnFocusLoss: false
            })
            router.push('login')
          }
          return 2
        })
        
        return btoa(JSON.stringify(body))
    },
    logout(method) {
      if (method === 'tokenExp') {
        toast('La sesion ha caducado!', {
          type: 'error',
          pauseOnHover: false,
          pauseOnFocusLoss: false
        })
      }
      console.log('logout', api.defaults.headers.Authorization)
      delete api.defaults.headers.Authorization
      console.log('logged out', api.defaults.headers.Authorization);
      localStorage.removeItem('token')
      router.push('login')
      this.$reset()
    }
  },
  getters: {
    getUsername() {
      return this.username
    },
    getEmail() {
      return this.email
    }
  }
})

export default userStore
