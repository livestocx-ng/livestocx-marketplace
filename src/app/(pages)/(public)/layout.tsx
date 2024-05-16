'use client';
import {useEffect} from 'react';
import {
	useGlobalStore,
	useDownloadAppStore,
	useShareProductModalStore,
	useUpdateUserRoleModalStore,
	useReadNotificationModalStore,
	useUpdateVendorProfileModalStore,
	useUpdateSearchLocationModalStore,
} from '@/hooks/use-global-store';
import axios, {AxiosError} from 'axios';
import {useUserHook} from '@/hooks/use-user';
import Footer from '@/components/navigation/footer';
import Navbar from '@/components/navigation/main-nav-bar';
import ContactUsBanner from '@/components/modals/contact-us/contact-us-banner';
import ShareProductModal from '@/components/modals/product/share-product-modal';
import UpdateUserRoleModal from '@/components/modals/user/update-user-role-modal';
import NotificationModal from '@/components/modals/notifications/notification-modal';
import DownloadMobileAppModal from '@/components/modals/welcome/download-mobile-app-modal';
import UpdateVendorProfileModal from '@/components/modals/user/update-vendor-profile-modal';
import UpdateSearchLocationModal from '@/components/modals/utils/update-search-location-modal';

interface PagesLayoutProps {
	children: React.ReactNode;
}

const PagesLayout = ({children}: PagesLayoutProps) => {
	const {user} = useUserHook();

	const {
		updateChatConversations,
		updateUserPromotionPlan,
		updatePromotionPlans,
	} = useGlobalStore();

	const downloadAppModal = useDownloadAppStore();
	const shareProductModal = useShareProductModalStore();
	const updateUserRoleModal = useUpdateUserRoleModalStore();
	const readNotificationModal = useReadNotificationModalStore();
	const updateVendorProfileModal = useUpdateVendorProfileModalStore();
	const updateSearchLocationModal = useUpdateSearchLocationModalStore();

	const initializeDownloadAppModal = () => {
		setTimeout(() => {
			downloadAppModal.onOpen();
		}, 6500);
	};

	const fetchChatConversations = async () => {
		try {
			if (!user) {
				return;
			}

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/chat/conversations?page=1`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[CONVERSATIONS-RESPONSE] :: ', data);

			updateChatConversations(data.data.conversations);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	const fetchUserPromotionPlan = async () => {
		try {
			if (!user) {
				return;
			}

			const [userPlanRequest, promotionPlansRequest] = await Promise.all([
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/promotions/plan`,
					{
						headers: {
							Authorization: user?.accessToken,
						},
					}
				),
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/promotions/plans`
				),
			]);

			// console.log(
			// 	'[USER-PROMOTION-PLAN-RESPONSE] :: ',
			// 	userPlanRequest.data
			// );

			updateUserPromotionPlan(userPlanRequest.data.data);
			updatePromotionPlans(promotionPlansRequest.data.data);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-USER-PROMOTION-PLAN-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		// initializeDownloadAppModal();
	}, []);

	useEffect(() => {
		if (
			user &&
			user?.role === 'FARMER' &&
			user?.isVendorProfileUpdated === false
		) {
			// router.push('/compliance');
			updateVendorProfileModal.onOpen();
		}

		fetchChatConversations();
		fetchUserPromotionPlan();
	}, [user]);

	return (
		<div className='relative'>
			{downloadAppModal.isOpen && <DownloadMobileAppModal />}
			{shareProductModal.isOpen && <ShareProductModal />}
			{updateUserRoleModal.isOpen && <UpdateUserRoleModal />}
			{readNotificationModal.isOpen && <NotificationModal />}
			{updateSearchLocationModal.isOpen && <UpdateSearchLocationModal />}
			{updateVendorProfileModal.isOpen && <UpdateVendorProfileModal />}

			<Navbar />
			{children}
			<ContactUsBanner />
			<Footer />
		</div>
	);
};

export default PagesLayout;
