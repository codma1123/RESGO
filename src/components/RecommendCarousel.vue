<template>
  <v-carousel
    cycle
    height="50"
    class="carousel"
    hide-delimiter-background
    direction="vertical"
    :show-arrows="false"
    hide-delimiters
  >
    <template v-if="!recommends.loading">
      <!-- <v-carousel-item
        v-for="{ rank, title } in ranks"
        :key="rank"
        inline
        class="item"
      >
        <span class="text-item">
          {{ title }}
        </span>
      </v-carousel-item>
      <div class="label">이슈 검색어</div> -->
      {{ ranks }}
    </template>
  </v-carousel>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../store';

const {
  asyncStates: { recommends },
} = useStore();

type Rank = {
  rank: number;
  title: string;
};
const ranks = computed<Rank[]>(
  () =>
    recommends.data?.map((recommend, i) => ({
      rank: i,
      title: recommend,
    })) ?? []
);
</script>
<style lang="scss" scoped>
.carousel {
  height: 100px;
  padding-left: 100px;
  position: relative;

  .item {
    top: 20%;
  }
  .text-item {
    margin-left: 100px;
    margin-top: 100px;
  }
}

.label {
  position: absolute;
  background-color: #47cfd8;
  color: white;
  left: 0%;
  top: 10%;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 15px;
  border-radius: 10px;
}
</style>
