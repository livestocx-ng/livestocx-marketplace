'use client';
import React from 'react';
import Image from 'next/image';
import {
	useGlobalStore,
	useShareSellerStoreModalStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {Button} from '@/components/ui/button';
import {usePathname, useRouter} from 'next/navigation';
import {formatVendorSlug} from '@/utils/slug.formatter';
import {MessageCircle, Phone, Share2} from 'lucide-react';

const SellerBanner = () => {
	const router = useRouter();
	const pathName = usePathname();

	const shareSellerStoreModal = useShareSellerStoreModalStore();

	const {
		user,
		vendor,
		updateChatConversation,
		updateCurrentAccountTab,
		updateShowChatConversation,
	} = useGlobalStore();

	// console.log(vendor);

	return (
		<div className='w-[100%] sm:h-[200px] flex flex-col sm:flex-row items-center sm:items-start justify-between'>
			<div className='h-[200px] sm:h-full w-full sm:w-[15%] relative items-center justify-center'>
				<Image
					fill
					unoptimized={true}
					src={vendor?.avatar!}
					alt={formatVendorSlug(vendor!)}
					className='h-full w-full object-cover border border-slate-300 shadow-lg shadow-slate-200 rounded-md'
				/>
			</div>

			<div className='flex flex-col justify-be h-full sm:space-y-4 w-full sm:w-[85%] sm:px-10 mt-2 sm:mt-0'>
				<div className='flex items-center space-x-2'>
					<h1 className='text-sm sm:text-xl font-semibold'>
						{vendor?.name}
					</h1>
					{vendor?.isVerified && (
						<div className='relative h-[20px] w-[20px]'>
							<Image
								alt='image'
								// width={40}
								// height={40}
								fill
								unoptimized={true}
								src={'/icon__verified__1.svg'}
								className='object-cover h-full w-full'
							/>
						</div>
					)}
				</div>
				<p className='text-xs sm:text-sm'>
					{vendor?.city}
					{', '}
					{vendor?.state}
					{vendor?.state !== 'Abuja' ? ' State' : ' '}
				</p>

				<div className='hidden sm:flex flex-col sm:flex-row sm:space-x-5'>
					<Button
						type='button'
						variant={'outline'}
						onClick={async () => {
							try {
								if (!user)
									return router.replace(
										`/signin?redirect_to=${pathName.slice(
											1
										)}`
									);

								if (user?.id == vendor?.user) {
									return;
								}

								if (vendor?.isAccountDisabled) return;

								const {data} = await axios.get(
									`${process.env.NEXT_PUBLIC_API_URL}/chat/conversation?receiver=${vendor?.user}`,
									{
										headers: {
											Authorization: user?.accessToken,
										},
									}
								);

								updateChatConversation(data.data);

								router.replace('/account');

								updateCurrentAccountTab('Messages');

								updateShowChatConversation(true);
							} catch (_error) {
								const error = _error as AxiosError;
							}
						}}
						className='flex items-center space-x-2 border border-main text-xs rounded-full py-3 w-full sm:w-[150px]'
					>
						<MessageCircle size={18} />
						<p> Chat Seller</p>
					</Button>
					<Button
						type='button'
						variant={'default'}
						onClick={async () => {
							try {
								if (!user)
									return router.push(
										`/signin?redirect_to=${pathName.slice(
											1
										)}`
									);

								if (vendor?.isAccountDisabled) return;

								if (!vendor?.phoneNumber) {
									return toast.error(
										'Sorry, this store does not have a contact phone number',
										{
											duration: 8500,
											className: 'text-xs sm:text-sm',
										}
									);
								}

								const link = document.createElement('a');
								link.href = `tel:${vendor?.phoneNumber}`;
								link.target = '_blank';

								link.click();
							} catch (_error) {
								console.log('[CALL-SELLER-ERROR] :: ', _error);
							}
						}}
						className='flex items-center space-x-3 text-xs rounded-full py-3 w-full sm:w-[150px]'
					>
						<Phone size={18} />
						<p> Call Seller</p>
					</Button>

					<Button
						type='button'
						variant={'default'}
						onClick={() => shareSellerStoreModal.onOpen()}
						className='flex items-center space-x-3 bg-main text-xs rounded-full py-3 w-full sm:w-[150px]'
					>
						<Share2 size={18} />
						<p>Share</p>
					</Button>
				</div>
			</div>

			<div className='flex sm:hidden flex-col sm:flex-row sm:space-x-5 space-y-4 w-full mt-2'>
				<Button
					type='button'
					variant={'outline'}
					onClick={async () => {
						try {
							if (!user)
								return router.replace(
									`/signin?redirect_to=${pathName.slice(1)}`
								);

							if (user?.id == vendor?.user) {
								return;
							}

							if (vendor?.isAccountDisabled) return;

							const {data} = await axios.get(
								`${process.env.NEXT_PUBLIC_API_URL}/chat/conversation?receiver=${vendor?.user}`,
								{
									headers: {
										Authorization: user?.accessToken,
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
					className='flex items-center space-x-2 border border-main text-xs rounded-full py-3 w-full sm:w-[150px]'
				>
					<MessageCircle size={18} />
					<p> Chat Seller</p>
				</Button>
				<Button
					type='button'
					variant={'default'}
					onClick={async () => {
						try {
							if (!user)
								return router.replace(
									`/signin?redirect_to=${pathName.slice(1)}`
								);

							if (vendor?.isAccountDisabled) return;

							if (!vendor?.phoneNumber) {
								return toast.error(
									'Sorry, this store does not have a contact phone number',
									{
										duration: 8500,
										className: 'text-xs sm:text-sm',
									}
								);
							}

							const link = document.createElement('a');
							link.href = `tel:${vendor?.phoneNumber}`;
							link.target = '_blank';

							link.click();
						} catch (_error) {
							console.log('[CALL-SELLER-ERROR] :: ', _error);
						}
					}}
					className='flex items-center space-x-3 text-xs rounded-full py-3 w-full sm:w-[150px]'
				>
					<Phone size={18} />
					<p> Call Seller</p>
				</Button>

				<Button
					type='button'
					variant={'default'}
					onClick={() => shareSellerStoreModal.onOpen()}
					className='flex items-center space-x-3 bg-main text-xs rounded-full py-3 w-full sm:w-[150px]'
				>
					<Share2 size={18} />
					<p>Share</p>
				</Button>
			</div>
		</div>
	);
};

export default SellerBanner;
