
import useGetConversation from "../../hooks/useGetConversation";
import { getRandomEmoji } from "../../utils/emoji";
import Conversation from "./Conversation";

const Conversations = () => {
	const {loading, conversation} = useGetConversation();
	// console.log("Coversation :", conversation)
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversation.map((message, idx) =>(
				<Conversation
				    key = {message._id}
					conversation = {message}
					emojis = {getRandomEmoji()}
					lastIdx = {idx === conversation.length - 1}
					loading = {loading}
				/>
			))}
		</div>
	);
};
export default Conversations;