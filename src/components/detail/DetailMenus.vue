<template>
  <div class="DetailMenu">
    <span class="name">
      {{ menu.food_name}}
    </span>
    <span class="price">
      {{ menu.food_price }}
    </span>
  </div> 
</template>

<script setup lang="ts">
import { MenuContent } from '../../api/type';

interface DetailMenusProp {
  menu: MenuContent
}

const { menu } = defineProps<DetailMenusProp>()

// https://1mini2.tistory.com/88
</script>

<style lang="scss" scoped>
.DetailMenu {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .name {
    font-size: 18px;
  }    
}
</style>