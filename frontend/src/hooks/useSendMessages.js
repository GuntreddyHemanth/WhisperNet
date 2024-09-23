import React, { useState } from 'react'
import useConversation from '../zustand/useConverstaion'
import { toast } from 'react-toastify'
import axios from 'axios'

const useSendMessages = () => {
    const [loading, setLoading] = useState(false)
    const {selectedConversation, messages, setMessages} = useConversation()

    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const res = await axios.post(`/api/messages/send/${selectedConversation._id}`, {
                message
            })
            const data = res.data
            if (data.error){
                throw new Error(data.error)
            }
            setMessages([...messages, data])
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {loading, sendMessage}
}

export default useSendMessages