const DashBoard = () => import('../views/dashboard/index.vue')
const UserManager = () => import('../views/user/index.vue')
const MovieManager = () => import('../views/movie/index.vue')
const TicketManager = () => import('../views/ticket/index.vue')
const TheaterManager = () => import('../views/theater/index.vue')
const BillManager = () => import('../views/bill/index.vue')
const ScheduleManager = () => import('../views/schedule/index.vue')

const route = (prefix) => {
  return [
    {
      path: '',
      name: prefix + '-dashboard',
      component: DashBoard
    },
    {
      path: '/user',
      name: prefix + '-user',
      component: UserManager
    },
    {
      path: '/movie',
      name: prefix + '-movie',
      component: MovieManager
    },
    {
      path: '/ticket',
      name: prefix + '-ticket',
      component: TicketManager
    },
    {
      path: '/theater',
      name: prefix + '-theater',
      component: TheaterManager
    },
    {
      path: '/schedule',
      name: prefix + '-schedule',
      component: ScheduleManager
    },
    {
      path: '/bill',
      name: prefix + '-bill',
      component: BillManager
    }
  ]
}

export default route
