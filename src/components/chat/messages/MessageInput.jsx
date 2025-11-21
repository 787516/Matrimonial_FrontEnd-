import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../../hooks/ChatHook/useSendMessage";
import React from "react";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message.trim()) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<form className='px-6 py-4 bg-linear-to-t from-black/70 via-slate-900/90 to-transparent backdrop-blur-xl border-t border-rose-500/20' onSubmit={handleSubmit}>
	<div className='w-full relative'>
		<input
			type='text'
			className='input w-full p-4 pr-14 bg-slate-800/80 border border-rose-500/40 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-rose-500/30 focus:border-rose-400 transition-all duration-300 shadow-2xl'
			placeholder='Type your message... '
			value={message}
			onChange={(e) => setMessage(e.target.value)}
			disabled={loading}
		/>
		<button 
			type='submit' 
			className='pb-0 absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-md bg-linear-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-rose-500/50 disabled:opacity-50 transition-all '
			disabled={loading || !message.trim()}
		>
			{loading ? <span className='loading loading-spinner'></span> : <BsSend className='text-xl' />}
		</button>
	</div>
</form>
	);
};

export default MessageInput;

// STARTER CODE SNIPPET
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;
