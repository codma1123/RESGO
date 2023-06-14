<template>
  <div class="Main">

    <!-- 로고 -->
    <img class="logoImg" src="../../public/logov3.svg"/>

    <!-- 순위 -->
    <!-- <RecommendCarousel /> -->
  
    <!-- 이미지 입력 -->
    <InputImg @imgChange="onImgChange"/>
    
    <!-- 제출 버튼 -->
    <VBtn 
      class="SubmitBtn"
      color="primary"
      elevation="0"
      @click="onBtnClick"
    >
      제출
    </VBtn>
  </div>
  
  <SnackBar 
    :snackBar="snackBarEnable"
    @snackBarClose="snackBarEnable = false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../store'
import InputImg, { ImgChangeType } from '../components/InputImg.vue'
import SnackBar from '../components/SnackBar.vue'
import { useRouter } from 'vue-router'
import RecommendCarousel from '../components/RecommendCarousel.vue'

const { 
  requestKakao, 
  requestNaver, 
  states,
} = useStore()

const router = useRouter()

const uploadFile = ref<File | null>(null)
const snackBarEnable = ref(false)

const onImgChange = (e: ImgChangeType) => {
  states.imgUrl = e.img
  uploadFile.value = e.uploadFile
}

const onBtnClick = () => {
  if(!states.imgUrl || !uploadFile.value) {
    snackBarEnable.value = true
    return
  }

  router.push('/result')
  loadDetailContent(uploadFile.value)      
}

const loadDetailContent = async (file: File) => {  
  try {
    const query = await requestKakao(file)
    await requestNaver(query[0])
  } catch (e) {
    router
      .push('/')
      .then(() => snackBarEnable.value = true)
  }
}
  
</script>

<style lang="scss">
.Main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  height: -webkit-fill-available;
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  height: fill-available;
}

.logoImg {
  animation-name: fade-in;
  animation-duration: 1s;  
  margin-top: 1rem;
}

.SubmitBtn {
  font-size: 20px;  
  transition: .3s;
  margin-top: 100px;
  background-color: rgb(242, 252, 253);
  color: white !important;
  animation-name: fade-in;
  animation-duration: .5s;
  animation-timing-function: cubic-bezier(0.28, 0.5, 0.265, 0.7);
  width: 80%;
  height: 50px !important;
  border-radius: 15px;
  bottom: 40px;
  width: 70%;
  border-radius: 15px;
}

.LoadingCircular {
  position: absolute;
  text-align: center;
  font-size: 15px;
  margin-top: 350px;
}

</style>