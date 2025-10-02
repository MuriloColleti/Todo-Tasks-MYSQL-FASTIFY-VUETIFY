import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TaskPage',
      component: () => import('../pages/tasks/TaskPage.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/login/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../pages/register/RegisterPage.vue'),
    },
    {
      path: '/users',
      name: 'Usuarios',
      component: () => import('../pages/users/UsersPage.vue'),
    },
  ],
})

export default router
