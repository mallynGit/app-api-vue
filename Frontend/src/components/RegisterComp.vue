<script setup>

import { reactive } from 'vue'
import {useAuthStore} from '@/services'
import { toast } from 'vue3-toastify';
const data = reactive({
  username: '',
  password: '',
  email: null,
})

function submit(){
  useAuthStore().registrarUsuario(data)
}

// const pattern= /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]{2,4})*/
// const pat2=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
const emailpatt=/^[^\s@]+@[^\s@]+\.([^\s@]{2,4})+$/
const userpatt=/^[a-zA-Z0-9-_.]*$/
const passpatt=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8}$/
const rules = [(v) => !!v || 'Rellena este campo.']
// const emailRules = [(v) => !!v || 'Rellena este campo.']

function validate(){
  console.log('pass', passpatt.test(data.password))
const valida = [!data.password, !data.username, (data.email && emailpatt.test(data.email)===false), userpatt.test(data.username)===false, passpatt.test(data.password)===false]
  console.log('VALIDADADDADDDADAREHRBHRBRJ',valida)
  if(valida.includes(true)){
    toast('Por favor revise los campos.', {
              type: 'error',
              pauseOnHover: false,
              pauseOnFocusLoss: false
            })
    return
  } else{
    submit()
  }



}
</script>

<template>

    <v-form @submit.prevent="validate" validate-on="validate">
      <v-text-field v-model="data.username" label="Usuario" required :rules="rules" id="user" class="mb-2"></v-text-field>
      <v-text-field v-model="data.email" label="Correo electronico (opcional)" id="email" class="mb-2" type="email"></v-text-field>
      <v-text-field hint="1 letra mayúscula, 1 letra minúscula, 1 número, 1 caracter especial ( !@#$%^&*()\-_=+{};:,<.> )" v-model="data.password" label="Contraseña" required :rules="rules" id="password" class="mb-2" type="password"></v-text-field>

      <v-btn type="submit" class="mx-auto my-3 d-flex justify-center" :disabled="!data.username||!data.password">Registrar</v-btn>


    </v-form>
    

</template>