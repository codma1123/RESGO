<template>
  <VCardText class="menu-wrapper"> 
    <DetailMenus 
      v-for="(menu, i) in storeDetail.data?.lists"
      :menu="menu"
      :key="i"
    />
  </VCardText>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '../../store';
import DetailMenus from './DetailMenus.vue';

const { asyncStates: { storeDetail } } = useStore()

onMounted(() => console.log('mount'))
</script>

<style scoped>
.menu-wrapper {
  width: 350px;
}
</style>