import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";

const Messages = () => {
	const {loading, messages} = useGetMessages()
	console.log("messages the : ", messages)
	return (
		<div className='px-4 flex-1 overflow-auto'>
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
			<Message />
		</div>
	);
};
export default Messages;