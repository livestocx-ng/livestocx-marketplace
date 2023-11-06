'use client';
import Lottie from 'lottie-react';
import {redirect} from 'next/navigation';
import {useModal} from '@/hooks/use-modal';
import {useUserHook} from '@/hooks/use-user';
import AddProductModal from './components/dashboard/modals/add-product-modal';
import UpdateProductModal from './components/dashboard/modals/update-product-modal';
import DeleteProductModal from './components/dashboard/modals/delete-product-modal';
import LoadingAnimation from '../../../../../../public/animations/loading__animation__1.json';
import {
	useDeleteProductModalStore,
	useUpdateProductModalStore,
} from '@/hooks/use-global-store';

interface AccountLayoutProps {
	children: React.ReactNode;
}

export default function AccountLayout({children}: AccountLayoutProps) {
	const {user, error, isUserSuccess} = useUserHook();

	const isModalOpen = useModal((state) => state.isOpen);
	const isUpdateProductModalOpen = useUpdateProductModalStore(
		(state) => state.isOpen
	);
	const isDeleteProductModalOpen = useDeleteProductModalStore(
		(state) => state.isOpen
	);

	if (error && !user) {
		redirect('/');
	}

	if (!isUserSuccess) {
		return (
			<div className='h-screen w-full bg-main'>
				<div className='h-screen grid place-content-center bg-[#ffffff] z-10 fixed w-full'>
					<Lottie
						loop={true}
						className='h-full'
						animationData={LoadingAnimation}
						// animationData={'/animations/loading__animation.json'}
					/>
				</div>
			</div>
		);
	}

	if (user) {
		return (
			<div className='relative'>
				{' '}
				{isModalOpen && <AddProductModal />}
				{isUpdateProductModalOpen && <UpdateProductModal />}
				{isDeleteProductModalOpen && <DeleteProductModal />}
				{children}
			</div>
		);
	}
}
