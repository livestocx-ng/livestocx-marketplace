'use client';
import {
	Heart,
	LayoutDashboard,
	LogOut,
	RefreshCcw,
	Settings,
	ShoppingCartIcon,
} from 'lucide-react';
import {Tab} from '../page';
import {cn} from '@/lib/utils';
import {Dispatch, SetStateAction} from 'react';

interface AccountSideBarProps {
	currentTab: Tab;
	updateCurrentTab: Dispatch<SetStateAction<Tab>>;
}

const Tabs: Tab[] = [
	'Dashboard',
	'Order History',
	'Wishlist',
	'Shopping Cart',
	'Settings',
	'Logout',
];

const AccountSideBar = ({
	currentTab,
	updateCurrentTab,
}: AccountSideBarProps) => {
	return (
		<div className='w-[20%] flex flex-col pt-5 border rounded-lg'>
			<h1 className='font-semibold px-4'>Navigation</h1>

			<ul className='space-y- mt-5'>
				{Tabs.map((tab) => (
					<li
						key={tab}
						onClick={() => {
							updateCurrentTab(tab);
						}}
						className={cn(
							`cursor-pointer flex items-center space-x-3 py-4 px-4`,
							currentTab === tab
								? 'bg-slate-100 border-l-4 border-l-green-500'
								: 'text-gray-500',
							tab === 'Logout' ? 'rounded-bl-lg' : ''
						)}
					>
						{tab === 'Dashboard' && (
							<LayoutDashboard className='h-6 w-6' />
						)}
						{tab === 'Order History' && (
							<RefreshCcw className='h-6 w-6' />
						)}
						{tab === 'Wishlist' && <Heart className='h-6 w-6' />}
						{tab === 'Shopping Cart' && (
							<ShoppingCartIcon className='h-6 w-6' />
						)}
						{tab === 'Settings' && <Settings className='h-6 w-6' />}
						{tab === 'Logout' && <LogOut className='h-6 w-6' />}

						<p
							className={cn(
								'text-sm',
								currentTab === tab
									? 'text-black'
									: 'text-gray-500'
							)}
						>
							{tab}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AccountSideBar;
