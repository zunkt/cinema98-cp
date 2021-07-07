const prefix = 'side-menu-'

const state = () => {
  return {
    menu: [
      {
        icon: 'HomeIcon',
        pageName: prefix + 'dashboard',
        title: 'dashboard'
      },
      {
        icon: 'UserIcon',
        pageName: prefix + 'user',
        title: 'user_management'
      },
      {
        icon: 'UserCheckIcon',
        pageName: prefix + 'contact',
        title: 'contact_management'
      },
      {
        icon: 'BookOpenIcon',
        pageName: prefix + 'deal',
        title: 'deal_management.deal',
        subMenu: [
          {
            icon: '',
            pageName: prefix + 'deal',
            title: 'deal_management.deal_list'
          },
          {
            icon: '',
            pageName: prefix + 'task',
            title: 'task_management'
          }
        ]
      }
    ]
  }
}

// getters
const getters = {
  menu: state => state.menu
}

// actions
const actions = {}

// mutations
const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
