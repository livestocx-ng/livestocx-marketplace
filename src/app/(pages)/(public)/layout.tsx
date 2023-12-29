'use client';
import {useEffect} from 'react';
import {
	useUpdateUserRoleModalStore,
	useReadNotificationModalStore,
	useUpdateVendorProfileModalStore,
	useUpdateSearchLocationModalStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import {useRouter} from 'next/navigation';
import {useUserHook} from '@/hooks/use-user';
import Footer from '@/components/navigation/footer';
import Navbar from '@/components/navigation/main-nav-bar';
import UpdateUserRoleModal from '@/components/modals/user/update-user-role-modal';
import UpdateVendorProfileModal from '@/components/modals/user/update-vendor-profile-modal';
import NotificationModal from '@/components/modals/notifications/notification-modal';
import UpdateSearchLocationModal from '@/components/modals/utils/update-search-location-modal';

interface PagesLayoutProps {
	children: React.ReactNode;
}

const PagesLayout = ({children}: PagesLayoutProps) => {
	const router = useRouter();
	const {user} = useUserHook();

	const updateUserRoleModal = useUpdateUserRoleModalStore();
	const readNotificationModal = useReadNotificationModalStore();
	const updateVendorProfileModal = useUpdateVendorProfileModalStore();
	const updateSearchLocationModal = useUpdateSearchLocationModalStore();

	useEffect(() => {
		if (
			user &&
			user?.role === 'FARMER' &&
			user?.isVendorProfileUpdated === false
		) {
			// router.push('/compliance');
			updateVendorProfileModal.onOpen();
		}
	}, [user]);

	return (
		<div className='relative'>
			{updateUserRoleModal.isOpen && <UpdateUserRoleModal />}
			{readNotificationModal.isOpen && <NotificationModal />}
			{updateSearchLocationModal.isOpen && <UpdateSearchLocationModal />}
			{updateVendorProfileModal.isOpen && <UpdateVendorProfileModal />}

			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default PagesLayout;
