'use client';
import {useState} from 'react';
import AuthHeader from '@/components/header/auth-header';
import AccountSideBar from './components/account-side-bar';
import CartContent from './components/dashboard/cart-content';
import OrderContent from './components/dashboard/order-content';
import ProductsContent from './components/dashboard/products-content';
import SettingsContent from './components/dashboard/settings-content';
import WishListContent from './components/dashboard/wish-list-content';
import DashboardContent from './components/dashboard/dashboard-content';
import {useModal} from '@/hooks/use-modal';
import AddProductModal from './components/dashboard/modals/add-product-modal';
import { useUserHook } from '@/hooks/use-user';

export type Tab =
	| 'Dashboard'
	| 'Products'
	| 'Order History'
	| 'Wishlist'
	| 'Shopping Cart'
	| 'Settings'
	| 'Logout';

const AccountPage = () => {
	const {user} = useUserHook()

	const isModalOpen = useModal((state) => state.isOpen);
	const onModalOpen = useModal((state) => state.onOpen);

	const [currentTab, setCurrentTab] = useState<Tab>('Dashboard');

	return (
		<div className='w-full relative'>
			<AuthHeader />

			<div className='w-full flex flex-col justify-center items-center py-20 px-4 sm:px-10'>
				<div className='flex items-start justify-between w-full'>
					<AccountSideBar
						currentTab={currentTab}
						updateCurrentTab={setCurrentTab}
					/>

					{currentTab === 'Dashboard' && <DashboardContent />}
					{currentTab === 'Products' && (
						<ProductsContent
						user={user}
							isAddProductModalOpen={isModalOpen}
							onAddProductModalOpen={onModalOpen}
						/>
					)}
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
