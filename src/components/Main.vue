<template>
  <div class="Main">
    <div class="Logo">
      LOGO
    </div>    
    <div class="Input">
      <InputTags v-model:tags="tags"/>
      <InputImg 
        @img-change="e => img = e"
      />
    </div>    
    <v-btn 
      class="SubmitBtn"
      variant="tonal"
      @click="btnClick"
    >
      제출
    </v-btn>
  </div>
  <v-snackbar 
    rounded="pill"
    v-model="snackBar"
    :timeout="timeout"
    elevation="24"
    class="SnackBar"    
  >
    이미지 또는 태그를 등록해주세요.
    <template v-slot:actions>
      <v-btn
        class="CloseBtn"
        color="red"
        variant="text"
        @click="snackBar = false"
      >
        닫기
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useStore } from '../store'
  import InputImg from './InputImg.vue'
  import InputTags from './InputTags.vue'

  const { submitImg } = useStore()

  const timeout = 1000

  const img = ref<string>('')
  const tags = ref<string[]>([])
  const snackBar = ref<boolean>(false)
  
  const btnClick = (): void => {
    if(!img.value && tags.value?.length === 0) snackBar.value = true      
    
    submitImg(img.value)
    img.value = ''   
    tags.value = []
  }

</script>

<style scoped>
.Main {
  height: 100vh;  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  position: relative;
}
.Logo {
  padding-top: 10vh;
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

.SubmitBtn {
  margin-top: 50px;
  font-size: 20px;
  transition: .5s;
}
	
@media (max-width: 800px) {
  .SubmitBtn {
    position: absolute;
    margin-top: 0px;
    bottom: 0px;
    width: 100%;
    height: 100px !important;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
    box-shadow: 0px 3px 3px 0px black;
  }
    
} 

</style>