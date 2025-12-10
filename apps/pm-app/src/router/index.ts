// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
// IMPORT THIS TYPE
import type { RouteRecordRaw } from 'vue-router'

import HomeView from '../views/Home.vue'

// Type the array strictly
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('../views/auth/Login.vue')
  },
  // {
  //   path: '/dashboard',
  //   // Component is required for a parent route if it has a <router-view> inside
  //   component: () => import('../views/dashboard/DashboardLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'dashboard-overview',
  //       component: () => import('../views/dashboard/Overview.vue')
  //     },
  //     {
  //       path: 'settings',
  //       name: 'dashboard-settings',
  //       component: () => import('../views/dashboard/Settings.vue')
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes // shorthand for routes: routes
})

export default router