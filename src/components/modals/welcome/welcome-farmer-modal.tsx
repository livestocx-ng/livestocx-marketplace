'use client';
import {X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useUpdateWelcomeFarmerModalStore} from '@/hooks/use-global-store';

const WelcomeFarmerModal = () => {
	const {onClose} = useUpdateWelcomeFarmerModalStore();

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-20'>
			<div className='bg-white py-6  px-5 w-[50%] transition-all duration-700 ease-in-out translate-x-3'>
				<div className='flex items-center justify-between'>
					<h1 className='text-xl font-medium'>
						Welcome to Livestocx!
					</h1>
				</div>

				<div className='space-y-3 my-5'>
					<p className='text-base'>
						We're thrilled to have you join Livestocx, the ultimate
						platform for farmers like you!
					</p>
					<p className='text-base leading-6'>
						At Livestocx, we understand the importance of your hard
						work and dedication to farming. As a valued member, you
						have the power to showcase and share your exceptional
						livestock products with the world.
					</p>
				</div>

				<div className='flex justify-end'>
					<Button
						type='button'
						variant={'outline'}
						onClick={() => onClose()}
						className='w-fit bg-white hover:bg-white text-sm font-medium underline h-12 text-red-500 hover:text-red-500 rounded-none py-3 px-8 border-0'
					>
						Close
					</Button>
				</div>
			</div>
		</div>
	);
};

export default WelcomeFarmerModal;