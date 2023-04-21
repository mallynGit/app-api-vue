<script setup>
import {router} from '@/router'
import {userStore} from '@/stores'
const store = userStore()

function log(){
  console.log(store.getUsername)
}

</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title><v-btn to="/">Menu</v-btn></v-app-bar-title>

      <v-btn to="/login">Login</v-btn>
      <v-btn to="/loggedin">Logged in</v-btn>
      <v-btn @click="log">Logout</v-btn>
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
