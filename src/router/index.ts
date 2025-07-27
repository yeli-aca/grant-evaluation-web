import { createRouter, createWebHistory } from 'vue-router'
import ResultPage from '@/pages/ResultPage.vue'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
  ],
})

export default router
