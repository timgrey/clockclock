import { createRouter, createWebHistory } from 'vue-router';
import ClockView from '@/views/Clock.vue';
import AboutView from '@/views/About.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'clock',
      component: ClockView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ]
})

export default router
