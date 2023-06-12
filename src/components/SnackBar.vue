<template>
  <v-snackbar 
    :model-value="prop.snackBar"
    timeout="1000"
    elevation="0"
    color="white"
    class="SnackBar"
    @update:model-value="emit('snackBarClose')"
  >
    이미지 또는 태그를 등록해주세요.
    <template v-slot:actions>
      <v-btn
        class="CloseBtn"
        color="red"
        variant="text"
        @click="emit('snackBarClose')"
      >
        닫기
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">

const prop = defineProps<{ snackBar: boolean }>()
const emit = defineEmits<{ (e: 'snackBarClose'): void }>()

</script>
