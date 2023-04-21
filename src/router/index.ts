import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import MainPage from '../pages/MainPage.vue'
import SearchResult from '../pages/SearchResult.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/result',
        component: SearchResult
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router