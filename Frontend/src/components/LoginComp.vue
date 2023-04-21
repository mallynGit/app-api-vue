<script setup>
import {userStore} from '@/stores'
const store = userStore()


</script>

<template>

<v-sheet>
    Email: {{ store.getEmail }}<br/>
    Username: {{ store.getUsername }}

</v-sheet>

</template>

<style scoped>



</style>