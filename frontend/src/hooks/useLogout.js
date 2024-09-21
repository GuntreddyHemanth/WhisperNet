import { useState } from "react"
import { useAuthContex } from "../context/AuthContext"
import axios from "axios"
import { toast } from "react-toastify"


const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContex()

    const logout = async() => {
        setLoading(true)
        try {
            const res = await axios.post("/api/auth/logout")
            const data = res.data
            if (data.error){
                throw new Error(data.error)
            }
            
            localStorage.removeItem("chat-user")
            setAuthUser(null)
        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    };

    return {loading, logout};

}

export default useLogout
