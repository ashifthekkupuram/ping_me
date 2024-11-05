import axios from 'axios'
// import { store } from '../redux/store'

const baseURL = import.meta.env.VITE_API_URL

// const state = store.getState()

export default axios.create({
    baseURL,
    withCredentials: true,
    // headers: {
    //     Authorization: `Bearer ${state.auth.token}`
    // }
})