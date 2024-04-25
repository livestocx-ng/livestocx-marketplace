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

					router.push('/account');

					updateCurrentAccountTab('Messages');

					updateShowChatConversation(true);

					updateChatConversation(data.data);
				} catch (error) {
					const _error = error as AxiosError;

					// console.log(_error);
				}
			}}
			className='absolute top-0 left-0 w-full py-2 bg-gradient-to-tr from-indigo-200 to-indigo-500 text-sm px-4 flex items-center justify-center space-x-3 cursor-pointer'
		>
			<p className='text-xs md:text-sm font-medium'>
				Want to sell very fast? Boost your product with just &#8358;810
				per week
			</p>

			<LineChart size={18} />
		</div>
	);
};

export default AdvertisementBanner;
