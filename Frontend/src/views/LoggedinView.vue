<script setup>
import 'vue3-toastify/dist/index.css'
import { userStore } from '@/stores'
import { onMounted, reactive, ref } from 'vue'
import { api } from '@/middleware'
const fr = new FileReader()

const store = userStore()
console.log(store)

var react = reactive({
  data: '',
  imageUp: null,
  image: null
})

onMounted(async () => {
  react.data = store.data
  console.log('react', react.data.id)
  getImg()
})

function test() {
  const formData = new FormData()
  formData.append('image', react.imageUp)
  formData.append('id', react.data.id)
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
  if (react.data.id) {
    api
      .get(`getImg`, { params: { id: react.data.id } })
      .then((res) => {

        react.image = `data:${res.data.ext};base64,${res.data.img}`
        console.log('Imagen de perfil: ', react.image)
        return react.image
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
  <v-row class="mx-3 py-1" style="display: flex; align-items: center;">
    imagen:
    <img :src="react.image" width="100" height="100" class="mx-4" @click="selectFile" 
    :style="{'cursor': isHovering ? 'pointer' : 'default'}"
    @mouseenter="isHovering = true" @mouseleave="isHovering = false"/>
    <form @submit.prevent="test">
    <v-btn type="submit" :style="{'display': react.imageUp ? 'initial' : 'none'}">Upload</v-btn>
    <input type="file" @change="onFileChange" ref="fileInput" style="display:none;"/>
    </form>
  </v-row>
  <v-row class="mx-3 py-1">


  </v-row>
  
  <template v-for="(value, key) in react.data">
    <!--eslint-disable-next-line vue/valid-v-for-->
    <v-row class="mx-3 py-1" v-if="key !== 'img'">{{ key }}: {{ value }}</v-row>
  </template>
</template>

<style>
:root {
  --toastify-color-progress-colored: rgb(29, 179, 29);
}
</style>
