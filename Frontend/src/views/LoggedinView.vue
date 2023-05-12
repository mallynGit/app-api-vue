<script setup>
import 'vue3-toastify/dist/index.css'
import { userStore } from '@/stores'
import { onMounted, reactive } from 'vue'
import {api} from '@/middleware'

const store = userStore()
console.log(store)

var react = reactive({
  data: '',
  imageUp: null,
  image:null,
})

onMounted( async() => {
  react.data = store.data
  console.log('react', react.data.id)
  getImg()
})

function test(){
  const formData = new FormData()
formData.append('image', react.imageUp)
console.log(react.imageUp)
}

function onFileChange(event){
  react.imageUp = event.target.files[0]
}

async function getImg(){
  if(react.data.id){
  console.log('JEJEJEJEJEE',react.data)
  
  api
  .get(`getImg/${react.data.id}`)
  .then((res)=>{
    react.image = `data:image/png;base64,${res.data}`
    console.log('VAAAAAAAAAAAAAAAAAAAAAAAA',react.image)
    return react.image
    
  }).catch((err)=>{
    console.log(JSON.stringify(err));
  })
  }
}

</script>

<template>


  <template v-for="(value, key) in react.data">
    <!--eslint-disable-next-line vue/valid-v-for--> 
    <v-row class="mx-3 py-1" v-if="key!=='img'">{{ key }}: {{ value }}</v-row>
    
      
    
    

  </template>
  <v-row class="mx-3 py-1">
        <img :src="react.image"/>
      </v-row>
      <form @submit.prevent="test" class="mx-3 py-3">
      <input type="file" @change="onFileChange"/>
      <v-btn type="submit">Upload</v-btn>
      </form>

</template>

<style>
:root {
  --toastify-color-progress-colored: rgb(29, 179, 29);
}
</style>
