import { createContext, useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {

    const AuthData = useSelector((state) => state.auth.AuthData)

    const [socket, setSocket] = useState(null)
	const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        if(AuthData){
            const socket = io(BACKEND_URL, {
                query: {
                    userId: AuthData?._id
                }
            })

            console.log('Socket connection established with userId:', AuthData?._id)

            setSocket(socket)

            socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users)
			})

            return () => socket?.close()

        } else {

            socket?.close()
            setSocket(null)

        }
    },[AuthData])

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>

}