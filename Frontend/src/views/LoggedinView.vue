<script setup>
import { api } from '@/middleware'
import 'vue3-toastify/dist/index.css'
import { userStore } from '@/stores'
import { reactive } from 'vue'
const store = userStore()
console.log(store.username)

var react = reactive({
  data: ''
})

async function get() {
  const results = JSON.parse(JSON.stringify((await api.get(`getUser/${store.id}`)).data[0]))
  console.log(results)
  delete results.password
  react.data = results
}
</script>

<template>
  <v-sheet>
    Email: {{ store.getEmail }}<br />
    Username: {{ store.getUsername }}<br />
    ID: {{ store.id }}
  </v-sheet>
  <br />
  <template v-for="(value, key) in react.data">
    <!--eslint-disable-next-line vue/valid-v-for--> 
    <v-sheet>
    <v-row class="ma-1">{{ key }}: {{ value }}</v-row>
    </v-sheet>
  </template>
  <br />

  <v-row>
    <v-btn class="mx-auto" @click="get">Get</v-btn>
  </v-row>
</template>

<style>
:root {
  --toastify-color-progress-colored: rgb(29, 179, 29);
}
</style>
