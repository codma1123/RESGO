<template>
  <div class="result-card-wrapper">
    <VCardTitle class="mt-10">
      <span class="font-weight-bold text-primary">
        {{ currentStore.title }}
      </span>
      <span> 
        과(와) 유사한 가게들입니다.
      </span>
    </VCardTitle>

    <ResultCard
      v-for="store in recommendStores" 
      :key="store.id"
      :store="store"
      @click="onStoreSelect(store.id)"
    />        
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ResultItem, LatLng } from '../../api';
import { useStore } from '../../store';
import { computed } from 'vue';
import ResultCard from '../result/ResultCard.vue';

const { currentStore } = defineProps<{ currentStore: ResultItem & LatLng }>()

const { 
  states, 
  asyncStates: { naverLocationSearchResult },
  loadStoreDetail
} = useStore()

const router = useRouter()

const onStoreSelect = (storeId: number) => {
  // 상세 검색 스토어를 미리 변경시킵니다.
  states.selectedStoreId = storeId
  const currentStore = naverLocationSearchResult.data?.find((result) => result.id === states.selectedStoreId)!
  const address = currentStore.address.split(' ').slice(0, 4).join(' ')
  const title = currentStore.title
  loadStoreDetail(`${title} ${address}`)
  router.push(`/detail/${storeId}`)
}

const recommendStores = computed<(ResultItem & LatLng)[]>(() => {
  return naverLocationSearchResult.data?.filter(store => store.id !== currentStore.id) || []
})

</script>

<style scoped>
.similar-wrapper {
  width: 500px;
  padding-right: 40px;
  padding-left: 40px;   
  display: flex;
  justify-content: center;    
  align-items: center;
  flex-direction: column;
}
</style>