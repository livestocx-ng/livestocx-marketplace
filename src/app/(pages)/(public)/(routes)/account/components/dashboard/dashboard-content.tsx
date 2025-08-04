import {
	TwitterIcon,
	WhatsappIcon,
	FacebookIcon,
	TwitterShareButton,
	FacebookShareButton,
	WhatsappShareButton,
} from 'react-share';
import Image from 'next/image';
import {Copy} from 'lucide-react';
import {Vendor} from '@/types/types';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {useGlobalStore} from '@/hooks/use-global-store';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ButtonLoader from '@/components/loader/button-loader';

const DashboardContent = () => {
	const {
		user,
		vendorProfile,
		updateUser,
		updateVendorProfile,
		updateCurrentAccountTab,
	} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(false);

	const fetchVendorProfile = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/vendor/profile`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[DATA] ::  ', data);

			updateVendorProfile(data.data);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-VENDOR-PROFILE-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchVendorProfile();
	}, []);

	const handleUpdateUserRole = async (role: string) => {
		try {
			setLoading(true);

			const {data} = await axios.patch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/update-user-role`,
				{role},
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			const cookieUpdate = await axios.patch(
				'/api/auth/update-cookies',
				data.data
			);

			setLoading(false);

			// // console.log('[USER-ROLE] :: ', cookieUpdate.data);
			await updateUser(cookieUpdate.data);

			toast.success('User role updated!');
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[UPDATE-USER-ROLE-ERROR]', _error);

			toast.error('Error');
		}
	};

	const formatVendorSlug = (vendor: Vendor): string => {
		if (vendor) {
			const formattedProductName = vendor?.name.replace(/,/g, '');

			const formattedVendorNameWithOutCommas = formattedProductName
				.replace(/\s+/g, '-')
				.toLowerCase();

			const slug = `${formattedVendorNameWithOutCommas}_${vendor?.vendorId!}`;

			return slug.toLowerCase();
		}

		return '';
	};

	return (
		<div className='w-full md:w-[78%] flex flex-col gap-5'>
			<div className='flex flex-col md:flex-row items-center justify-between w-full'>
				<div className='p-5 flex flex-col items-center justify-between w-full md:w-[45%] h-[350px] space-y-3 border rounded-lg'>
					<div className='text-center'>
						<div className='h-[150px] w-[150px] rounded-full border relative'>
							<Image
								alt='image'
								// width={150}
								// height={150}
								fill
								unoptimized={true}
								// src={'/user__1.svg'}
								className='object-cover rounded-full h-full w-full'
								src={user?.avatar ?? '/user__1.svg'}
							/>
						</div>

						<h1 className='text-base'>
							{user?.lastName} {user?.firstName}
						</h1>
						<p className='text-sm capitalize text-red-600 underline'>
							{user?.role === 'CUSTOMER' ? 'CUSTOMER' : 'SELLER'}
						</p>
					</div>

					{user?.role === 'FARMER' &&
						vendorProfile?.slug?.length! > 1 && (
							<div className='flex items-center space-x-4'>
								<p className='text-sm'>Share Profile:</p>

								<div className='flex space-x-2'>
									<WhatsappShareButton
										url={`https://livestocx.com/store/${vendorProfile?.slug}`}
										title={`Check out my min-website/online store ${vendorProfile?.name} on Livestocx: `}
									>
										<WhatsappIcon size={25} round />
									</WhatsappShareButton>
									<FacebookShareButton
										url={`https://livestocx.com/store/${vendorProfile?.slug}`}
										title={`Check out my min-website/online store ${vendorProfile?.name} on Livestocx: `}
									>
										<FacebookIcon size={25} round />
									</FacebookShareButton>
									<TwitterShareButton
										url={`https://livestocx.com/store/${vendorProfile?.slug}`}
										title={`Check out my min-website/online store ${vendorProfile?.name} on Livestocx: `}
									>
										<TwitterIcon size={25} round />
									</TwitterShareButton>

									<CopyToClipboard
										onCopy={(
											text: string,
											result: boolean
										) => {
											toast.success(
												'Copied to clipboard'
											);
										}}
										text={`https://livestocx.com/store/${vendorProfile?.slug}`}
									>
										<div className='rounded-full border border-slate-400 h-7 w-7 flex items-center justify-center cursor-pointer'>
											<Copy className='h-4 w-4' />
										</div>
									</CopyToClipboard>
								</div>
							</div>
						)}
				</div>
				<div className='flex flex-col items-start justify-between h-[350px] w-full md:w-[45%]'>
					<div className='p-5 flex flex-col items-start w-full h-[300px] justify-between border rounded-lg'>
						<div className='space-y-3'>
							<h1 className='text-base font-medium'>
								Personal Details
							</h1>
							<div className='space-y-1 '>
								<h1 className='text-sm'>
									<span className='font-medium'>Name: </span>
									{user?.lastName} {user?.firstName}
								</h1>
							</div>
							<div className='space-y-3'>
								<h1 className='text-sm'>
									<span className='font-medium'>Email: </span>
									{user?.email}
								</h1>
								<h1 className='text-sm'>
									<span className='font-medium'>Phone: </span>
									{user?.phoneNumber}
								</h1>
							</div>
						</div>
						{/* <p
							onClick={() => updateCurrentAccountTab('Settings')}
							className='text-main text-sm font-semibold cursor-pointer'
						>
							Edit Profile
						</p> */}
					</div>

					{loading ? (
						<Button
							type='button'
							className='bg-main text-white text-xs hover:bg-main hover:text-white w-full px-3 rounded-lg'
						>
							<ButtonLoader />
						</Button>
					) : (
						<Button
							type='button'
							onClick={() => {
								if (user?.role === 'FARMER') {
									return;
									// return handleUpdateUserRole('CUSTOMER');
								}

								if (user?.role === 'CUSTOMER') {
									return handleUpdateUserRole('FARMER');
								}
							}}
							className='bg-main text-white text-xs hover:bg-main hover:text-white w-full px-3 rounded-lg'
						>
							{user?.role === 'CUSTOMER'
								? 'Become a Seller'
								: 'Seller'}
						</Button>
					)}
				</div>
			</div>

			{/* <DataTable columns={columns} data={RecentOrders} /> */}
		</div>
	);
};

export default DashboardContent;
