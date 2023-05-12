<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useStore } from '../store'
  import InputImg, { ImgChangeType } from '../components/InputImg.vue'
  import InputTags from '../components/InputTags.vue'
  import SnackBar from '../components/SnackBar.vue'
  import { VImg } from 'vuetify/components'
  import { useRouter } from 'vue-router'

  const { requestKakao, resquestNaver, states } = useStore()

  const router = useRouter()

  const img = ref<string>('')
  const uploadFile = ref<File>()
  const tags = ref<string[]>([])
  const snackBar = ref<boolean>(false)

  const imgChange = (e: ImgChangeType): void => {
    img.value = e.img
    uploadFile.value = e.uploadFile

  }
  
  const btnClick = async (): Promise<void> => {
    if(!img.value) {
      snackBar.value = true
      return
    }

    states.imgUrl = img.value

    router.push('/result')
    
    const query = await requestKakao(uploadFile.value!)
    await resquestNaver(query[0])
  }
  
</script>

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
        elevation="0"
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

<style lang="scss">
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