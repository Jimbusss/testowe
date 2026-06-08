import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true }
      },
      { 
        path: 'FormularzDane', 
        component: () => import('pages/FormularzDane.vue'),
        meta: { requiresAuth: true }
      }
    ],
  },
  {
    path: '/login',
    name: 'login', // <-- TA LINIJKA NAPRAWIA BŁĄD Z KONSOLI
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;