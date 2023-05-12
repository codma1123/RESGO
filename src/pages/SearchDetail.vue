<template>
  <VContainer class="SearchDetail">
    <VCardTitle>
      {{ currentStore.data }}
    </VCardTitle>
  </VContainer>
</template> 

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '../store';

const { asyncStates: { currentStore, currentPosition }, loadAddressByLocation, loadLocationByAddress } = useStore()

onMounted(() => {
  if(!currentPosition.data) return
  loadAddressByLocation(currentPosition.data)
  loadLocationByAddress(currentStore.data.address)
})

</script>

<style lang="scss" scoped>
.SearchDetail {
  margin-top: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>