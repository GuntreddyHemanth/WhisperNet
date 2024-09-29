import {useAuthContex} from "../../context/AuthContext"
import { extractTime } from "../../utils/extraTime"
import useConversation from "../../zustand/useConverstaion"


const Message = ({message}) => {
    const {authUser} = useAuthContex()
    const {selectedConversation} = useConversation()
    const fromMe = message.senderId === authUser._id
    const formatedTime = extractTime(message.createdAt)
    // const formatedTime = message.createdAt ? extractTime(message.createdAt) : "Unknown time"; // Fallback for time
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
    const bubbleBgColor = fromMe ? "bg-blue-500" : ""
    const shakeClass = message.shouldShake ? "shake" : ""

    // useEffect(() => {
    //     setFromMe(message.senderId === authUser._id);
    // }, [message, authUser]);

    return(
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img 
                    alt='Tailwind CSS chat bubble component' 
                    src={profilePic}/>
				</div>
			</div> 
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>
            <div className="chat-footer text-white opacity-50 text-xs flex gap-1 items-center">{formatedTime}</div>
        </div>
    )
}

export default Message;