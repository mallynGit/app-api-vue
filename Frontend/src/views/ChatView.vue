<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { userStore } from '@/stores'
import { api } from '@/middleware'

const store = userStore()
const date = new Date(Date.now())
const now = `${date.getUTCHours()}-${date.getUTCMinutes()}_${date.getUTCDate()}-${date.getUTCMonth() + 1}-${date.getUTCFullYear()}`

let socket = new WebSocket('ws://localhost:8080')
socket.onopen = () => {
  console.log('Conexión realizada, ID de usuario:', store.data.id)
}

const messages = ref([])
const proxy = ref([])

async function getMsg() {
  try {
    const response = await api.get('/getAllMsg')
    proxy.value = response.data

    return proxy.value
  } catch (err) {
    console.log(err)
  }
}

onBeforeMount(async () => {
  await getMsg()
})

onMounted(async () => {
  await getMsg()
  document.getElementById(`msg-${proxy.value.length}`).scrollIntoView()
})

const disconnect = () => {
  socket.close()
}

const connect = () => {
  socket = new WebSocket('ws://localhost:8080')
}

const sendmessage = async (msg) => {
  socket.send(msg)
  message.value=''
  console.log(messages.value.length)
  document.getElementById(`msg-${proxy.value.length}`).scrollIntoView()
}

socket.onmessage = async ({ data }) => {
  console.log(data)
  await getMsg()
  document.getElementById(`msg-${proxy.value.length}`).scrollIntoView()
}

const message = ref(null)

</script>

<template>
  <h1>Chat</h1>
  <v-sheet id="lista" style="min-height: 50px; max-height: 400px; overflow-y: scroll;" class="mb-5">
    <v-list>
      <template v-for="item in proxy" :key="item.id">
        <v-list-item :title="item.id" :subtitle="item.message" :id="'msg-' + item.id">

            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>

        </v-list-item>
      </template>
    </v-list>
  </v-sheet>
  <v-form @submit.prevent="sendmessage(`${store.data.id}, '${now}', '${message}'`)">
    <v-text-field v-model="message"></v-text-field>
    <v-btn>Enviar</v-btn>
    <v-btn @click="disconnect">Cerrar conexión</v-btn>
    <v-btn @click="connect">Iniciar conexión</v-btn>
  </v-form>
</template>
