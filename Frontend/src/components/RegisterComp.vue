<script setup>

import { reactive } from 'vue'
import {useAuthStore} from '@/services'
const data = reactive({
  username: '',
  password: '',
  email: '',
})




const rules = [(v) => !!v || 'Rellena este campo.']

</script>

<template>
  <div>
    <v-form @submit.prevent="useAuthStore().registrarUsuario(data)">
      <v-text-field v-model="data.username" label="user" required :rules="rules" id="user" class="mb-2"></v-text-field>
      <v-text-field v-model="data.email" label="email" :rules="rules" id="email" class="mb-2"></v-text-field>
      <v-text-field v-model="data.password" label="pass" required :rules="rules" id="password" class="mb-2" type="password"></v-text-field>
      <v-row class="my-3">
      <!--:disabled="!data.usuario||!data.password"-->
      <v-btn type="submit" class="mx-auto"  :disabled="!data.username||!data.password">Registrar</v-btn>
      </v-row>

    </v-form>
    
  </div>
</template>