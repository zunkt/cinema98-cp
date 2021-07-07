import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/login/index.vue";
const DashBoard = () => import('../views/dashboard/index.vue')

import route from './route'

const routes = [
  {
    path: '/',
    component: DashBoard,
    meta: { requiresAuth: true },
    children: route('side-menu')
  },
  {
    path: '/login',
    name: 'login',
    meta: { requiresAuth: true },
    component: Login
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
});

export default router;
