import { createStore } from 'vuex'
import main from './main'
import sideMenu from './side-menu/side-menu'
import auth from './auth/index'

const store = createStore({
  modules: {
    auth,
    main,
    sideMenu
  }
})

export function useStore() {
  return store
}

export default store
