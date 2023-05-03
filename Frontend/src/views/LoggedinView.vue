<script setup>
import {api} from '@/middleware'
import 'vue3-toastify/dist/index.css'
import {userStore} from '@/stores'
import { onMounted, reactive } from 'vue';
const store = userStore()
console.log(store.username)


reactive({
msg: '',
})

async function get() {
api.get(`getUser/${store.id}`)
}





</script>

<template>

<v-sheet>
    Email: {{ store.getEmail }}<br/>
    Username: {{ store.getUsername }}<br/>
    ID: {{ store.id }}

</v-sheet>
<br/>
<v-sheet>Get: {{ get() }}</v-sheet>
<br/>

    <v-row>
        <v-btn class="mx-auto" @click="get">Get</v-btn>
    </v-row>

</template>

<style>
:root{

    --toastify-color-progress-colored: rgb(29, 179, 29);  
}

</style>