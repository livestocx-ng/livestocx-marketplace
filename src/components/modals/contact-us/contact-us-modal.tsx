import Image from 'next/image';
import React from 'react';

const ContactUsModal = () => {
	return (
		<div
			className='
				flex space-x-5 items-center
                fixed z-10 mb-10 bottom-20 left- right-5 
            '
		>
			<div
				onClick={() => {
					// HANDLE REDIRECT TO WHATS APP HERE
					const url = `https://wa.me/+2348062899590`;

					window.open(url, '_blank');
				}}
				className='
					border border-[#ffffff80]
					bg-main h-12 w-12 rounded-full 
					flex flex-col items-center justify-center shadow-[#ffffff80] shadow-lg 
					cursor-pointer hover:-translate-y-1 transition-all ease-in-out duration-700
				'
			>
				<Image
					width={40}
					height={40}
					unoptimized={true}
					className='w-8 h-8'
					alt='Livestocx-contact-us'
					src='/icon__whatsapp.svg'
				/>
			</div>

			<div className='p-2 border border-slate-400 text-sm text-black w-[200px] rounded-md bg-white shadow-[#ffffff80] shadow-lg'>
				Give us your special request lets get you the product seller
				within an hour🕰️.
			</div>
		</div>
	);
};

export default ContactUsModal;
