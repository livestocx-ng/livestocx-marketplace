'use client';
import {useUserHook} from '@/hooks/use-user';
import Footer from '@/components/navigation/footer';
import Navbar from '@/components/navigation/main-nav-bar';
import {useUpdateUserRoleModalStore} from '@/hooks/use-global-store';
import UpdateUserRoleModal from '@/components/modals/user-role/update-user-role-modal';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

interface PagesLayoutProps {
	children: React.ReactNode;
}

const PagesLayout = ({children}: PagesLayoutProps) => {
	const router = useRouter();
	const {user} = useUserHook();

	const updateUserRoleModal = useUpdateUserRoleModalStore();

	useEffect(() => {
		if (user && !user?.isVendorProfileUpdated && user?.role === 'FARMER') {
			router.push('/compliance');
		}
	}, [user]);

	return (
		<div className='relative'>
			{updateUserRoleModal.isOpen && <UpdateUserRoleModal />}

			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default PagesLayout;
