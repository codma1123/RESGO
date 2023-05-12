<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '../store';
import NaverMap from '../components/result/NaverMap.vue';
import { useRouter } from 'vue-router';
import { ResultItem } from '../api/type';

const { 
  asyncStates: { result, naverLocationSearchResult, currentPosition },
  states,
  resquestNaver,
  loadCurrnetStore
} = useStore()

const tags = computed<string[]>(() => result.data ?? [])

const { push } = useRouter()

const tagExpand = ref<boolean>(false)

const countedTags = computed<string[]>(() => {
  if(tags.value.length < 5) return tags.value
  return tagExpand.value ? tags.value : tags.value.slice(0, 5)
})

const onClickCard = (card: ResultItem) => {
  console.log(card)
  loadCurrnetStore(card)
  push(`/detail/${card.title}`)
}

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
          v-if="countedTags.length > 5"
          class="more"
          @click="tagExpand = !tagExpand"
        >
          {{ tagExpand ? '간단히' : '더보기' }}
        </div>
      </div>  
    </template>

    <VProgressCircular v-else class="ProgressCircular"/>

    <div class="result-wrapper" v-if="!result.loading && !currentPosition.loading">
      <VCardTitle>
        이미지 분석 결과를 토대로 검색해보았어요.
      </VCardTitle>
      <VCardSubtitle class="mb-5">
        <span class="font-weight-bold mr-1">
          {{ states.currentSearch }}
        </span>에 대한 검색 결과입니다.
      </VCardSubtitle>
      

      <div>
        <div 
          class="mt-5 result-card" 
          v-for="(data, i) in naverLocationSearchResult.data" 
          :key="i"
          @click="onClickCard(data)"
        >
          <VCardTitle>
            {{ data.title }}
          </VCardTitle>
          <VCardSubtitle>
            {{ data.address }}
          </VCardSubtitle>
        </div>
      </div>
      <NaverMap />
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

.result-card {
  cursor: pointer;
  opacity: .8;
  transition: .2s all;

  &:hover {
    opacity: 1;
  }
}

</style>