'use client';
import Link from 'next/link';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {ShoppingCartIcon, User2} from 'lucide-react';

import { NavLinks } from '@/data';

const MainNavbar = () => {
	const [scrolling, setScrolling] = useState<boolean>(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			const scrollPosition = window.scrollY;

			if (scrollPosition > 100) {
				setScrolling(true);
				// console.log('[SCROLLING]');
			} else {
				setScrolling(false);
				// console.log('[FALSE]');
			}
		});
	}, []);

	return (
		<div
			className={`w-full py-2 px-8 fixed z-10 flex items-center justify-between ${
				scrolling && 'bg-[#ffffff80 bg-main backdrop-blur-sm'
			}`}
		>
			<Link href={'/'}>
				<Image
					alt='logo'
					width={50}
					height={50}
					className=''
					src={'/logo.svg'}
				/>
			</Link>

			<div className='flex items-center gap-x-8'>
				{NavLinks.map((link) => (
					<Link
						href={link.url}
						key={link.title}
						className={`text-sm ${
							scrolling ? 'text-white' : 'text-white'
						}`}
					>
						{link.title}
					</Link>
				))}
			</div>

			<div className='flex items-center space-x-5'>
				<Link
					href={'#'}
					className={`h-10 w-10 ${
						scrolling ? 'bg-white' : 'bg-main'
					} rounded-full flex flex-col items-center justify-center`}
				>
					<ShoppingCartIcon
						className={`h-5 w-5 ${
							scrolling ? 'text-main' : 'text-white'
						}`}
					/>
				</Link>
				<Link
					href={'#'}
					className={`h-10 w-10 ${
						scrolling ? 'bg-white' : 'bg-main'
					} rounded-full flex flex-col items-center justify-center`}
				>
					<User2
						className={`h-5 w-5 ${
							scrolling ? 'text-main' : 'text-white'
						}`}
					/>
				</Link>
			</div>
		</div>
	);
};

export default MainNavbar;
