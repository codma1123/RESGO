<template>
  <VContainer class="SearchDetail" v-if="!storeDetail.loading">
    
    <DetailTitle :currentStore="currentStore" />

    <DetailMenu />

    <NaverMap 
      class="mt-10"
      :markerData="[currentStore]"
    />

    <DetailSimilar :currentStore="currentStore" />
    
  </VContainer>

  <VProgressCircular 
    v-else 
    class="ProgressCircular"
    model-value="80"
    color="secondary"
    indeterminate
  />
</template> 

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../store';
import { ResultItem, LatLng } from '../api/type';
import NaverMap from '../components/result/NaverMap.vue';
import DetailTitle from '../components/detail/DetailTitle.vue'
import DetailMenu from '../components/detail/DetailMenu.vue'
import DetailSimilar from '../components/detail/DetailSimilar.vue';

const { 
  asyncStates: { naverLocationSearchResult, storeDetail },
  states,  
} = useStore()

const currentStore = computed<ResultItem & LatLng>(() => 
  naverLocationSearchResult.data?.find((result) => result.id === states.selectedStoreId)!
)


</script>

<style lang="scss" scoped>
.SearchDetail {
  margin-top: 40px;  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
}

.result-card-wrapper {
  width: 500px;
  padding-right: 40px;
  padding-left: 40px;   
  display: flex;
  justify-content: center;    
  align-items: center;
  flex-direction: column;
}

.ProgressCircular {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>