import {useState} from 'react';
import Image from 'next/image';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {Button} from '@/components/ui/button';
import {DataTable} from '@/components/ui/data-table';
import {useGlobalStore} from '@/hooks/use-global-store';
import ButtonLoader from '@/components/loader/button-loader';
import {RecentOrderColumn, columns} from './tables/recent-orders-columns';

const RecentOrders: RecentOrderColumn[] = [
	{
		id: '1',
		productId: '#123',
		date: '8 Sep, 2023',
		total: '₦13,500 (2 Products)',
		status: 'Processing',
	},
	{
		id: '2',
		productId: '#259',
		date: '8 Sep, 2023',
		total: '₦17,500 (2 Products)',
		status: 'Delivered',
	},
	{
		id: '3',
		productId: '#260',
		date: '8 Oct, 2023',
		total: '₦14,500 (2 Products)',
		status: 'Delivered',
	},
	{
		id: '4',
		productId: '#460',
		date: '8 Sep, 2023',
		total: '₦13,500 (2 Products)',
		status: 'Processing',
	},
	{
		id: '5',
		productId: '#782',
		date: '8 Sep, 2023',
		total: '₦17,500 (2 Products)',
		status: 'Delivered',
	},
	{
		id: '6',
		productId: '#030',
		date: '8 Oct, 2023',
		total: '₦14,500 (2 Products)',
		status: 'Delivered',
	},
];

interface DashboardContentProps {
	// user: User | null;
	// updateTab: Dispatch<SetStateAction<Tab>>;
}

const DashboardContent = ({}: DashboardContentProps) => {
	const {user, updateUser, updateCurrentAccountTab} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(false);

	const handleUpdateUserRole = async (role: string) => {
		try {
			setLoading(true);

			console.log('[UPDATE-USER-ROLE-PAYLOAD] :: ', user);
			console.log('[UPDATE-USER-ROLE-PAYLOAD] :: ', role);

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

			// console.log('[USER-ROLE] :: ', cookieUpdate.data);
			await updateUser(cookieUpdate.data);

			toast.success('User role updated!');
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			console.log('[UPDATE-USER-ROLE-ERROR]', _error);

			toast.error('Error');
		}
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

					<p
						onClick={() => updateCurrentAccountTab('Settings')}
						className='text-main text-sm font-semibold cursor-pointer'
					>
						Edit Profile
					</p>
				</div>
				<div className='flex flex-col items-start justify-between h-[350px] w-full md:w-[45%]'>
					<div className='p-5 flex flex-col items-start w-full h-[300px] justify-between border rounded-lg'>
						<div className='space-y-3'>
							<h1 className='text-base font-medium'>Profile</h1>
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
						<p
							onClick={() => updateCurrentAccountTab('Settings')}
							className='text-main text-sm font-semibold cursor-pointer'
						>
							Edit Profile
						</p>
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
