<template>
  <VContainer class="SearchDetail">
    <VCardTitle>      
      {{ currentStore.title }}
    </VCardTitle>
    <VCardSubtitle>
      {{ currentStore.address }}
    </VCardSubtitle>
  </VContainer>
</template> 

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from '../store';
import { ResultItem, LatLng } from '../api/type';

const { 
  asyncStates: { naverLocationSearchResult },
  states: { selectedStoreId },  
} = useStore()

const currentStore = computed<ResultItem & LatLng>(() => naverLocationSearchResult.data?.find((result) => result.id === selectedStoreId)!)

</script>

<style lang="scss" scoped>
.SearchDetail {
  margin-top: 40px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
</style>