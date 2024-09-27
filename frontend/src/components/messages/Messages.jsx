import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
	const {loading, messages} = useGetMessages()
	const lastMessageRef = useRef()
	console.log("messages the : ", messages)

	useEffect(() => {
		   setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({behavior: "smooth"})
		   }, 100)
	}, [messages])

	return (
		<div className='px-4 flex-1 overflow-auto'>
			
			{!loading && 
			messages.length > 0 && 
			messages.map((message) => (
				<div key={message._id} ref={lastMessageRef}>
				  <Message key={message._id} message={message}/>
				</div>
			))}
			
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx}/>)}
			{!loading && messages.length === 0 && (
				<p className="text-center text-gray-400">send a message to start conversation</p>
			)}
		</div>
	);
};
export default Messages;