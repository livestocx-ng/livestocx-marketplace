'use client';
import {
	Heart,
	LayoutDashboard,
	LogOut,
	RefreshCcw,
	Settings,
	ShoppingCartIcon,
} from 'lucide-react';
import axios from 'axios';
import {Tab} from '../page';
import {cn} from '@/lib/utils';
import {toast} from 'react-hot-toast';
import {Dispatch, SetStateAction} from 'react';
import {redirect, useRouter} from 'next/navigation';

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
	const router = useRouter();

	return (
		<div className='w-[20%] flex flex-col pt-3 border rounded'>
			<h1 className='font-semibold px-4'>Navigation</h1>

			<ul className='space-y- mt-5'>
				{Tabs.map((tab) => (
					<li
						key={tab}
						onClick={async () => {
							if (tab !== 'Logout') {
								updateCurrentTab(tab);
							} else {
								try {
									await axios.get('/api/auth/signout');

									toast.success('Logged out!');

									router.push('/');

									window.location.reload();
								} catch (error) {
									console.log('[LOGOUT-ERROR] :: ', error);
								}
							}
						}}
						className={cn(
							`cursor-pointer flex items-center space-x-3 py-4 px-4`,
							currentTab === tab
								? 'bg-slate-100 border-l-4 border-l-green-500'
								: 'text-gray-500',
							tab === 'Logout'
								? 'rounded-bl hover:border-l-4 border-l-red-500 hover:border-l-red-500 hover:text-red-400'
								: ''
						)}
					>
						{tab === 'Dashboard' && (
							<LayoutDashboard
								className={`h-6 w-6 ${
									currentTab == tab && 'text-green-600'
								}`}
							/>
						)}
						{tab === 'Order History' && (
							<RefreshCcw
								className={`h-6 w-6 ${
									currentTab == tab && 'text-green-600'
								}`}
							/>
						)}
						{tab === 'Wishlist' && (
							<Heart
								className={`h-6 w-6 ${
									currentTab == tab && 'text-green-600'
								}`}
							/>
						)}
						{tab === 'Shopping Cart' && (
							<ShoppingCartIcon
								className={`h-6 w-6 ${
									currentTab == tab && 'text-green-600'
								}`}
							/>
						)}
						{tab === 'Settings' && (
							<Settings
								className={`h-6 w-6 ${
									currentTab == tab && 'text-green-600'
								}`}
							/>
						)}
						{tab === 'Logout' && (
							<LogOut
								className={`h-6 w-6 ${
									currentTab == tab &&
									tab === 'Logout' &&
									'text-red-600'
								}`}
							/>
						)}

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
