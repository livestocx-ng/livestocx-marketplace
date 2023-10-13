'use client';
import Link from 'next/link';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {Menu, ShoppingCartIcon, User2} from 'lucide-react';

import {NavLinks} from '@/data';
import {Button} from '../ui/button';

const MainNavbar = () => {
	const [scrolling, setScrolling] = useState<boolean>(false);
	const [showMenu, setSetshowMenu] = useState<boolean>(false);

	const toggleMenu = () => {
		setSetshowMenu(!showMenu);
	};

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
		<div className='relative'>
			<nav
				className={`w-full py-2 px-8 hidden fixed z-10 sm:flex items-center justify-between ${
					scrolling && 'bg-main backdrop-blur-sm'
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
						href={'/account'}
						// href={'/signin'}
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
			</nav>

			<div
				className={`w-full py-4 px-4 pl-1 sm:pl-8 sm:px-8 sm:hidden fixed z-10 flex items-center justify-between ${
					scrolling && 'bg-main backdrop-blur-sm'
				}`}
			>
				<Button
					type='button'
					variant={'default'}
					className={`font-bold bg-[#0000000] hover:bg-[#0000000]`}
					onClick={toggleMenu}
				>
					<Image
						alt='menu_icon'
						width={30}
						height={30}
						src={`${
							!scrolling
								? '/icon_menu.svg'
								: '/icon_menu_white.svg'
						}`}
					/>
				</Button>

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
						href={'/signin'}
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

			<nav
				style={{
					boxShadow: 'rgba(100, 100, 111, 0.8) 0px 7px 29px 0px;',
				}}
				className={` ${
					showMenu ? 'flex' : 'hidden'
				} py-2 px-8 absolute top-0 left-0 h-screen w-[400px] z-10 sm:hidden flex-col items-start gap-y-10 bg-white backdrop-blur-sm`}
			>
				<div className={`flex items-center justify-between w-full`}>
					<Link href={'/'} onClick={toggleMenu}>
						<Image
							alt='logo'
							width={50}
							height={50}
							className=''
							src={'/logo.svg'}
						/>
					</Link>
					<Button
						type='button'
						variant={'outline'}
						onClick={toggleMenu}
						className='border-0 font-bold'
					>
						x
					</Button>
				</div>

				<div className='flex flex-col items-start gap-y-12'>
					{NavLinks.map((link) => (
						<Link
							href={link.url}
							key={link.title}
							onClick={toggleMenu}
							className={`text-sm `}
						>
							{link.title}
						</Link>
					))}
				</div>
			</nav>
		</div>
	);
};

export default MainNavbar;
