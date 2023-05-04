<script setup lang="ts">import { ref } from 'vue';


const logo = ref<any>('로고')


</script>

<template>
    <v-sheet 
        class="Header"
        height="50"
        width="100%"
    >
        <v-card-title>
            {{ logo }}
        </v-card-title>
            
    </v-sheet>

</template>

<style lang="scss">
.Header {
    position: fixed;
    display: flex;
    justify-content: end;
    align-items: end;
}

</style>