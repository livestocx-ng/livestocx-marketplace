import React, {Fragment} from 'react';

const ChatBubble = () => {
	return (
		<Fragment>
			<div className='w-full flex justify-start'>
				<div className='flex justify-start w-[70%] lg:w-[45%] h-[100px] rounded-md border lg:ml-5 shadow-md'></div>
			</div>

			<div className='w-full flex justify-end'>
				<div className='flex  w-[70%] lg:w-[45%] h-[100px] rounded-md border lg:mr-5 bg-[#e0fed8] shadow-md'></div>
			</div>
		</Fragment>
	);
};

export default ChatBubble;
