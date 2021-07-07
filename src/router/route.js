const DashBoard = () => import('../views/dashboard/index.vue')

const route = (prefix) => {
  return [
    {
      path: '',
      name: prefix + '-dashboard',
      component: DashBoard
    }
  ]
}

export default route
