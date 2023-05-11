<script setup>
import 'vue3-toastify/dist/index.css'
import { userStore } from '@/stores'
import { onMounted, reactive } from 'vue'

const store = userStore()
console.log(store)

var react = reactive({
  data: ''
})

onMounted( async() => {
  react.data = store.data
  console.log('react', react.data)
})





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
