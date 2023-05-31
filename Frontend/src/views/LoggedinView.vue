<script setup>
import 'vue3-toastify/dist/index.css'
import { userStore } from '@/stores'
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { api } from '@/middleware'
import draggable from 'vuedraggable'
import {toast} from 'vue3-toastify'

const store = userStore()

var react = reactive({
  data: {},
  imageUp: null,
  image: null
})

var re = reactive({})

onBeforeMount(async () => {
  console.log('BEFORE MOUNT LOGGEDIN')

  returnUserData()
})

onMounted(async () => {
  getImg()
  console.log('re', re)
  re.Hobbies = []
})

async function returnUserData() {
  Object.keys(store.data).forEach((key) => {
    let p = key.charAt(0).toUpperCase() + key.slice(1)
    if (p != 'Hobbies') eval(`re.${p} = store.data[key]`)
    if (re.Id) delete re.Id
  })
  console.log(re, 'porfin')
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
  if (event.target.files[0] === undefined) return
  react.imageUp = event.target.files[0]
  console.log(react.imageUp)
  const fr = new FileReader()
  fr.onload = () => {
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
        console.log(res)
        re.Img = res.data.img
        // react.image = `data:${res.data.ext};base64,${res.data.img}`
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const fileInput = ref(null)
const isHovering = ref(false)
const isHoveringImg = ref(false)
const isEditing = ref(false)
const inputRef = ref()
function selectFile() {
  if (isEditing.value === true) fileInput.value[0].click()
}
const roles = ['Aficionado', 'Dueño', 'Veterinario', 'Entrenador', 'Casa de acogida']
const regexp = /^[a-zA-Z\s]+$/
function validateHobby(){
  
  if(regexp.test(inputRef.value)==false) {
    return
  }else{ 
    const arr = re.Hobbies
    arr.push({name: inputRef.value})
    console.log(re.Hobbies, '1297823686361831',arr);
    if(arr.length !== new Set(arr).size) console.log('PODEKRJAPSKNDLDOAKJj NOOOOOOOOOOO');
    // re.Hobbies.push({ name: inputRef.value }); inputRef.value = ''
  }
}

const dragging = false
</script>

<template>
  <div style="height: 50px"></div>

  <v-col class="mx-3 py-1" style="display: flex; align-items: center; top: 10px; z-index: 20">
    <v-avatar
      size="125"
      color="rgba(0,0,0,0.5)"
      rounded="50%"
      style="border: 1px grey solid"
      elevation="16"
      class="avatar"
    >
      <v-img
        :src="re.Img"
        width="125"
        height="125"
        class="mx-4"
        @click="selectFile"
        :style="{
          cursor: isHoveringImg && isEditing ? 'pointer' : 'default',
          opacity: isHoveringImg && isEditing ? '0.5' : '1.0'
        }"
        @mouseenter="isHoveringImg = true"
        @mouseleave="isHoveringImg = false"
      />
    </v-avatar>
    <template v-if="isEditing === true">
      <form @submit.prevent="test">
        <v-btn type="submit" :style="{ display: react.imageUp ? 'initial' : 'none' }">Upload</v-btn>
        <input type="file" @change="onFileChange" ref="fileInput" style="display: none" />
      </form>
    </template>
  </v-col>
  <v-sheet class="my-n16 pt-4">
    <div>
      <v-card class="ma-2 py-3 pt-16" elevation="0">
        <template v-for="(value, key) in re">
          <v-card-item class="ml-1 py-0" v-if="['Username', 'Email'].includes(key)" :key="key">
            <v-text-field
              :label="key"
              :value="value"
              active
              @input="value = $event.target.value"
              :disabled="!isEditing"
            ></v-text-field>
          </v-card-item>

          <v-card-item class="ml-1 py-0" :key="key" v-if="key === 'Gender'">
            <v-radio-group :disabled="!isEditing" inline>
              <v-radio label="Hombre" value="1" />
              <v-radio label="Mujer" value="2" />
              <v-radio label="No binario/otro" value="3" />
            </v-radio-group>
          </v-card-item>

          <v-card-item class="ml-1 py-0" :key="key" v-if="key === 'Role'">
            <v-select
              :label="key"
              :items="roles"
              :disabled="!isEditing"
              active
              :value="roles[roles.indexOf(re.Role)]"
            />
          </v-card-item>

          <v-card-item class="ml-1 py-0" :key="key" v-if="key === 'Hobbies'">
            <v-text-field
              label="Hobby"
              v-model="inputRef"
              @change="validateHobby()"
              :disabled="!isEditing"
              :rules="[(v)=> (!v || (regexp).test(v)==true) || 'Solo se permiten letras y espacios.']"
            ></v-text-field>

            <div>
            <draggable
              @start="dragging = true"
              @end="dragging = false"
              item-key="name"
              :list="re.Hobbies"
              class="list-group"
            >
              <!-- , width: (2*element.name.length)<=100 ? `${2*element.name.length}%` : '100%'} -->
              <template #item="{ element }">
                
                  
                  <v-btn
                    :style="{ cursor: isHovering ? 'move' : 'default', 'font-size': 'large' , width: '100%',left: '-10px'}" :disabled="!isEditing"
                    @mouseenter="isHovering = true" @mouseleave="isHovering = false" variant="outlined" class="my-1" @click="console.log(re.Hobbies)">
                    {{ element.name }}
                  </v-btn>
                  
                
              </template>
              </draggable>
              </div>

          </v-card-item>
        </template>

        <v-card-actions>
          <v-col>
            <v-btn @click="isEditing = true" variant="outlined" v-if="!isEditing">Editar</v-btn>
            <v-btn @click="isEditing = false" variant="outlined" v-if="isEditing">Guardar</v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn v-if="isEditing">Atras</v-btn>
          </v-col>
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
