'use client';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useUserHook} from '@/hooks/use-user';
import Footer from '@/components/navigation/footer';
import Navbar from '@/components/navigation/main-nav-bar';

interface AuthPagesLayoutProps {
	children: React.ReactNode;
}

const PagesLayout = ({children}: AuthPagesLayoutProps) => {
	const router = useRouter();
	const {user} = useUserHook();

	useEffect(() => {
		if (user) {
			router.push('/');
		}
	}, [user]);

	return (
		<div className=''>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default PagesLayout;
