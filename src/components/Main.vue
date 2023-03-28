<template>
  <div class="Main">
    <div class="Logo">
      LOGO
    </div>    
    <div class="Input">
      <InputTags />
      <InputImg />    
    </div>
  </div>
</template>


<script setup lang="ts">
import InputImg from './InputImg.vue'
import InputTags from './InputTags.vue'

</script>

<style scoped>
.Main {
  height: 100vh;  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
.Logo {
  padding-top: 20vh;
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

.Input {
  animation-duration: .5s;
  animation-delay: 1s;  
  animation-name: slide-in;  
  animation-fill-mode: forwards;
  transform: translateY(700px);
  margin-right: 40px;
}

@keyframes slide-in {
  0% {    
    transform: translateY(700px);
  }

  100% {
    transform: translateY(0px);
  }
}


</style>