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
        title: 'user-manager'
      },
      {
        icon: 'MenuIcon',
        pageName: prefix + 'movie',
        title: 'movie-manager'
      },
      {
        icon: 'PackageIcon',
        pageName: prefix + 'ticket',
        title: 'ticket-manager'
      },
      {
        icon: 'ToggleLeftIcon',
        pageName: prefix + 'theater',
        title: 'theater-manager'
      },
      {
        icon: 'ArrowUpRightIcon',
        pageName: prefix + 'schedule',
        title: 'schedule-manager'
      },
      {
        icon: 'BarChartIcon',
        pageName: prefix + 'bill',
        title: 'bill-manager'
      },
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
