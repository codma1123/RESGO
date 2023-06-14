<template>
  <div class="title-warpper">
    <VCardTitle class="font-weight-bold text-primary"> 
      {{ currentStore.title }}
      <span 
        v-if="star" 
        class="star"
      >
        {{ star }} / 5.0 
        <v-icon class="mb-1">
          mdi-star
        </v-icon>
      </span>
    </VCardTitle>

    <VCardSubtitle>
      {{ currentStore.address }}
      <v-icon size="x-small" class="copy" @click="onIconClick">
        mdi-content-copy
      </v-icon>        
    </VCardSubtitle>

    <VCardText>
      {{ storeDetail.data?.openTime}}
    </VCardText>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ResultItem, LatLng } from '../../api';
import { useStore } from '../../store';

const { currentStore } = defineProps<{ currentStore: ResultItem & LatLng }>()
const { asyncStates: { storeDetail } } = useStore()

const onIconClick = (): void => {
  navigator.clipboard.writeText(currentStore.address.split(' ').slice(0, 4).join(' '))
}

const star = computed(() => storeDetail.data?.star)

</script>

<style scoped lang="scss">
.title-warpper {    
  width: 350px;
}

.star {
  font-size: 14px;
  color: red;
  opacity: .5;    
}

.copy {
  cursor: pointer;;
}
</style>