'use client';
import {useEffect} from 'react';
import {
	useGlobalStore,
	useDownloadAppStore,
	useReferralModalStore,
	useShareProductModalStore,
	useUpdateUserRoleModalStore,
	useReadNotificationModalStore,
	useShareSellerStoreModalStore,
	useUpgradeToPremiumAccessStore,
	useUpdateWelcomeFarmerModalStore,
	useUpdateVendorProfileModalStore,
	useUpdateSearchLocationModalStore,
	useProductUploadSubscriptionModalStore,
	usePremiumSubscriptionSuccessModalStore,
	usePremiumSubscriptionCheckoutModalStore,
} from '@/hooks/use-global-store';
import axios, {AxiosError} from 'axios';
import {useUserHook} from '@/hooks/use-user';
import ShareProductModal from '@/components/modals/product/share-product-modal';
import UpdateUserRoleModal from '@/components/modals/user/update-user-role-modal';
import WelcomeFarmerModal from '@/components/modals/welcome/welcome-farmer-modal';
import UserReferralModal from '@/components/modals/referrals/user-referral-modal';
import NotificationModal from '@/components/modals/notifications/notification-modal';
import ShareSellerStoreModal from '@/components/modals/store/share-seller-store-modal';
import UpgradeToPremiumModal from '@/components/modals/premium/upgrade-to-premium-modal';
import DownloadMobileAppModal from '@/components/modals/welcome/download-mobile-app-modal';
import UpdateVendorProfileModal from '@/components/modals/user/update-vendor-profile-modal';
import UpdateSearchLocationModal from '@/components/modals/utils/update-search-location-modal';
import ProductUploadSubscriptionModal from '@/components/modals/premium/product-upload-subscription-modal';
import PremiumSubscriptionSuccessModal from '@/components/modals/premium/premium-subscription-success-modal';
import PremiumSubscriptionCheckoutModal from '@/components/modals/premium/premium-subscription-checkout-modal';

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
		updateProductUploadSubscriptionPlans,
	} = useGlobalStore();

	const referralModal = useReferralModalStore();
	const downloadAppModal = useDownloadAppStore();
	const shareProductModal = useShareProductModalStore();
	const updateUserRoleModal = useUpdateUserRoleModalStore();
	const welcomeFarmerModal = useUpdateWelcomeFarmerModalStore();
	const readNotificationModal = useReadNotificationModalStore();
	const shareSellerStoreModal = useShareSellerStoreModalStore();
	const updateVendorProfileModal = useUpdateVendorProfileModalStore();
	const upgradeToPremiumAccessModal = useUpgradeToPremiumAccessStore();
	const updateSearchLocationModal = useUpdateSearchLocationModalStore();
	const productUploadSubscriptionModal = useProductUploadSubscriptionModalStore();
	const premiumSubscriptionSuccessModal = usePremiumSubscriptionSuccessModalStore();
	const premiumSubscriptionCheckoutModal = usePremiumSubscriptionCheckoutModalStore();

	const initializeUserReferralModal = () => {
		setTimeout(() => {
			referralModal.onOpen();
		}, 6500);

		setTimeout(() => {
			referralModal.onOpen();
		}, 300000);
	};

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
			const [
				promotionPlansRequest,
				premiumSubscriptionPlansRequest,
				productUploadSubscriptionPlansRequest,
			] = await Promise.all([
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/promotions/plans`
				),
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/vendor/premium-subscription-plans`
				),
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/vendor/product-upload-subscription-plans`
				),
			]);

			updatePromotionPlans(promotionPlansRequest.data.data);
			
			updatePremiumSubscriptionPlans(
				premiumSubscriptionPlansRequest.data.data
			);
			
			updateProductUploadSubscriptionPlans(
				productUploadSubscriptionPlansRequest.data.data
			);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-USER-PROMOTION-PLAN-ERROR] :: ', _error);
		}
	};

	// useEffect(() => {
	// 	initializeDownloadAppModal();
	// }, []);

	useEffect(() => {
		if (
			user &&
			user?.role === 'FARMER' &&
			user?.isVendorProfileUpdated === false
		) {
			updateVendorProfileModal.onOpen();
		}

		if (user) {
			initializeUserReferralModal();
		}

		fetchChatConversations();
		fetchUserPromotionPlan();
		fetchSubscriptionPlans();
	}, [user]);

	return (
		<div className='relative'>
			{referralModal.isOpen && <UserReferralModal />}
			{shareProductModal.isOpen && <ShareProductModal />}
			{welcomeFarmerModal.isOpen && <WelcomeFarmerModal />}
			{updateUserRoleModal.isOpen && <UpdateUserRoleModal />}
			{downloadAppModal.isOpen && <DownloadMobileAppModal />}
			{readNotificationModal.isOpen && <NotificationModal />}
			{shareSellerStoreModal.isOpen && <ShareSellerStoreModal />}
			{upgradeToPremiumAccessModal.isOpen && <UpgradeToPremiumModal />}
			{updateVendorProfileModal.isOpen && <UpdateVendorProfileModal />}
			{updateSearchLocationModal.isOpen && <UpdateSearchLocationModal />}
			{productUploadSubscriptionModal.isOpen && <ProductUploadSubscriptionModal /> }
			{premiumSubscriptionSuccessModal.isOpen && <PremiumSubscriptionSuccessModal /> }
			{premiumSubscriptionCheckoutModal.isOpen && <PremiumSubscriptionCheckoutModal /> }

			{children}
		</div>
	);
};

export default PagesLayout;
