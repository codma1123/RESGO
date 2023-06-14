<template>  
  <div :class="['ImgBox', imgs.length !== 0 ? 'active' : '']"  >    
    <v-img
      v-if="imgs.length !== 0"      
      :src="img"
    />

    <template v-else>
      <v-file-input
        class="file-input"
        accept="image/png, image/jpeg, image/bmp"
        prepend-icon=""
        @change="imgChange"
        v-model="imgs"
        variant="piain"
      />
      <img class="label" src="../../public/picture.svg">      
      <span>클릭하여 이미지를 넣어주세요.</span>      
    </template>             

    <v-btn 
      v-if="imgs.length !== 0"
      density="compact"
      elevation="0"
      class="CloseBtn" 
      icon="mdi-close"
      @click="imgs = []"
    />
  </div>       
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { VFileInput, VImg } from 'vuetify/components';

export type ImgChangeType = {
  img: string
  uploadFile: File
}

interface InputImgEmit {
  (e: 'img-change', value: ImgChangeType): void 
}

const img = ref<string>()
const imgs = ref<File[]>([])

const emit = defineEmits<InputImgEmit>()

const imgChange = (e: InputEvent) => nextTick(() => {
  const target = e.target as HTMLInputElement
  if(!(target.files instanceof FileList)) return  

  const uploadFile = target.files[0]
  const url = URL.createObjectURL(target.files[0])
  img.value = url
  
  emit('img-change', {
    img: img.value,
    uploadFile
  })  
})

</script>

<style scoped lang="scss">
.ImgBox {
  height: 350px;
  max-height: 350px;
  width: 350px;
  font-size: 12px;
  position: relative;  
  border-radius: 10%;  
  background-color: white;
  display: flex; 
  padding: 1rem;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  animation-fill-mode: forwards;
  border: 3px solid rgba(176, 180, 184, 0.4);
  box-sizing: border-box;
  
  &.active {
    border: none;    
  }
  
  .file-input {
    z-index: 100;
    width: 350px;
    height: 700px;
    margin-top: 350px;
  }
  .label {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -40%);
    transition: .3s;
    opacity: .05;
    margin: auto;
    z-index: 1;    
  }
  
  span {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, 0%);
    opacity: .8;
  }    

}
.CloseBtn {
  position: absolute;
  top: 15px;
  right: 15px;
}


@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

</style>