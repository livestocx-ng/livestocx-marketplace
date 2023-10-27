'use client';
import { Fragment } from 'react';
import Lottie from 'lottie-react';
import {redirect} from 'next/navigation';
import {useUserHook} from '@/hooks/use-user';
import LoadingAnimation from '../../../../../../public/animations/loading__animation__1.json';

interface AccountLayoutProps {
	children: React.ReactNode;
}

export default function AccountLayout({children}: AccountLayoutProps) {
	const {user, error, isUserSuccess} = useUserHook();

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
		return <Fragment>{children}</Fragment>;
	}
}
