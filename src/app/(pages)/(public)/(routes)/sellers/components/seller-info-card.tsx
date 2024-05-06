'use-client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Vendor} from '@/types/types';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {useGlobalStore} from '@/hooks/use-global-store';
import { formatVendorSlug } from '@/utils/slug.formatter';

const SellerInfoCard = ({vendor}: {vendor: Vendor}) => {
	const router = useRouter();

	const {
		user,
		updateVendor,
		updateChatConversation,
		updateCurrentAccountTab,
		updateShowChatConversation,
	} = useGlobalStore();

	return (
		<div className='w-full sm:w-[280px] bg-green-100 flex flex-col justify-between relative cursor-pointe shadow__1 hover:shadow__2 rounded-lg px-4 py-5'>
			<div className='border-b border-b-main flex flex-col space-y-1 pb-2'>
				<div className='flex justify-end'>
					<Image
						alt='logo'
						width={40}
						height={40}
						className=''
						unoptimized={true}
						// src={vendor?.avatar}
						src={'/logo.svg'}
					/>
				</div>

				<h1 className='text-sm uppercase font-medium'>{vendor.name}</h1>
				<p className='text-xs'>
					{vendor.address} {vendor.state} State.
				</p>
			</div>

			<div className='flex flex-wrap items-center justify-between py-2'>
				<div className='h-[80px] w-[80px] rounded-full border border-slate-500 relative'>
					<Image
						fill
						alt='image'
						src={vendor?.avatar}
						unoptimized={true}
						// src={'/user__1.svg'}
						className='object-fill h-full w-full absolute rounded-full'
					/>
				</div>

				<div className='flex flex-row sm:flex-col space-x-5 sm:space-x-0 sm:space-y-2'>
					<Link href={`/sellers/${formatVendorSlug(vendor)}`}>
						<Button
							type='button'
							variant={'outline'}
							onClick={() => {
								updateVendor(vendor);
							}}
							className='bg-main text-white hover:bg-main hover:text-white text-xs h-10 rounded-none py-3 w-full'
						>
							Profile
						</Button>
					</Link>

					<Link href={'#'}>
						<Button
							type='button'
							variant={'outline'}
							onClick={async () => {
								try {
									if (!user) return router.push('/signin');

									if (user?.id == vendor?.user) {
										return;
									}

									const {data} = await axios.get(
										`${process.env.NEXT_PUBLIC_API_URL}/chat/conversation?receiver=${vendor?.user}`,
										{
											headers: {
												Authorization:
													user?.accessToken,
											},
										}
									);

									updateChatConversation(data.data);

									router.push('/account');

									updateCurrentAccountTab('Messages');

									updateShowChatConversation(true);
								} catch (_error) {
									const error = _error as AxiosError;
								}
							}}
							className='bg-orange-500 text-white text-xs h-10 rounded-none py-3 w-full'
						>
							Chat with Seller
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SellerInfoCard;
