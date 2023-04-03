<template>
  <v-app>
    <v-main>
      <Main />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import Main from './components/Main.vue'

onMounted(() => {
  if (sessionStorage.fonts) {
    document.documentElement.classList.add('wf-active')
  }
})
</script>

<style>
::-webkit-scrollbar {
  width: 0px;
}

.wf-active {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
}

</style>
