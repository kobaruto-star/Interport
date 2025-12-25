import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      path: '/menu',
      name: 'menu',

      component: () => import('../views/MenuView.vue'),
    },
    {
      path: '/Inquiry',
      name: 'Inquiry',

      component: () => import('../views/InquiryView.vue'),
    },
    {
      path: '/InquiryToOther',
      name: 'InquiryToOther',

      component: () => import('../views/InquiryOtherView.vue'),
    },

    {
      path: '/AskAI',
      name: 'AskAI',

      component: () => import('../views/AIView.vue'),
    },
  ],
})

export default router
