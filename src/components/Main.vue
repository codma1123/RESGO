<template>
  <div class="Main">
    <template v-if="!asyncStates.model.loading">
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
        elevation="0"
        @click="btnClick"
      >
        제출
      </v-btn>
    </template>
    <template v-else>
      <div class="LoadingCircular">
        <v-progress-circular 
          :size="30"
          color="white"
          indeterminate 
        />      
        <div class="mt-5">
          모델을 불러오는 중입니다.
        </div>
      </div>
    </template>

  </div>
  <SnackBar 
    v-model:snackBar="snackBar"
    @clicked="snackBar = false"
  />
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useStore } from '../store'
  import InputImg, { ImgChangeType } from './InputImg.vue'
  import InputTags from './InputTags.vue'
  import SnackBar from './SnackBar.vue'
  import { VImg } from 'vuetify/components'

  const { predictImg, loadModel, asyncStates } = useStore()

  const img = ref<string>('')
  const imgObj = ref<VImg>()
  const tags = ref<string[]>([])
  const snackBar = ref<boolean>(false)

  const imgChange = (e: ImgChangeType) => {
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

  onMounted(() => {
    loadModel()
  })

</script>

<style scoped lang="scss">
.Main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  position: relative;
  height: 100vh;
  height: -webkit-fill-available;
  height: fill-available;
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
  margin-top: 10px;
}

.SubmitBtn {
  margin-top: 50px;
  font-size: 20px;
  transition: .3s;
  background-color: rgb(242, 252, 253);
  color: black !important;
  animation-name: up;
  animation-duration: .5s;
  animation-timing-function:cubic-bezier(0.28, 0.5, 0.265, 0.7);
}

.LoadingCircular {
  position: absolute;
  text-align: center;
  font-size: 15px;
  margin-top: 350px;
}
	
@media (max-width: 800px) {
  .SubmitBtn {
    position: fixed;
    bottom: 40px;
    width: 80%;

    // display: none;
    height: 50px !important;
    border-radius: 15px;
    // border-top-right-radius: 15px;
    // border-top-left-radius: 15px;    
  }  

  .Logo {
    display: none;
    font-size: 80px;
    padding-top: 0;
  }

  .Input {
    margin-top: 120px;
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