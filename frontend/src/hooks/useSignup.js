import axios from 'axios'
import React, { useState } from 'react'
import { toast, Bounce } from 'react-toastify'
import { useAuthContex } from '../context/AuthContext'

const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContex()

    const signup  = async ({fullName, userName, password, confirmPassword, gender}) => {
        const success  = handleInputError({fullName, userName, password, confirmPassword, gender})
        if (!success) return;

        setLoading(true)
        try {
            const res = await axios.post('/api/auth/signup', {
                fullName, 
                userName, 
                password, 
                confirmPassword, 
                gender 
            })

            const data = res.data
            if (data.error){
                throw new Error(data.error)
            }

            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)
            // const res = await fetch("/api/auth/signup", {
			// 	method: "POST",
			// 	headers: { "Content-Type": "application/json" },
			// 	body: JSON.stringify({fullName, userName, password, confirmPassword, gender }),
			// });

			// const data = await res.json();
            // console.log(data)  
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {loading, signup}

}

export default useSignup


function handleInputError({fullName, userName, password, confirmPassword, gender}){
    if (!fullName || !userName || !password || !confirmPassword || !gender){
        toast.error("Please fill in all fields")
        return false
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match")
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters")
        return false
    }

    return true

}