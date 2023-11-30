'use client';
import {useUserHook} from '@/hooks/use-user';
import Footer from '@/components/navigation/footer';
import Navbar from '@/components/navigation/main-nav-bar';
import {useUpdateUserRoleModalStore} from '@/hooks/use-global-store';
import UpdateUserRoleModal from '@/components/modals/user-role/update-user-role-modal';

interface PagesLayoutProps {
	children: React.ReactNode;
}

const PagesLayout = ({children}: PagesLayoutProps) => {
	const userHook = useUserHook();

	const updateUserRoleModal = useUpdateUserRoleModalStore();

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
