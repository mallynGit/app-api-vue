<script setup>
import 'vue3-toastify/dist/index.css'
import { userStore } from '@/stores'
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { api } from '@/middleware'


const store = userStore()

var react = reactive({
  data: {},
  imageUp: null,
  image: null
})

var re=reactive({})

onBeforeMount(async () => {

  console.log("BEFORE MOUNT LOGGEDIN")

  returnUserData()
})

onMounted(async () => {
  
  getImg()
console.log('re',re);
})

async function returnUserData(){
Object.keys(store.data).forEach(key => {
  let p = key.charAt(0).toUpperCase() + key.slice(1)
  eval(`re.${p} = store.data[key]`)
  console.log(re)
  if(re.Id) delete re.Id
});
console.log(re,'porfin')
}

async function test() {
  const formData = new FormData()
  formData.append('image', react.imageUp)
  formData.append('id', store.data.id)
  console.log('Imagen subida: ', react.imageUp)
  api
    .post('uploadImg', formData)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log('algo fallo', err)
    })

}

function onFileChange(event) {
  if(event.target.files[0]===undefined) return
  react.imageUp = event.target.files[0]
  console.log(react.imageUp);
  const fr = new FileReader()
  fr.onload = ()=>{
    const srcData = fr.result
    re.Img = srcData
  }
  fr.readAsDataURL(react.imageUp)
}

async function getImg() {
  if (store.data.id) {
    api
      .get('getImg', { params: { id: store.data.id } })
      .then((res) => {
        console.log(res);
        re.Img = res.data.img
       // react.image = `data:${res.data.ext};base64,${res.data.img}`

      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const fileInput=ref(null)
const isHovering=ref(false)
const isEditing=ref(false)
function selectFile(){
  if(isEditing.value===true)fileInput.value[0].click()
}

</script>

<template>
  <div style="height: 50px;"></div>
       


  <v-col class="mx-3 py-1" style="display: flex; align-items: center; top:10px;z-index: 20;">
    <v-avatar size="125" color="rgba(0,0,0,0.5)" rounded="50%" style="border: 1px grey solid;" elevation="16" class="avatar">
    <v-img :src='re.Img' width="125" height="125" class="mx-4" @click="selectFile" 
    :style="{'cursor': isHovering && isEditing ? 'pointer' : 'default', 
    'opacity': isHovering && isEditing ? '0.5' : '1.0',
  }"
    @mouseenter="isHovering = true" @mouseleave="isHovering = false"/>
    </v-avatar>
    <template v-if="isEditing===true">
      <form @submit.prevent="test">
    <v-btn type="submit" :style="{'display': react.imageUp ? 'initial' : 'none'}">Upload</v-btn>
    <input type="file" @change="onFileChange" ref="fileInput" style="display:none;"/>
    </form>

    </template>
  </v-col>
  <v-sheet class="my-n16 pt-4">
  <div>
  <v-card  class="ma-2 py-3 pt-16" elevation="0">
  <template v-for="(value, key) in re">
  
    
    <template v-if="key==='Img'">
      <!--eslint-disable-next-line vue/valid-v-for-->

  </template>
<!--eslint-disable-next-line vue/valid-v-for-->
    <v-card-item class=" ml-1 py-0" v-if="key !== 'Img'" >
    <v-text-field :label="key" :value="value" active="true"></v-text-field></v-card-item>
  </template>
  <v-card-actions>
  <v-btn @click="isEditing = !isEditing" variant="outlined">Editar</v-btn>
  </v-card-actions>
  </v-card>
  </div>
  </v-sheet>
</template>

<style>
:root {
  --toastify-color-progress-colored: rgb(29, 179, 29);
}

</style>
