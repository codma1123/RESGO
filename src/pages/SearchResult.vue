<script setup lang="ts">
import { computed, onMounted } from 'vue';
import AppHeader from '../layouts/AppHeader.vue'
import { useStore } from '../store';


const { imgUrl, searchTags, imgTags, states } = useStore()

const tags = computed<string[]>(() => states.imgTags.flat())


onMounted(() => {
    console.log(states.imgTags)
})

</script>

<template>
    <AppHeader />
    <v-container>
        <div class="tag-wrapper">
            <v-img 
                class="img"
                :src="imgUrl"
            />
            <div class="chip-wrapper">
                <v-chip
                    size="x-large"
                    class="chip"
                    label 
                    v-for="(tag, i) in tags" :key="i"
                >
                    # {{ tag }}
                </v-chip>
            </div>
        </div>
    </v-container>
</template>

<style lang="scss" scoped>
.tag-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
    padding: 50px;

    .img {
        overflow: visible;
        width: 300px !important; 
        height: 300px !important;
    }

    .chip-wrapper {
        margin-top: 10px;
        display: flex;
        gap: 10px;

        .chip {
            border-radius: 1rem;
        }
    }
}


</style>