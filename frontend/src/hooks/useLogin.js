import axios from "axios"
import { useState } from "react"
import { useAuthContex } from "../context/AuthContext"
import { toast } from "react-toastify"

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser}= useAuthContex()

    const login = async (userName, password) => {
        const success  = handleInputError(userName, password)
        if (!success) return;

        setLoading(true)
        try {
            const res = await axios.post("/api/auth/login", {
                userName,
                password
            })
            const data = res.data
            console.log(data)
            if (data.error){
                throw new Error(data.error)
            }
    
            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)

        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    }

    return {loading, login}
}

export default useLogin

function handleInputError(userName, password){
    if (!userName || !password){
        toast.error("Please fill in all fields")
        return false
    }

    return true

}