<template>
  <div class="Main">
    <div class="Logo">
      LOGO
    </div>
    <InputTags />
  </div>
</template>

<script setup lang="ts">
import InputTags from './InputTags.vue'
</script>

<style scoped>
.Main {
  height: 100vh;
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
.Logo {
  color: black;
  font-weight: bold;
  font-size: 130px; 
  animation-duration: 1s;  
  letter-spacing: .5rem;
  animation-name: fade-in;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    letter-spacing: 0rem;
  }

  75% {
    opacity: 1;
  }

  100% {
    letter-spacing: .5rem;
  }
}

.ComboBox {
  
}


</style>