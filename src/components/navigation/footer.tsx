import Link from 'next/link';
import Image from 'next/image';

import {NavLinks} from '@/data';
import {Facebook, Instagram, Linkedin} from 'lucide-react';

interface IconLinkProps {
	href: string;
	icon: string;
	width: number;
	height: number;
}

const IconLink = ({href, icon, width, height}: IconLinkProps) => {
	return (
		<Link href={href} className=''>
			<Image
				alt={href}
				src={icon}
				width={width}
				height={height}
				className='object-cover'
			/>
		</Link>
	);
};

const Footer = () => {
	return (
		<div className='sm:h-[250px] py-10 sm:py-0 w-full bg-main flex flex-col sm:flex-row items-center justify-between px-10'>
			<div className='mb-5 sm:mb-0'>
				<Image
					alt='logo'
					width={40}
					height={40}
					className=''
					src={'/logo.svg'}
				/>
			</div>

			<div className='flex flex-col items-center space-y-5 text-center'>
				<div className='flex flex-col sm:flex-row items-center text-center sm:space-x-10 space-y-5 sm:space-y-0'>
					{NavLinks.filter(
						(link) => link.title !== 'Marketplace'
					).map((link) => (
						<Link
							href={link.url}
							key={link.title}
							className={`text-white hover:text-orange-500 hover:font-medium text-sm`}
						>
							{link.title}
						</Link>
					))}
				</div>

				<div className='flex items-center text-center space-x-3'>
					<Link
						href={'#'}
						className={`text-white hover:text-orange-500 hover:font-medium text-sm`}
					>
						Privacy Policy
					</Link>
					<Link
						href={'#'}
						className={`text-white hover:text-orange-500 hover:font-medium text-sm`}
					>
						Terms of Service
					</Link>
				</div>

				<p className='text-xs text-white'>Copyright &copy;2023 Livestocx</p>
			</div>

			<div className='flex flex-col items-center justify-center space-y-5 mt-20 sm:mt-0'>
				<div className='flex items-center space-x-10 sm:space-x-3'>
					<Link href={'#'} className=''>
						<Image
							alt={''}
							width={30}
							height={30}
							className='object-cover'
							src={'/icon__facebook.svg'}
						/>
					</Link>
					<Link href={'#'} className=''>
						<Image
							alt={''}
							width={30}
							height={30}
							className='object-cover'
							src={'/icon__linkedin.svg'}
						/>
					</Link>
					<Link href={'#'} className=''>
						<Image
							alt={''}
							width={30}
							height={30}
							className='object-cover'
							src={'/icon__instagram.svg'}
						/>
					</Link>
				</div>
				<div className='flex items-center space-x-3'>
					<Link href={'#'} className=''>
						<Image
							alt={''}
							width={100}
							height={50}
							className='object-cover'
							src={'/icon__appstore.svg'}
						/>
					</Link>
					<Link href={'#'} className=''>
						<Image
							alt={''}
							width={100}
							height={50}
							className='object-cover'
							src={'/icon__playstore.svg'}
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Footer;
