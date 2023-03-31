<template>
  <v-file-input
    class="FileInput"
    label="사진을 선택해주세요."
    accept="image/png, image/jpeg, image/bmp"
    prepend-icon="mdi-camera"
    @change="imgChange"
    v-model="imgs"
    variant="solo"
  />

  <div class="ImgBox">
    <v-img         
      v-if="imgs.length" 
      :src="img" 
    />
  </div>       
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../store';

const img = ref<string>()
const imgs = ref<File[]>([])

const { submitImg, states } = useStore()
const emit = defineEmits<{
  (e: 'img-change', value: string): void
}>()

const imgChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if(!(target.files instanceof FileList)) return
  const url = URL.createObjectURL(target.files[0])
  img.value = url
  emit('img-change', img.value)
  
}
</script>

<style scoped>
.FileInput {
  width: 300px;  
}

.ImgBox {
  height: 250px;
  margin-left: 43px;
  margin-top: 20px;
  border-radius: 10%;
  outline: 5px dashed rgb(210, 202, 202);
  background-color: rgb(193, 198, 240);
  opacity: .0;
  width: 250px;
  animation: fade-in;
  animation-duration: .5s;
  animation-delay: 1.5s;
  animation-fill-mode: forwards;
  display: flex; 
  padding: 1rem;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
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
  max-width: 300px;
  max-height: 400px !important;
}



</style>