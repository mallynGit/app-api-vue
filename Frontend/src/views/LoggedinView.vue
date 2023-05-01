<script setup>

import 'vue3-toastify/dist/index.css'
import {userStore} from '@/stores'
const store = userStore()
console.log(store.username)





</script>

<template>

<v-sheet>
    Email: {{ store.getEmail }}<br/>
    Username: {{ store.getUsername }}

</v-sheet>

<v-form>
    <v-text-field v-model="store.username" label="user" required id="user" class="mb-2" :value="store.getUsername" lazy></v-text-field>

    <v-row>
        <v-btn type="submit" class="mx-auto">Update</v-btn>
    </v-row>
</v-form>
</template>

<style>
:root{

    --toastify-color-progress-colored: rgb(29, 179, 29);  
}

</style>