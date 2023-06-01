<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
  <v-sheet 
    class="Header"
    height="13"
    width="100%"
    color="#693D0D"
  >

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