<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
  <v-sheet 
    class="Header"
    height="50"
    width="100%"
    color="#ffffff"
  >
    <v-card-title 
      class="logo"
      @click="router.push('/')"      
    >
      RESGO
    </v-card-title>        
  </v-sheet>
</template>

<style lang="scss">
.Header {
  position: fixed;
  display: flex;
  z-index: 1;
  justify-content: flex-end;
  align-items: flex-end;
}

.logo {  
  cursor: pointer;
  margin-left: 20px;
  font-weight: bold;
}

</style>