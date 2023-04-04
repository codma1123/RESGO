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

<style lang="scss">
$chip-border-radius: 0px !important;
::-webkit-scrollbar {
  width: 0px;
}

.wf-active {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
}

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}

.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}

.fade-leave-active,
.fade-enter-active {
  transition: opacity .5s;
}


</style>
