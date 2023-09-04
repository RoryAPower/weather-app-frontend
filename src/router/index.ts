import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { useUserStore } from '@/stores/useUserStore'

const routes = [
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { isAuth: true }
      },
      {
        path: 'weather/:id',
        name: 'Weather',
        component: () => import('@/views/Weather.vue'),
        props: true,
        meta: { isAuth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { isAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  const store = useUserStore()

  if (!store.isUserLoggedIn && to.name !== 'Login') {
    return { name: 'Login' }
  }

  if (store.isUserLoggedIn && to.meta.isAuth === false) {
    return { name: 'Home' }
  }
})

export default router
