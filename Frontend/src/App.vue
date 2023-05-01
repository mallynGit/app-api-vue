<script setup>
// import {router} from '@/router'
import {toast} from 'vue3-toastify'
import {userStore} from '@/stores'
const store = userStore()

function desloguear(){
  store.logout()
  toast('Sesion cerrada correctamente.', {type: 'success', pauseOnHover: false, pauseOnFocusLoss: false})
}




</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title><v-btn to="/">Menu</v-btn></v-app-bar-title>

      <v-btn to="/login">Login</v-btn>
      <v-btn to="/loggedin">Account</v-btn>
      <v-btn @click="desloguear">Logout</v-btn>
      <v-btn to="/test">Test</v-btn>
    </v-app-bar>

    <v-main class="mt-6 bg-red">
      <v-container fluid>


        <router-view></router-view>

    </v-container>
      
    </v-main>
  </v-app>
</template>

<style>

.v-main{
    width:66dvw;
}

div > .v-application__wrap {
    flex-direction: unset;
  }


#app{
  display: unset !important;
}
</style>
