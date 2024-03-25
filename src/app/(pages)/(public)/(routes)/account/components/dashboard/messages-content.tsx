'use client';
import Image from 'next/image';
import {useEffect} from 'react';
import axios, {AxiosError} from 'axios';
import {SendHorizonal, X} from 'lucide-react';
import {useGlobalStore} from '@/hooks/use-global-store';
import ChatBubble from '@/components/bubbles/chat-bubble';
import FormTextInput from '@/components/input/form-text-input';
import ChatConversationCard from '@/components/cards/chat-conversation-card';

const MessagesContent = () => {
	const {
		user,
		chatConversations,
		showChatConversation,
		updateChatConversations,
		updateShowChatConversation,
	} = useGlobalStore();

	const fetchChatConversations = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/chat/conversations?page=1`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			console.log('[CONVERSATIONS-RESPONSE] :: ', data);

			updateChatConversations(data.data.conversations);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchChatConversations();
	}, []);

	return (
		<div className='w-full md:w-[78%] flex items-center items-star justify-between h-[70vh]'>
			{/* {!showChatConversation && (
				<div className='w-[25%] border-r hidde flex lg:flex flex-col space-y-4 h-full overflow-y-auto scrollbar__2'>
					{chatConversations?.map((conversation) => (
						<ChatConversationCard
							key={conversation?.id}
							conversation={conversation}
						/>
					))}
				</div>
			)}

			{showChatConversation && (
				<div className='w-full lg:w-full border rounded-t-md flex flex-col space-y-4 h-full overflow-y-auto scrollbar__2 relative'>
					<div className='sticky z-[5] top-0 w-full bg-white py-2 px-5 shadow-sm border-b flex justify-between items-center'>
						<div className='flex items-center space-x-2'>
							<div className='h-[50px] w-[50px] rounded-full border relative shadow-lg'>
								<Image
									alt='image'
									fill
									unoptimized={true}
									className='object-cover rounded-full h-full w-full'
									src={'/user__1.svg'}
								/>
							</div>

							<p className='font-semibold text-sm'>
								Jerry Abiodun
							</p>
						</div>

						<X
							size={15}
							className='text-red-500 cursor-pointer'
							onClick={() => {
								updateShowChatConversation(false);
							}}
						/>
					</div>

					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
						<ChatBubble key={item} />
					))}

					<div className='sticky z-[5] bottom-0 w-full py-2 px-5 shadow-sm flex items-center space-x-2'>
						<FormTextInput
							name='email'
							padding='py-3 px-4'
							value={''}
							handleChange={() => {}}
							placeHolder='Message'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>

						<div className='w-10 h-10 bg-main flex items-center justify-center rounded-full'>
							<SendHorizonal className='text-white' size={15} />
						</div>
					</div>
				</div>
			)} */}

			<div className='flex flex-col items-center justify-center py-20 w-full'>
				<Image
					alt='logo'
					width={150}
					height={150}
					unoptimized={true}
					src={'/logo.svg'}
					className='opacity-50'
				/>
			</div>
		</div>
	);
};

export default MessagesContent;
