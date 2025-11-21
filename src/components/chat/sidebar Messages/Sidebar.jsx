import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import React from "react";

const Sidebar = () => {
	return (
		<div className='border-r border-rose-500/30 p-6 flex flex-col bg-linear-to-b from-slate-900 via-black to-slate-900 h-screen shadow-2xl'>
	{/* <div className="mb-6">
		<h2 className="text-2xl text-center font-bold text-transparent bg-clip-text bg-linear-to-r from-rose-400 to-pink-400">
			SoulConnect 💞
		</h2>
	</div> */}
	<SearchInput />
	<div className='divider divider-rose before:bg-rose-500/30 after:bg-pink-500/30 my-6'></div>
	<Conversations />
	{/* <div className="mt-auto pt-6">
		<LogoutButton />
	</div> */}
</div>
	);
};

export default Sidebar;

// STARTER CODE FOR THIS FILE
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";

// const Sidebar = () => {
// 	return (
// 		<div className='border-r border-slate-500 p-4 flex flex-col'>
// 			<SearchInput />
// 			<div className='divider px-3'></div>
// 			<Conversations />
// 			<LogoutButton />
// 		</div>
// 	);
// };
// export default Sidebar;
