'use client';
import {useEffect} from 'react';
import {
	useUpdateUserRoleModalStore,
	useUpdateGoogleProfileModalStore,
	useReadNotificationModalStore,
} from '@/hooks/use-global-store';
import {useRouter} from 'next/navigation';
import {useUserHook} from '@/hooks/use-user';
import Footer from '@/components/navigation/footer';
import Navbar from '@/components/navigation/main-nav-bar';
import UpdateUserRoleModal from '@/components/modals/user/update-user-role-modal';
import UpdateGoogleProfileModal from '@/components/modals/user/update-google-profile-modal';
import NotificationModal from '@/components/modals/notifications/notification-modal';

interface PagesLayoutProps {
	children: React.ReactNode;
}

const PagesLayout = ({children}: PagesLayoutProps) => {
	const router = useRouter();
	const {user} = useUserHook();

	const updateUserRoleModal = useUpdateUserRoleModalStore();
	const readNotificationModal = useReadNotificationModalStore();
	const updateGoogleProfileModal = useUpdateGoogleProfileModalStore();

	useEffect(() => {
		// if (user && !user?.isProfileUpdated && !user?.isVendorProfileUpdated) {
		// 	updateGoogleProfileModal.onOpen();
		// }
		if (
			user &&
			user?.isProfileUpdated &&
			!user?.isVendorProfileUpdated &&
			user?.role === 'FARMER'
		) {
			router.push('/compliance');
		}
	}, [user]);

	return (
		<div className='relative'>
			{updateUserRoleModal.isOpen && <UpdateUserRoleModal />}
			{readNotificationModal.isOpen && <NotificationModal />}
			{updateGoogleProfileModal.isOpen && <UpdateGoogleProfileModal />}

			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default PagesLayout;
