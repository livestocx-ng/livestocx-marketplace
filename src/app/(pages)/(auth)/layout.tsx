'use client';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useUserHook} from '@/hooks/use-user';
import Footer from '@/components/navigation/footer';
import Navbar from '@/components/navigation/main-nav-bar';
import {useUpdateUserRoleModalStore, useUpdateWelcomeFarmerModalStore} from '@/hooks/use-global-store';
import WelcomeFarmerModal from '@/components/modals/welcome/welcome-farmer-modal';
import UpdateUserRoleModal from '@/components/modals/user-role/update-user-role-modal';

interface AuthPagesLayoutProps {
	children: React.ReactNode;
}

const PagesLayout = ({children}: AuthPagesLayoutProps) => {
	const router = useRouter();
	const {user} = useUserHook();

	const welcomeFarmerModal = useUpdateWelcomeFarmerModalStore();

	useEffect(() => {
		if (user) {
			router.push('/');
		}
	}, [user]);

	return (
		<div className='relative'>
			{welcomeFarmerModal.isOpen && <WelcomeFarmerModal />}

			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default PagesLayout;
