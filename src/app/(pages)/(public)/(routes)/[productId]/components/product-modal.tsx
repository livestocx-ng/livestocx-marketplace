'use client';

import {Button} from '@/components/ui/button';
import {Modal} from '@/components/ui/modal';
import {useModal} from '@/hooks/use-modal';
import Image from 'next/image';

const ProductModal = () => {
	const modal = useModal();

	const handleModalClose = () => modal.onClose();

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-10'>
			<div className='flex items-center justify-center sm:space-x-5 w-full relative'>
				<Image
					width={30}
					height={30}
					alt='icon-left'
					src={'/icon__left.svg'}
					onClick={handleModalClose}
					className='cursor-pointer hidden sm:block'
				/>

				<Image
					width={30}
					height={30}
					alt='icon-left'
					src={'/icon__left.svg'}
					onClick={handleModalClose}
					className='cursor-pointer block sm:hidden absolute top-30 left-0 z-10'
				/>

				<div className='h-[300px] md:h-[400px] w-full md:w-[600px] relative'>
					<Image
						fill
						alt={'product'}
						src={'/product__2.png'}
						className='rounded-lg h-full w-full '
					/>
					B
				</div>

				<Image
					width={30}
					height={30}
					alt='icon-left'
					src={'/icon__right.svg'}
					onClick={handleModalClose}
					className='cursor-pointer hidden sm:block'
				/>

				<Image
					width={30}
					height={30}
					alt='icon-right'
					src={'/icon__right.svg'}
					onClick={handleModalClose}
					className='cursor-pointer block sm:hidden absolute top-30 right-0 z-10'
				/>
			</div>
		</div>
		// <Modal
		// 	title='Create Store'
		// 	isOpen={modal.isOpen}
		// 	onClose={modal.onClose}
		// 	description='Add a new store to manage products and categories'
		// >
		// 	<div className=''></div>
		// </Modal>
	);
};

export default ProductModal;
