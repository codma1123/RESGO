<template>  
  <div class="ImgBox">    
    <transition name="fade">
      <v-img
          v-if="imgs.length !== 0"
          class="Img"
          ref="imgObj"      
          :src="img"
        />
        <div v-else class="Input">
          <v-file-input
            class="FileInput"        
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon=""
            @change="imgChange"
            v-model="imgs"
            variant="plain"
          />      
          <span class="label">사진을 선택해주세요.</span>
        </div>
    </transition>

    <transition name="fade">
      <v-btn 
        v-if="imgs.length !== 0"
        density="compact"
        elevation="0"
        class="CloseBtn" 
        icon="mdi-close"
        @click="imgs = []"
      />
    </transition>
  </div>       
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { VImg } from 'vuetify/components';

export type ImgChangeType = {
  img: string
  imgObj: VImg
}

interface InputImgEmit {
  (e: 'img-change', value: ImgChangeType): void 
}

const img = ref<string>()
const imgs = ref<File[]>([])
const imgObj = ref<VImg>()

const emit = defineEmits<InputImgEmit>()

const imgChange = (e: Event) => nextTick(() => {  
  const target = e.target as HTMLInputElement
  if(!(target.files instanceof FileList) || !imgObj.value) return  
  const url = URL.createObjectURL(target.files[0])
  img.value = url
  
  emit('img-change', {
    img: img.value,
    imgObj: imgObj.value
  })  
})

</script>

<style scoped lang="scss">
.FileInput {
  width: 300px !important; 
  height: 300px !important;  
}

.ImgBox {
  height: 300px;
  width: 300px;
  font-size: 12px;
  position: relative;  
  border-radius: 10%;
  color: rgb(112, 103, 103);
  background-color: white;
  
  display: flex; 
  padding: 1rem;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  animation-fill-mode: forwards;
  transition: .5s;

  .Input {
    position: relative;
    text-align: center;
    
    .label {
      position: absolute;
      transition: .3s;
      top: 50%;
      left: 100px;
    }
  }  

  &:hover {
    .label {
      color: black;
    }
  }
}


@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}


.Img {
  max-width: 97%;
  max-height: 97% !important;
}

.CloseBtn {
  position: absolute;
  top: 15px;
  right: 15px;
}

</style>