import {useGlobalStore} from '@/hooks/use-global-store';
import {getLocalStorage} from '@/lib/localstorageHelper';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';

const ContactUsBanner = () => {
	const {currentAccountTab, cookieConsentStatus, showChatConversation} = useGlobalStore();
	const [lsCookieConsentStatus, setLsCookieConsentStatus] = useState<boolean | null>(false);

	const initializeState = () => {
		const storedCookieConsent = getLocalStorage('livestocx_cookie_consent');

		console.log('[STORED COOKIE] :: ', storedCookieConsent);
		setLsCookieConsentStatus(storedCookieConsent);
	};

	useEffect(() => {
		initializeState();
	}, []);

	useEffect(() => {
		if(cookieConsentStatus){
			setLsCookieConsentStatus(true);
		}
	}, [cookieConsentStatus]);

	return (
		<>
			{(lsCookieConsentStatus !== null && lsCookieConsentStatus !== false) && !showChatConversation && (
				<div
					className='
						flex space-x-2 md:space-x-5 items-center
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
					bg-main h-10 w-10 md:h-12 md:w-12 rounded-full 
					flex flex-col items-center justify-center shadow-[#ffffff80] shadow-lg 
					cursor-pointer hover:-translate-y-1 transition-all ease-in-out duration-700
				'
					>
						<Image
							width={10}
							height={10}
							unoptimized={true}
							className='w-8 h-8'
							alt='Livestocx-contact-us'
							src='/icon__whatsapp.svg'
						/>
					</div>

					<div className='p-2 border border-slate-400 text-[10px] md:text-sm text-black w-[200px] rounded-md bg-white shadow-[#ffffff80] shadow-lg'>
						Give us your special request lets get you the product
						seller within an hour🕰️.
					</div>
				</div>
			)}
		</>
	);
};

export default ContactUsBanner;
