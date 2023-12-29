'use client';
import {
	useGlobalStore,
	useProductMediaModalStore,
} from '@/hooks/use-global-store';
import AuthHeader from '@/components/header/auth-header';
import AccountSideBar from './components/account-side-bar';
import ProductContent from './components/dashboard/product-content';
import ProductsContent from './components/dashboard/products-content';
import SettingsContent from './components/dashboard/settings-content';
import MessagesContent from './components/dashboard/messages-content';
import MobileAccountSideBar from './components/mobile-account-sidebar';
import DashboardContent from './components/dashboard/dashboard-content';
import ProductMediaModal from '@/components/modals/product/product-media-modal';
import DesiredItemContent from './components/dashboard/desired-item-content';
import DesiredItemsContent from './components/dashboard/desired-items-content';
import AdvertisementContent from './components/dashboard/advertisement-content';
import NotificationsContent from './components/dashboard/notifications-content';

const AccountPage = () => {
	const {currentAccountTab} = useGlobalStore();

	const isProductMediaModalOpen = useProductMediaModalStore(
		(state) => state.isOpen
	);

	return (
		<div className='w-full relative'>
			{isProductMediaModalOpen && <ProductMediaModal />}

			<section className='h-[35vh] w-full bg-home flex flex-col items-center justify-center pt-10 md:pt-0'>
				<h1 className='text-xl md:text-5xl font-medium text-white'>
					{currentAccountTab}
				</h1>
			</section>

			<div className='w-full flex flex-col justify-center items-center py-10 md:py-20 px-4 sm:px-10'>
				<div className='flex w-full'>
					<MobileAccountSideBar />
				</div>

				<div className='flex items-start justify-between w-full'>
					<AccountSideBar />

					{currentAccountTab === 'Account' && <DashboardContent />}

					{currentAccountTab === 'Products' && <ProductsContent />}

					{currentAccountTab === 'Product' && <ProductContent />}

					{currentAccountTab === 'Desired Items' && (
						<DesiredItemsContent />
					)}

					{currentAccountTab === 'Desired Item' && (
						<DesiredItemContent />
					)}

					{currentAccountTab === 'Advertise' && (
						<AdvertisementContent />
					)}

					{currentAccountTab === 'Messages' && <MessagesContent />}

					{currentAccountTab === 'Notifications' && (
						<NotificationsContent />
					)}

					{currentAccountTab === 'Settings' && <SettingsContent />}

					{/* {currentAccountTab === 'Order History' && <OrderContent />}

					{currentAccountTab === 'Wishlist' && <WishListContent />}

					{currentAccountTab === 'Shopping Cart' && <CartContent />} */}
				</div>
			</div>
		</div>
	);
};

export default AccountPage;
