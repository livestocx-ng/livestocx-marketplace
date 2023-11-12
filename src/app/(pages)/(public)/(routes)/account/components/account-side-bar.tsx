'use client';
import {
	Heart,
	LogOut,
	Package,
	Settings,
	RefreshCcw,
	LayoutDashboard,
	ShoppingCartIcon,
} from 'lucide-react';
import axios from 'axios';
import {cn} from '@/lib/utils';
import {Tab} from '@/types/types';
import {toast} from 'react-hot-toast';
import {redirect, useRouter} from 'next/navigation';
import {useGlobalStore} from '@/hooks/use-global-store';

interface AccountSideBarProps {}

const Tabs: Tab[] = [
	'Dashboard',
	'Products',
	// 'Order History',
	// 'Wishlist',
	// 'Shopping Cart',
	'Settings',
	'Logout',
];

const AccountSideBar = ({}: AccountSideBarProps) => {
	const router = useRouter();
	const {updateUser, currentAccountTab, updateCurrentAccountTab} =
		useGlobalStore();

	return (
		<div className='w-[20%] flex flex-col pt-3 border rounded'>
			<h1 className='font-semibold px-4'>Navigation</h1>

			<ul className='space-y- mt-5'>
				{Tabs.map((tab) => (
					<li
						key={tab}
						onClick={async () => {
							if (tab !== 'Logout') {
								updateCurrentAccountTab(tab);
							} else {
								try {
									await axios.get('/api/auth/signout');

									toast.success('Logged out!');

									updateUser(null);

									router.push('/');

									// window.location.reload();
								} catch (error) {
									console.log('[LOGOUT-ERROR] :: ', error);
								}
							}
						}}
						className={cn(
							`cursor-pointer flex items-center space-x-3 py-4 px-4`,
							currentAccountTab === tab
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
									currentAccountTab == tab && 'text-green-600'
								}`}
							/>
						)}
						{tab === 'Products' && (
							<Package
								className={`h-6 w-6 ${
									currentAccountTab == tab && 'text-green-600'
								}`}
							/>
						)}
						{tab === 'Order History' && (
							<RefreshCcw
								className={`h-6 w-6 ${
									currentAccountTab == tab && 'text-green-600'
								}`}
							/>
						)}
						{tab === 'Wishlist' && (
							<Heart
								className={`h-6 w-6 ${
									currentAccountTab == tab && 'text-green-600'
								}`}
							/>
						)}
						{tab === 'Shopping Cart' && (
							<ShoppingCartIcon
								className={`h-6 w-6 ${
									currentAccountTab == tab && 'text-green-600'
								}`}
							/>
						)}
						{tab === 'Settings' && (
							<Settings
								className={`h-6 w-6 ${
									currentAccountTab == tab && 'text-green-600'
								}`}
							/>
						)}
						{tab === 'Logout' && (
							<LogOut
								className={`h-6 w-6 ${
									currentAccountTab == tab &&
									tab === 'Logout' &&
									'text-red-600'
								}`}
							/>
						)}

						<p
							className={cn(
								'text-xs',
								currentAccountTab === tab
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
