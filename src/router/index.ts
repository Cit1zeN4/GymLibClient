import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/GreetingView.vue') },
    { path: '/auth', component: () => import('@/views/AuthView.vue') },
    { path: '/exercise', component: () => import('@/views/ExerciseView.vue') },
    { path: '/feed', component: () => import('@/views/FeedView.vue') },
    { path: '/food', component: () => import('@/views/FoodView.vue') },
    { path: '/product', component: () => import('@/views/ProductView.vue') },
    { path: '/profile', component: () => import('@/views/ProfileView.vue') },
    { path: '/sleep', component: () => import('@/views/SleepView.vue') },
    { path: '/trainig', component: () => import('@/views/TrainingView.vue') }
  ]
})

export default router
