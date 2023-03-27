<template>
    <v-combobox       
      class="ComboBox"
      label="태그를 입력해주세요."
      multiple
      chips
      variant="solo"
      closable-chips
      v-model="tags"
      prepend-icon="mdi-magnify"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
 
const tags = ref<string[]>([])
</script>

<style scoped>
.ComboBox { 
  color: black;
  width: 300px;  
}
</style>