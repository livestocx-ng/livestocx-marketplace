'use client';
import {cn} from '@/lib/utils';
import AuthHeader from '@/components/header/auth-header';

import {useState} from 'react';
import AccountSideBar from './components/account-side-bar';

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
				</div>
			</div>
		</div>
	);
};

export default AccountPage;
