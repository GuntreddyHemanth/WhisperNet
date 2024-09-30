import {createContext, useContext, useEffect, useState } from "react";
import { useAuthContex } from "./AuthContext";
import io from "socket.io-client"

const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const {authUser} = useAuthContex()

    useEffect(() => {
        if (authUser) {
            const socket = io("https://whispernet-job5.onrender.com", {
                query:{
                    userId: authUser._id, 
                }
            });
            setSocket(socket)

            socket.on("getOnlineUsers", (Users) => {
                setOnlineUsers(Users)
            })

            return () => socket.close()
        } else {
            if (socket){
                socket.close()
                setSocket(null)
            }
        }

    }, [authUser])

    return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>
}