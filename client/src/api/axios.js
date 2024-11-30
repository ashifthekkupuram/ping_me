import axios from 'axios'

import { refresh, logout } from '../redux/slices/authSlice'

const baseURL = import.meta.env.VITE_API_URL

let store = undefined
export function setStore(_store) {
    store = _store
}

const instance =  axios.create({
    baseURL,
    withCredentials: true,
})

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

instance.interceptors.response.use(
    async (response) => {
        return response
    },
    async (error) => {
        if(error.status === 403){
            try{
                const result = await store.dispatch(refresh())
                if(result.payload.success){
                    return instance.request(error.config)
                }else{
                    await store.dispatch(logout())
                }
            } catch(err) {
                await store.dispatch(logout())
            }
                
        }
        return Promise.reject(error)
    }
)

export default instance