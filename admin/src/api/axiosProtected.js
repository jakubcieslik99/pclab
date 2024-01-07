import axios from 'axios'
import axiosPublic from './axiosPublic'
import { userInfoReset, logout } from '../features/authSlices/manageAccount'

let store
export const injectStore = _store => {
  store = _store
}

const axiosProtected = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

const refreshAccessToken = async () => {
  try {
    const { data } = await axiosPublic.get(`/admin/auth/refreshAccessToken`, {
      withCredentials: true,
    })
    data?.accessToken && localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
    return { type: 'data', payload: data }
  } catch (error) {
    return { type: 'error', payload: error }
  }
}

const reqIntercept = axiosProtected.interceptors.request.use(
  config => {
    if (!config.headers) config.headers = {}

    if (!config.headers['Authorization']) {
      const accessToken = localStorage.getItem('accessToken')
      config.headers['Authorization'] = `Bearer ${accessToken ? JSON.parse(accessToken) : null}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const resIntercept = axiosProtected.interceptors.response.use(
  res => {
    return res
  },
  async error => {
    const prevRequest = error?.config

    if (error?.response?.status === 440 && !prevRequest?.sent) {
      prevRequest.sent = true

      const { type, payload } = await refreshAccessToken()

      if (type === 'data') {
        prevRequest.headers['Authorization'] = `Bearer ${payload.accessToken}`
        return axiosProtected(prevRequest)
      } else {
        store.dispatch(logout())
        store.dispatch(userInfoReset())
        return Promise.reject(payload)
      }
    }
    return Promise.reject(error)
  }
)

/*const axiosProtectedEject = () => {
  axiosProtected.interceptors.request.eject(reqIntercept)
  axiosProtected.interceptors.response.eject(resIntercept)
}*/

export { reqIntercept, resIntercept }
export default axiosProtected
