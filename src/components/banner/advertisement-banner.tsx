import React from 'react';
import {LineChart} from 'lucide-react';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import {useGlobalStore} from '@/hooks/use-global-store';

const AdvertisementBanner = () => {
	const router = useRouter();

	const {
		user,
		updateChatConversation,
		updateCurrentAccountTab,
		updateShowChatConversation,
	} = useGlobalStore();

	return (
		<div
			onClick={async () => {
				try {
					if (user?.id == null) {
						router.push(`${!user && '/signin'}`);
					}

					const {data} = await axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/chat/admin-conversation`,
						{
							headers: {
								Authorization: user?.accessToken,
							},
						}
					);

					// console.log(
					//     '[CONVERSATION-RESPONSE] :: ',
					//     data
					// );

					router.push('/account');

					updateCurrentAccountTab('Messages');

					updateShowChatConversation(true);

					updateChatConversation(data.data);
				} catch (error) {
					const _error = error as AxiosError;

					// console.log(_error);
				}
			}}
			className='absolute top-0 left-0 w-full py-2 bg-gradient-to-tr from-green-200 to-green-500 text-sm px-4 flex items-center justify-center space-x-5 cursor-pointer'
		>
			<p className='text-sm font-semibold'>
				Want to promote your product? Click here!
			</p>

			<LineChart size={12} />
		</div>
	);
};

export default AdvertisementBanner;
