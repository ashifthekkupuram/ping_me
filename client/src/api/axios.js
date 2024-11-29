import axios from 'axios'

import { refresh } from '../redux/slices/authSlice'

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
    (error) => {
        let alreadyRefreshed = false
        if(error.status === 403){
            if(!alreadyRefreshed){

            }else{

            }
        }
        return Promise.reject(error)
    }
)

export default instance