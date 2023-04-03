<template>
  <div class="Main">
    <div class="Logo">
      LOGO
    </div>    
    <div class="Input">
      <InputTags v-model:tags="tags"/>
      <InputImg 
        @img-change="imgChange"
      />
    </div>    
    <v-btn 
      class="SubmitBtn"
      variant="elevated"
      @click="btnClick"
    >
      제출
    </v-btn>
  </div>
  <SnackBar 
    v-model:snackBar="snackBar"
    @clicked="snackBar = false"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useStore } from '../store'
  import InputImg, { ImgChangeType } from './InputImg.vue'
  import InputTags from './InputTags.vue'
  import SnackBar from './SnackBar.vue'
  import { VImg } from 'vuetify/components'

  const { submitImg, predictImg } = useStore()

  const img = ref<string>('')
  const imgObj = ref<VImg>()
  const tags = ref<string[]>([])
  const snackBar = ref<boolean>(false)

  const imgChange = (e: ImgChangeType) => {
    console.log(e)
    img.value = e.img
    imgObj.value = e.imgObj
  }
  
  const btnClick = (): void => {    
    if((!img.value && tags.value?.length === 0) || !imgObj.value?.image) {
      snackBar.value = true
      return
    }
        
    predictImg(imgObj.value.image)
    
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
  animation-name: fade-in;
  animation-duration: 1s;  
  letter-spacing: .5rem;
}

.Input {
  animation-duration: .5s;
  animation-delay: 1s;  
  animation-name: slide-in;  
  animation-fill-mode: forwards;
  transform: translateY(700px);
  margin-right: 40px;
  margin-top: 10px;
}

.SubmitBtn {
  margin-top: 50px;
  font-size: 20px;
  transition: .5s;
  background-color: white;
  color: black !important;
  animation-name: up;
  animation-duration: .5s;
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

  .SubmitBtn:hover {
    height: calc(100px + 3%) !important;
  }
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

@keyframes slide-in {
  0% {    
    transform: translateX(1700px);
  }

  100% {
    transform: translateX(0px);
  }
}

@keyframes up {
  0% {
    transform: translateY(700px);
  }

  100% {
    transform: translateY(0px);
  }
}


</style>