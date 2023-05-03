<script setup>
import api from '@/middleware/axios'
import { ref } from 'vue'
import {router} from '@/router'
import {toast} from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import {auth} from '@/middleware'
import { evaluate } from '@/middleware'
import {userStore} from '@/stores'

const user = userStore()

const data = ref({
  usuario: '',
  password: '',
  showAlert: false,
  errorText: '',
})

function login() {
  localStorage.removeItem('token')
  user.isLogged = false
if(!data.value.usuario||!data.value.password){
  toast('Se requiere usuario y contrasenya',{type: 'success', pauseOnHover: false, pauseOnFocusLoss: false})
  return
}

  api
    .post('login', {
      username: data.value.usuario,
      password: data.value.password
    })
    .then((res) => {
      console.log("res",res)
      if(auth.checkToken()===true){
        toast('Ya estas logueado.', {type: 'error', pauseOnHover: false})
        return
      }
      if (res.data.errorCode === 106) {
        console.log('aaa')
        data.value.showAlert=true
        data.value.errorText='Login incorrecto'
        router.push('login')
      }
      if (res.data.errorCode === 109) {
        data.value.showAlert=true
        data.value.errorText='Usuario no existe'
        router.push('login')
      }
      if (res.data.token) {
        data.value.showAlert=false
        localStorage.setItem('token', res.data.token)
        console.log(res.data.token)
        toast('Login correcto!', {type: 'success', pauseOnHover: false, pauseOnFocusLoss: false})
        user.isLogged = false
        evaluate()
        router.push('loggedin')
      }
    })
    .catch((err) => {
      console.log(err)
      const res = err.response
      if (res.data.errorCode === 106) {
        console.log('aaa')
        data.value.showAlert=true
        data.value.errorText='Login incorrecto'
        router.push('login')
      }
      if (res.data.errorCode === 109) {
        data.value.showAlert=true
        data.value.errorText='Usuario no existe'
        router.push('login')
      }
    })
}

// function get() {
//   if(document.cookie)
//   api
//     .get('getAllUsers', {
//       withCredentials: true,
//     })
//     .then((res) => {
//       console.log(res.data)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

const rules = [(v) => !!v || 'Rellena este campo.']
function validate() {

}
</script>

<template>
  <div>
    <v-alert v-model="data.showAlert" type="error" class="mb-3" closable>{{data.errorText}}</v-alert>
    <v-form @submit.prevent="login">
      <v-text-field v-model="data.usuario" label="user" required :rules="rules" id="user" class="mb-2"></v-text-field>
      <v-text-field v-model="data.password" label="pass" required :rules="rules" id="password" class="mb-2" type="password"></v-text-field>
      <v-row class="my-3">
      <!--:disabled="!data.usuario||!data.password"-->
      <v-btn type="submit" class="mx-auto" @click="validate" :disabled="!data.usuario||!data.password">Login</v-btn>
      </v-row>
    </v-form>
    
  </div>
</template>
