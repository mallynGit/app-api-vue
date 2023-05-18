<script setup>
import 'vue3-toastify/dist/index.css'
import { userStore } from '@/stores'
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { api } from '@/middleware'


const store = userStore()
console.log(store)

var react = reactive({
  data: '',
  imageUp: null,
  image: null
})

onBeforeMount(async () => {

  console.log("BEFORE MOUNT LOGGEDIN")

  returnUserData()
  console.log(react.data,'123321')
})

onMounted(async () => {
  
  console.log('react', react.data, 'holi')
  
  getImg()

})

async function returnUserData(){

react.data = await store.get()
console.log(react.data,'porfin')
}

function test() {
  const formData = new FormData()
  formData.append('image', react.imageUp)
  formData.append('id', store.data.id)
  console.log('Imagen subida: ', react.imageUp)
  api
    .post('uploadImg', formData)
    .then(() => {
      getImg()
    })
    .catch((err) => {
      console.log('algo fallo', err)
    })
}

function onFileChange(event) {
  react.imageUp = event.target.files[0]
}

async function getImg() {
  if (store.data.id) {
    api
      .get('getImg', { params: { id: store.data.id } })
      .then((res) => {
return res
       // react.image = `data:${res.data.ext};base64,${res.data.img}`

      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const fileInput=ref(null)
const isHovering=ref(false)
function selectFile(){
  fileInput.value.click()
}
</script>

<template>

  <v-row class="mx-3 py-1">


  </v-row>
  
  <template v-for="(value, key) in react.data">
  
    
    <template v-if="key==='img'">
      <!--eslint-disable-next-line vue/valid-v-for-->
    <v-row class="mx-3 py-1" style="display: flex; align-items: center;">
    imagen:
    <img :src="react.data.img" width="100" height="100" class="mx-4" @click="selectFile" 
    :style="{'cursor': isHovering ? 'pointer' : 'default'}"
    @mouseenter="isHovering = true" @mouseleave="isHovering = false"/>
    <form @submit.prevent="test">
    <v-btn type="submit" :style="{'display': react.imageUp ? 'initial' : 'none'}">Upload</v-btn>
    <input type="file" @change="onFileChange" ref="fileInput" style="display:none;"/>
    </form>
  </v-row>
  </template>
<!--eslint-disable-next-line vue/valid-v-for-->
    <v-row class="mx-3 py-1" v-if="key !== 'img'">{{ key }}: {{ value }}</v-row>
  </template>
</template>

<style>
:root {
  --toastify-color-progress-colored: rgb(29, 179, 29);
}
</style>
