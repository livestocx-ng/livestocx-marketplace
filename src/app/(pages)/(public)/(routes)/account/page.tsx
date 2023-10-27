'use client';
import {useState} from 'react';
import AuthHeader from '@/components/header/auth-header';
import AccountSideBar from './components/account-side-bar';
import CartContent from './components/dashboard/cart-content';
import OrderContent from './components/dashboard/order-content';
import SettingsContent from './components/dashboard/settings-content';
import WishListContent from './components/dashboard/wish-list-content';
import DashboardContent from './components/dashboard/dashboard-content';

export type Tab =
	| 'Dashboard'
	| 'Order History'
	| 'Wishlist'
	| 'Shopping Cart'
	| 'Settings'
	| 'Logout';

const AccountPage = () => {
	const [currentTab, setCurrentTab] = useState<Tab>('Dashboard');

	return (
		<div className='w-full'>
			<AuthHeader />

			<div className='w-full flex flex-col justify-center items-center py-20 px-4 sm:px-10'>
				<div className='flex items-start justify-between w-full'>
					<AccountSideBar
						currentTab={currentTab}
						updateCurrentTab={setCurrentTab}
					/>

					{currentTab === 'Dashboard' && <DashboardContent />}
					{currentTab === 'Order History' && <OrderContent />}
					{currentTab === 'Wishlist' && <WishListContent />}
					{currentTab === 'Shopping Cart' && <CartContent />}
					{currentTab === 'Settings' && <SettingsContent />}
				</div>
			</div>
		</div>
	);
};

export default AccountPage;
