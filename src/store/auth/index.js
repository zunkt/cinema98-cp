import { currentUser } from '@/helpers/auth'

export default {
  namespaced: true,
  state: () => ({
    currentUser: null,
    isLoggedIn: false
  }),
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    currentUser: (state) => state.currentUser
  },
  mutations: {
    loginSuccess(state, payload) {
      state.isLoggedIn = true
      console.log(payload.data.token)
      localStorage.setItem('token', payload.data.token)
    },
    logout(state) {
      localStorage.removeItem('token')
      state.isLoggedIn = false
      state.currentUser = null
    },
    setCurrentUser(state, user) {
      state.currentUser = user
      // console.log(state.currentUser)
      state.isLoggedIn = true
    }
  },
  actions: {
    async loginSuccess(context, payload) {
      context.commit('loginSuccess', payload)
      const user = await currentUser()
      context.commit('setCurrentUser', user)
    }
  }
}
