<script setup>
import {router} from '@/router'
import {toast} from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import {default as verifyToken} from '../middleware/auth'

const token = localStorage.getItem('token')

if(!token){
    notify('No estas logueado')
    router.push('/login') 
}

function notify(msg){
toast(msg, {pauseOnHover: false, autoClose: 10500, theme: 'colored'})
}

</script>

<template>

<div class="text-center">
<v-btn @click="notify('todo va bien')">holi</v-btn>
</div>
</template>

<style>
:root{

    --toastify-color-progress-colored: rgb(29, 179, 29);  
}

</style>