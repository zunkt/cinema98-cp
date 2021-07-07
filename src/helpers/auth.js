import axios from 'axios'
import store from '@/store'

export function login(credential) {
  return new Promise((resolve, reject) => {
    axios.post('admin/auth/login', credential)
      .then(result => {
        resolve(result.data)
      })
      .catch(err => {
        reject(err.response.data)
      })
  })
}

export function register(credential) {
  return new Promise((resolve, reject) => {
    axios.post('/admin/auth/register', credential)
      .then(result => {
        resolve(result.data)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}

export function currentUser() {
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }

  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  return new Promise((resolve) => {
    axios.get('admin/auth/me')
      .then(result => {
        resolve(result.data.data.admin)
      })
      .catch(err => {
        store.commit('auth/logout')
        console.log(err)
      })
  })
}
