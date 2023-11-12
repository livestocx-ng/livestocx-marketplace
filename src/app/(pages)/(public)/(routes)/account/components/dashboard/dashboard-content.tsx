import Image from 'next/image';
import {DataTable} from '@/components/ui/data-table';
import {useGlobalStore} from '@/hooks/use-global-store';
import {RecentOrderColumn, columns} from './tables/recent-orders-columns';

const RecentOrders: RecentOrderColumn[] = [
	{
		id: '1',
		orderId: '#123',
		date: '8 Sep, 2023',
		total: '₦13,500 (2 Products)',
		status: 'Processing',
	},
	{
		id: '2',
		orderId: '#259',
		date: '8 Sep, 2023',
		total: '₦17,500 (2 Products)',
		status: 'Delivered',
	},
	{
		id: '3',
		orderId: '#260',
		date: '8 Oct, 2023',
		total: '₦14,500 (2 Products)',
		status: 'Delivered',
	},
	{
		id: '4',
		orderId: '#460',
		date: '8 Sep, 2023',
		total: '₦13,500 (2 Products)',
		status: 'Processing',
	},
	{
		id: '5',
		orderId: '#782',
		date: '8 Sep, 2023',
		total: '₦17,500 (2 Products)',
		status: 'Delivered',
	},
	{
		id: '6',
		orderId: '#030',
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
	const {user, updateCurrentAccountTab} = useGlobalStore();

	return (
		<div className='w-[78%] flex flex-col gap-5'>
			<div className='flex items-center justify-between w-full'>
				<div className='p-5 flex flex-col items-center justify-between w-[45%] h-[350px] space-y-3 border rounded-lg'>
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
						<p className='text-sm capitalize'>{user?.role}</p>
					</div>

					<p
						onClick={() => updateCurrentAccountTab('Settings')}
						className='text-main text-sm font-semibold cursor-pointer'
					>
						Edit Profile
					</p>
				</div>
				<div className='p-5 flex flex-col items-start w-[45%] h-[350px] justify-between border rounded-lg'>
					<div className='space-y-3'>
						<h1 className='text-base font-medium'>
							Billing Address
						</h1>
						<div className='space-y-1 text-gray-400'>
							<h1 className='text-sm'>Michael Jigga</h1>
							<p className='text-sm'>
								New Rayfield, Road 33 Abuja Street
							</p>
						</div>
						<div className='space-y-1 text-gray-400'>
							<h1 className='text-sm'>michael.jigga@gmail.com</h1>
							<h1 className='text-sm'>09025605622</h1>
						</div>
					</div>
					<p
						onClick={() => updateCurrentAccountTab('Settings')}
						className='text-main text-sm font-semibold cursor-pointer'
					>
						Edit Profile
					</p>
				</div>
			</div>

			<DataTable columns={columns} data={RecentOrders} />
		</div>
	);
};

export default DashboardContent;
