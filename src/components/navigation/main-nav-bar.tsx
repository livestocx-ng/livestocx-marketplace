import {ShoppingCartIcon, User2} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const NavLinks = [
	{
		title: 'Home',
		url: '/',
	},
	{
		title: 'Marketplace',
		url: '#/marketplace',
	},
	{
		title: 'About',
		url: '#/about',
	},
	{
		title: 'Contact',
		url: '#/contact',
	},
	{
		title: 'Sellers',
		url: '#/sellers',
	},
];

const MainNavbar = () => {
	return (
		<div className='w-full py-2 px-8 fixed z-10 flex items-center justify-between'>
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
					<Link href={link.url} key={link.title} className='text-sm text-white'>
						{link.title}
					</Link>
				))}
			L</div>

			<div className='flex items-center space-x-5'>
				<Link href={'#'} className='h-10 w-10 bg-main rounded-full flex flex-col items-center justify-center'>
					<ShoppingCartIcon className='h-5 w-5 text-white'/>
				</Link>
				<Link href={'#'} className='h-10 w-10 bg-main rounded-full flex flex-col items-center justify-center'>
					<User2 className='h-5 w-5 text-white'/>
				</Link>

			</div>
		</div>
	);
};

export default MainNavbar;
