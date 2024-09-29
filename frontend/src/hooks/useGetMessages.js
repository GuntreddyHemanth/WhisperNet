import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConverstaion'
import { toast } from 'react-toastify'
import axios from 'axios'

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedConversation} = useConversation()

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`/api/messages/${selectedConversation._id}`);
                console.log("API response: ", res.data);
                const data = res.data
                if (data.error) throw new Error(data.error)
                setMessages(data)
            } catch (error) {
               toast.error(error.response?.data?.error || error.message)  
            }finally{
                setLoading(false)
            }
        }
        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages])
    return {messages, loading}
}

export default useGetMessages