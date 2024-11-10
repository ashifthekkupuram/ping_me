import axios from 'axios'
import { store } from '../redux/store'

const baseURL = import.meta.env.VITE_API_URL

const instance =  axios.create({
    baseURL,
    withCredentials: true,
})

// Befour API Call
instance.interceptors.request.use(
    async (config) => {
        const token = store.getState().auth.token || ''
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// After API Call
instance.interceptors.response.use(
    async (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default instance