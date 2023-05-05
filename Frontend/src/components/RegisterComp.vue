<script setup>

import { reactive } from 'vue'
import {useAuthStore} from '@/services'
import { toast } from 'vue3-toastify';
const data = reactive({
  username: '',
  password: '',
  email: '',
})

function submit(){
  useAuthStore().registrarUsuario(data)
}

// const pattern= /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]{2,4})*/
// const pat2=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
const pat3=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-].[a-zA-Z0-9-]*$/
const pat4=/^[^\s@]+@[^\s@]+\.([^\s@]{2,4})+$/
const rules = [(v) => !!v || 'Rellena este campo.']
// const emailRules = [(v) => !!v || 'Rellena este campo.']

function validate(){

  if(!data.password || !data.username || pat4.test(data.email)===false){
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
      <v-text-field v-model="data.password" label="Contraseña" required :rules="rules" id="password" class="mb-2" type="password"></v-text-field>

      <v-btn type="submit" class="mx-auto my-3 d-flex justify-center" :disabled="!data.username||!data.password">Registrar</v-btn>


    </v-form>
    

</template>