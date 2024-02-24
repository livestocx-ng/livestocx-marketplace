'use client';
import Image from 'next/image';

const MessagesContent = () => {
	return (
		<div className='w-full md:w-[78%] flex flex-col gap-5'>
			<div className='flex flex-col items-center justify-center py-20'>
				<Image
					alt='logo'
					width={150}
					height={150}
					unoptimized={true}
					src={'/logo.svg'}
					className='opacity-50'
				/>
			</div>
		</div>
	);
};

export default MessagesContent;
