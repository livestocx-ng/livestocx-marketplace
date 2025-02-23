'use client'
import React from 'react';
import Lottie from 'lottie-react';
import Animation from '../../../../../public/animations/animation__payment.json';

const VerifyPaymentScreen = () => {
	return (
		<div className={'flex flex-col justify-center items-center h-screen'}>
			<div className='h-[200px] w-1/2 mx-auto bg-white'>
				<Lottie
					loop={true}
					className='h-full'
					animationData={Animation}
				/>
			</div>
		</div>
	);
};

export default VerifyPaymentScreen;
