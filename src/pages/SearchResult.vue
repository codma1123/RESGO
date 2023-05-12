<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '../store';
import NaverMap from '../components/result/NaverMap.vue';

const { 
  asyncStates: { result, naverLocationSearchResult, currentPosition },
  states,
  resquestNaver 
} = useStore()

const tags = computed<string[]>(() => result.data ?? [])

const tagExpand = ref<boolean>(false)

const countedTags = computed<string[]>(() => {
  if(tags.value.length < 5) return tags.value
  return tagExpand.value ? tags.value : tags.value.slice(0, 5)
})

</script>

<template>  
  <VContainer class="SearchResult">
    <template v-if="!result.loading && !currentPosition.loading">
      <div class="tag-wrapper">
        <VCardTitle value="이미지 분석 격롸">
          이미지 분석 결과
        </VCardTitle>      
  
        <VImg
          class="img"
          :src="states.imgUrl"
        />
  
        <div :class="['chip-wrapper', tagExpand ? 'wrap': '']" >
          <VChip
            class="chip"
            label
            color="black"
            variant="outlined"
            v-for="(tag, i) in countedTags" 
            @click="resquestNaver(tag)"
            :key="i"
          >
            {{ tag }}
          </VChip>
        </div>
  
        <div 
          class="more"
          @click="tagExpand = !tagExpand"
        >
          {{  tagExpand ? '간단히' : '더보기' }}
        </div>
      </div>  
      <NaverMap />
    </template>

    <VProgressCircular v-else class="ProgressCircular"/>



    <div class="result-wrapper" v-if="!result.loading && !currentPosition.loading">
      <VCardTitle>
        이미지 분석 결과를 토대로 검색해보았어요.
      </VCardTitle>
      <VCardSubtitle>
        {{ countedTags[0]}}에 대한 검색 결과입니다.
      </VCardSubtitle>
      <VCardText>
        <div class="mt-5" v-for="(data, i) in naverLocationSearchResult.data" :key="i">
          <VCardTitle>
            {{ data.title }}
          </VCardTitle>
          <VCardSubtitle>
          </VCardSubtitle>
        </div>
      </VCardText>
    </div>

  </VContainer>  
</template>

<style lang="scss" scoped>

.SearchResult {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.result-wrapper,
.tag-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  margin-top: 50px;  
  .img {
    min-width: 100% !important;
    border-radius: 1rem;
  }

  .chip-wrapper {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    gap: 5px;
    max-width: 100%;
    overflow-x: scroll;
    
    .chip {      
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all .2s;

      &:hover {
        color: rgb(165, 112, 112) !important;
      }
    }

    &.wrap {
      flex-wrap: wrap;
    }
  }  

  .more {
    align-self: flex-end;
    font-size: 12px;
    margin-top: .25rem;
    cursor: pointer;
  }  
}

.ProgressCircular {
  position: absolute;
  top: 50%;
  left: 50%;
}

</style>