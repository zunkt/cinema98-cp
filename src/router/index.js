import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/login/index.vue";
const SideMenu = () => import('../layouts/side-menu/Main.vue')

import route from './route'

const routes = [
  {
    path: '/',
    component: SideMenu,
    meta: { requiresAuth: true },
    children: route('side-menu')
  },
  {
    path: '/login',
    name: 'login',
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
