<script setup>
import { api } from '@/middleware'
import 'vue3-toastify/dist/index.css'
import { userStore } from '@/stores'
import { onMounted, reactive } from 'vue'
const store = userStore()
console.log(store.username)

var react = reactive({
  data: ''
})

onMounted( async() => {
  get()
})

async function get() {
  const results = JSON.parse(JSON.stringify((await api.get(`getUser/${store.id}`)).data[0]))
  console.log(results)
  delete results.password
  Object.keys(results).forEach(key => {
    if(results[key]===null || results[key]===''){
      results[key] = 'null'
    }

  });

  react.data = results
}
</script>

<template>


  <template v-for="(value, key) in react.data">
    <!--eslint-disable-next-line vue/valid-v-for--> 
    <v-row class="mx-3 py-1">{{ key }}: {{ value }}</v-row>
    
  </template>


</template>

<style>
:root {
  --toastify-color-progress-colored: rgb(29, 179, 29);
}
</style>
