'use client';
import {
	useCreateProductModalStore,
	useDeleteProductModalStore,
	useUpdateProductModalStore,
} from '@/hooks/use-global-store';
import {redirect} from 'next/navigation';
import {useUserHook} from '@/hooks/use-user';
import AddProductModal from '@/components/modals/product/add-product-modal';
import UpdateProductModal from '@/components/modals/product/update-product-modal';
import DeleteProductModal from '@/components/modals/product/delete-product-modal';

interface AccountLayoutProps {
	children: React.ReactNode;
}

export default function AccountLayout({children}: AccountLayoutProps) {
	const {user, error, isUserSuccess} = useUserHook();

	const isCreateProductModalOpen = useCreateProductModalStore(
		(state) => state.isOpen
	);
	const isUpdateProductModalOpen = useUpdateProductModalStore(
		(state) => state.isOpen
	);
	const isDeleteProductModalOpen = useDeleteProductModalStore(
		(state) => state.isOpen
	);

	if (error && !user) {
		redirect('/');
	}

	// if (!isUserSuccess) {
	// 	return (
	// 		<div className='h-screen w-full bg-main'>
	// 			<div className='h-screen grid place-content-center bg-[#ffffff] z-10 fixed w-full'>
	// 				<Lottie
	// 					loop={true}
	// 					className='h-full'
	// 					animationData={LoadingAnimation}
	// 					// animationData={'/animations/loading__animation.json'}
	// 				/>
	// 			</div>
	// 		</div>
	// 	);
	// }

	if (user) {
		return (
			<div className='relative'>
				{' '}
				{isCreateProductModalOpen && <AddProductModal />}
				{isUpdateProductModalOpen && <UpdateProductModal />}
				{isDeleteProductModalOpen && <DeleteProductModal />}
				{children}
			</div>
		);
	}
}
