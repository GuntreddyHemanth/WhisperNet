import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true)
            try {
                const res = await axios.get("/api/users")
                const data = res.data
                if (data.error){
                    throw new Error(data.error)
                }
                setConversation(data)
            } catch (error) {
                toast.error(error.message)
            }finally{
                setLoading(false)
            }
        }
        getConversation()
    }, [])
    return {loading, conversation}
}

export default useGetConversation