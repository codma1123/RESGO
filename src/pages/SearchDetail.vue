<template>
  <VContainer class="SearchDetail">
    <VCardTitle>      
      {{ currentStore.title }}
    </VCardTitle>
    <VCardSubtitle>
      {{ currentStore.address }}
      <v-icon size="x-small" class="copy" @click="onIconClick">
        mdi-content-copy
      </v-icon>
    </VCardSubtitle>
    <VCardText>
      <template  v-if="!storeDetail.loading">
        {{  storeDetail.data }}
      </template>
        <VProgressCircular v-else class="ProgressCircular" />
    </VCardText>
  </VContainer>
</template> 

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from '../store';
import { ResultItem, LatLng } from '../api/type';

const { 
  asyncStates: { naverLocationSearchResult, storeDetail },
  states: { selectedStoreId },  
} = useStore()

const currentStore = computed<ResultItem & LatLng>(() => naverLocationSearchResult.data?.find((result) => result.id === selectedStoreId)!)

const onIconClick = (): void => {
  navigator.clipboard.writeText(currentStore.value.address.split(' ').slice(0, 4).join(' '))
}


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

.copy {
  cursor: pointer;;
}

.ProgressCircular {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>