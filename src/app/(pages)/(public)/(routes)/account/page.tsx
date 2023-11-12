'use client';
import {
	useGlobalStore,
	useProductMediaModalStore,
} from '@/hooks/use-global-store';
import AuthHeader from '@/components/header/auth-header';
import AccountSideBar from './components/account-side-bar';
import CartContent from './components/dashboard/cart-content';
import OrderContent from './components/dashboard/order-content';
import ProductsContent from './components/dashboard/products-content';
import SettingsContent from './components/dashboard/settings-content';
import WishListContent from './components/dashboard/wish-list-content';
import DashboardContent from './components/dashboard/dashboard-content';
import ProductContent from './components/dashboard/product-content';
import ProductMediaModal from '../../../../../components/modals/product-media-modal';

const AccountPage = () => {
	const {currentAccountTab} = useGlobalStore();

	const isProductMediaModalOpen = useProductMediaModalStore(
		(state) => state.isOpen
	);

	return (
		<div className='w-full relative'>
			{isProductMediaModalOpen && <ProductMediaModal />}

			<AuthHeader />

			<div className='w-full flex flex-col justify-center items-center py-20 px-4 sm:px-10'>
				<div className='flex items-start justify-between w-full'>
					<AccountSideBar />

					{currentAccountTab === 'Dashboard' && <DashboardContent />}

					{currentAccountTab === 'Products' && <ProductsContent />}

					{currentAccountTab === 'Product' && <ProductContent />}

					{currentAccountTab === 'Order History' && <OrderContent />}

					{currentAccountTab === 'Wishlist' && <WishListContent />}

					{currentAccountTab === 'Shopping Cart' && <CartContent />}

					{currentAccountTab === 'Settings' && <SettingsContent />}
				</div>
			</div>
		</div>
	);
};

export default AccountPage;
