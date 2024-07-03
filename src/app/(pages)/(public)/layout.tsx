'use client';
import {useEffect} from 'react';
import {
	useGlobalStore,
	useDownloadAppStore,
	useShareProductModalStore,
	useUpdateUserRoleModalStore,
	useReadNotificationModalStore,
	useUpgradeToPremiumAccessStore,
	useUpdateWelcomeFarmerModalStore,
	useUpdateVendorProfileModalStore,
	useUpdateSearchLocationModalStore,
	usePremiumSubscriptionCheckoutModalStore,
	usePremiumSubscriptionSuccessModalStore,
} from '@/hooks/use-global-store';
import axios, {AxiosError} from 'axios';
import {useUserHook} from '@/hooks/use-user';
import Footer from '@/components/navigation/footer';
import Navbar from '@/components/navigation/main-nav-bar';
import ShareProductModal from '@/components/modals/product/share-product-modal';
import UpdateUserRoleModal from '@/components/modals/user/update-user-role-modal';
import WelcomeFarmerModal from '@/components/modals/welcome/welcome-farmer-modal';
import NotificationModal from '@/components/modals/notifications/notification-modal';
import UpgradeToPremiumModal from '@/components/modals/premium/upgrade-to-premium-modal';
import DownloadMobileAppModal from '@/components/modals/welcome/download-mobile-app-modal';
import UpdateVendorProfileModal from '@/components/modals/user/update-vendor-profile-modal';
import UpdateSearchLocationModal from '@/components/modals/utils/update-search-location-modal';
import PremiumSubscriptionCheckoutModal from '@/components/modals/premium/premium-subscription-checkout-modal';
import PremiumSubscriptionSuccessModal from '@/components/modals/premium/premium-subscription-success-modal';

interface PagesLayoutProps {
	children: React.ReactNode;
}

const PagesLayout = ({children}: PagesLayoutProps) => {
	const {user} = useUserHook();

	const {
		updateVendorProfile,
		updatePromotionPlans,
		updateChatConversations,
		updateUserPromotionPlan,
		updateUserPremiumSubscription,
		updatePremiumSubscriptionPlans,
	} = useGlobalStore();

	const downloadAppModal = useDownloadAppStore();
	const shareProductModal = useShareProductModalStore();
	const updateUserRoleModal = useUpdateUserRoleModalStore();
	const welcomeFarmerModal = useUpdateWelcomeFarmerModalStore();
	const readNotificationModal = useReadNotificationModalStore();
	const updateVendorProfileModal = useUpdateVendorProfileModalStore();
	const upgradeToPremiumAccessModal = useUpgradeToPremiumAccessStore();
	const updateSearchLocationModal = useUpdateSearchLocationModalStore();
	const premiumSubscriptionSuccessModal =
		usePremiumSubscriptionSuccessModalStore();
	const premiumSubscriptionCheckoutModal =
		usePremiumSubscriptionCheckoutModalStore();

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

			const [
				userPromotionPlanRequest,
				userPremiumSubscriptionRequest,
				vendorProfileRequest,
			] = await Promise.all([
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/promotions/plan`,
					{
						headers: {
							Authorization: user?.accessToken,
						},
					}
				),
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/vendor/premium-subscription`,
					{
						headers: {
							Authorization: user?.accessToken,
						},
					}
				),
				axios.get(`${process.env.NEXT_PUBLIC_API_URL}/vendor/profile`, {
					headers: {
						Authorization: user?.accessToken,
					},
				}),
			]);

			updateVendorProfile(vendorProfileRequest.data.data);
			updateUserPromotionPlan(userPromotionPlanRequest.data.data);
			updateUserPremiumSubscription(
				userPremiumSubscriptionRequest.data.data
			);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-USER-PROMOTION-PLAN-ERROR] :: ', _error);
		}
	};

	const fetchSubscriptionPlans = async () => {
		try {
			const [promotionPlansRequest, premiumSubscriptionPlansRequest] =
				await Promise.all([
					axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/promotions/plans`
					),
					axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/vendor/premium-subscription-plans`
					),
				]);

			updatePromotionPlans(promotionPlansRequest.data.data);
			updatePremiumSubscriptionPlans(
				premiumSubscriptionPlansRequest.data.data
			);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-USER-PROMOTION-PLAN-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		initializeDownloadAppModal();
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
		fetchSubscriptionPlans();
	}, [user]);

	return (
		<div className='relative'>
			{shareProductModal.isOpen && <ShareProductModal />}
			{welcomeFarmerModal.isOpen && <WelcomeFarmerModal />}
			{updateUserRoleModal.isOpen && <UpdateUserRoleModal />}
			{downloadAppModal.isOpen && <DownloadMobileAppModal />}
			{readNotificationModal.isOpen && <NotificationModal />}
			{upgradeToPremiumAccessModal.isOpen && <UpgradeToPremiumModal />}
			{updateVendorProfileModal.isOpen && <UpdateVendorProfileModal />}
			{updateSearchLocationModal.isOpen && <UpdateSearchLocationModal />}
			{premiumSubscriptionSuccessModal.isOpen && (
				<PremiumSubscriptionSuccessModal />
			)}
			{premiumSubscriptionCheckoutModal.isOpen && (
				<PremiumSubscriptionCheckoutModal />
			)}

			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default PagesLayout;
