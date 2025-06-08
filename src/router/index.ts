import { createRouter, createWebHashHistory, RouterView } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'admin',
      redirect: 'login',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/modules/user/views/login.vue'),
          meta: {
            guards: []
          }
        },
        {
          name: 'home',
          path: '/',
          component: () => import('@/layout/index.vue'),
          meta: {
            guards: ['admin']
          },
          children: [
            {
              path: ':path(.*)',
              component: RouterView
            }
          ]
        }
      ]
    }
  ]
})

export default router
