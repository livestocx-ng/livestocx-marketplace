'use client';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {getLocalStorage, setLocalStorage} from '@/lib/localstorageHelper';

export default function CookieBannerProvider() {
	const [cookieConsent, setCookieConsent] = useState<boolean>(false);

	useEffect(() => {
		const storedCookieConsent = getLocalStorage('cookie_consent', null);

		setCookieConsent(storedCookieConsent);
	}, [setCookieConsent]);

	useEffect(() => {
		const newValue = cookieConsent ? 'granted' : 'denied';

		window.gtag('consent', 'update', {
			analytics_storage: newValue,
		});

		setLocalStorage('cookie_consent', cookieConsent);

		//For Testing
		console.log('Cookie Consent: ', cookieConsent);
	}, [cookieConsent]);

	return (
		<div className={`
                my-10 mx-auto max-w-max md:max-w-fit fixed bottom-0 left-0 right-0 z-[6] 
                ${cookieConsent ? 'hidden': 'flex'} px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4 bg-main text-white rounded-lg shadow-lg
        `}>
			<div className='text-center'>
				<Link href='#'>
					<p className='text-sm'>
						We use <span className='font-'>cookies</span> on our
						site.
					</p>
				</Link>
			</div>

			<div className='flex gap-2'>
				<button
					onClick={() => setCookieConsent(false)}
					className='bg-white px-5 py-2 text-black rounded-md border-gray-900'
				>
					Decline
				</button>
				<button
					onClick={() => setCookieConsent(true)}
					className='bg-yellow-500 px-5 py-2 text-white rounded-lg'
				>
					Allow
				</button>
			</div>
		</div>
	);
}
