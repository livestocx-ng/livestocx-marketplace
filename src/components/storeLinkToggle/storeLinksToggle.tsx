'use client';
import React, {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';

const StoreLinksToggle = () => {
	const [showStores, setShowStores] = useState(false);

	return (
		<>
			<div className='flex justify-center'>
				<button
					onClick={() => setShowStores(!showStores)}
					className='px-6 py-2 rounded bg-main text-white text-sm font- hover:bg-main transition'
				>
					{showStores ? 'Hide App Links' : 'Learn More'}
				</button>
			</div>

			{showStores && (
				<div className='flex items-center space-x-3 justify-center mt-4'>
					<Link
						href='https://apps.apple.com/ng/app/livestocx/id6738842775'
						className=''
					>
						<Image
							alt='Download on App Store'
							width={120}
							height={60}
							unoptimized={true}
							className='object-cover'
							src='/icon__appstore__2.svg'
						/>
					</Link>
					<Link
						className=''
						target='_blank'
						href='https://play.google.com/store/apps/details?id=com.livestocx.livestocx_mobile'
					>
						<Image
							alt='Download on Play Store'
							width={120}
							height={60}
							unoptimized={true}
							className='object-cover'
							src='/icon__playstore__2.svg'
						/>
					</Link>
				</div>
			)}
		</>
	);
};

export default StoreLinksToggle;
