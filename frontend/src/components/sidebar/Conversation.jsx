import useConversation from "../../zustand/useConverstaion";

const Conversation = ({conversation, emojis, lastIdx, loading }) => {
	const {selectedConversation, setSelectedConversation} = useConversation()

	const isSelected = selectedConversation?._id === conversation._id 
	return (
		<>
			<div 
			   className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500": ""}
			`}
			onClick={() => setSelectedConversation(conversation)}
			>
				<div className='avatar online'>
					<div className='w-12 rounded-full' disabled={loading}>
						{!loading ? <img
							src={conversation.profilePic}
							alt='user avatar'
						/>: <span className='loading loading-spinner'></span>}
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						<span className='text-xl'>{emojis}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;