'use client'
import React from 'react';
import Lottie from 'lottie-react';
import Animation from '../../../../../public/animations/animation__payment.json';
import Link from 'next/link';

const SurveyFeedback = () => {
	return (
		<div className={'flex flex-col justify-center items-center h-screen bg-neutral-50'}>
			<div className='w-full max-w-md bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center text-center'>
				<div className='h-40 w-40 mb-6'>
					<img src="/icon_check.png" alt="" className="h-full w-full" />
				</div>

				<h1 className='text-2xl font-bold text-neutral-900 mb-2'>
					Thank You!
				</h1>
				<p className='text-neutral-600 mb-8'>
					We appreciate your feedback. It helps us improve our services for you.
				</p>

				<Link
					href="/"
					className='px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors'
				>
					Back to Home
				</Link>
			</div>
		</div>
	);
};

export default SurveyFeedback;
