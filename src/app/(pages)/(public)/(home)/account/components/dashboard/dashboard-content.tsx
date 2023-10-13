import {DataTable} from '@/components/ui/data-table';
import Image from 'next/image';
import Link from 'next/link';
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

const DashboardContent = () => {
	return (
		<div className='w-[78%] flex flex-col gap-5'>
			<div className='flex items-center justify-between w-full'>
				<div className='p-10 flex flex-col items-center w-[45%] h-[280px] justify-center space-y-3 border rounded-lg'>
					<Image
						alt='image'
						width={150}
						height={150}
						src={'/user__1.svg'}
						className='rounded-full'
					/>

					<h1 className='text-base'>Michael Jigga</h1>
					<p className='text-sm'>Customer</p>
					<Link
						href={'#'}
						className='text-main text-sm font-semibold'
					>
						Edit Profile
					</Link>
				</div>
				<div className='p-5 flex flex-col items-start w-[45%] h-[280px] justify-between border rounded-lg'>
					<div className='space-y-3'>
						<h1 className='text-base text-gray-400'>
							Billing Address
						</h1>
						<div className='space-y-1'>
							<h1 className='text-base'>Michael Jigga</h1>
							<p className='text-sm'>
								New Rayfield, Road 33 Abuja Street
							</p>
						</div>
						<div className='space-y-1'>
							<h1 className='text-base'>
								michael.jigga@gmail.com
							</h1>
							<h1 className='text-base'>09025605622</h1>
						</div>
					</div>
					<Link
						href={'#'}
						className='text-main text-sm font-semibold'
					>
						Edit Profile
					</Link>
				</div>
			</div>

			<DataTable columns={columns} data={RecentOrders} />
		</div>
	);
};

export default DashboardContent;
