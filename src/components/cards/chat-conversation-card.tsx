import React from 'react';
import Image from 'next/image';
import {ChatConversation} from '@/types/types';
import {useGlobalStore} from '@/hooks/use-global-store';

interface ChatConversationCardProps {
	conversation: ChatConversation;
}

const ChatConversationCard = ({conversation}: ChatConversationCardProps) => {
	const {user, updateShowChatConversation} = useGlobalStore();

	return (
		<div
			onClick={() => {
				updateShowChatConversation(true);
			}}
			className='flex items-center space-x-2 w-full cursor-pointer transition-all ease-in-out duration-700 hover:translate-y-1'
		>
			<div className='h-[50px] w-[50px] rounded-full border relative'>
				<Image
					alt='image'
					fill
					unoptimized={true}
					src={
						conversation.user1.id.toString() === user?.id
							? conversation.user2.role === 'FARMER'
								? conversation.vendor.avatar
								: conversation.user2.avatar
							: conversation.user1.role === 'FARMER'
							? conversation.vendor.avatar
							: conversation.user1.avatar
					}
					// src={'/user__1.svg'}
					className='object-cover rounded-full h-full w-full'
				/>
			</div>
			<div className='flex flex-col'>
				<p className='text-[12px] font-medium'>
					{conversation.user1.id.toString() === user?.id
						? conversation.user2.role === 'FARMER'
							? conversation.vendor.name
							: conversation.user2.name
						: conversation.user1.role === 'FARMER'
						? conversation.vendor.name
						: conversation.user1.name}
				</p>
				{conversation.lastConversationMessage.length > 0 && (
					<p className='text-[12px]'>
						{conversation.lastConversationMessage.length > 10
							? `${conversation.lastConversationMessage.slice(
									0,
									10
							  )}...`
							: conversation.lastConversationMessage}
					</p>
				)}
			</div>
		</div>
	);
};

export default ChatConversationCard;
