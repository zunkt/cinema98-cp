import axios from 'axios'
import { currentUser } from '@/helpers/auth'

export async function initialize(store, router) {
  axios.defaults.baseURL = process.env.VUE_APP_API_URL

  const token = localStorage.getItem('token')
  if (token) {
    const user = await currentUser()
    store.commit('auth/setCurrentUser', user)
  }

  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!store.state.auth.isLoggedIn) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      if (to.path === '/login' && store.state.auth.isLoggedIn) {
        next({
          path: '/',
          query: { redirect: to.fullPath }
        })
      }
      next()
    }
  })

  axios.interceptors.response.use((error) => {
    return Promise.resolve(error)
  })
}
