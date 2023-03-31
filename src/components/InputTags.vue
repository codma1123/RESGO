<template>
    <v-combobox       
      class="ComboBox"
      label="태그를 입력해주세요."
      multiple
      chips
      variant="solo"
      closable-chips
      v-model="tag"
      prepend-icon="mdi-magnify"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue';


interface InputTagProp {
  tags: string[]
}

interface InputTagEmit {
  (e: 'update:tags', value: string[]): void
}

const prop = defineProps<InputTagProp>()
const emit = defineEmits<InputTagEmit>()

const tag = computed({
  get() {
    return prop.tags
  },

  set(value) {
    emit('update:tags', value)
  }
})
 
</script>

<style scoped>
.ComboBox { 
  color: black;
  width: 300px;  
}
</style>