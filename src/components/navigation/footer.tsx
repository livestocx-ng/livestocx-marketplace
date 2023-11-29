import Link from 'next/link';
import Image from 'next/image';

import {AccountNavLinks, HelpNavLinks, NavLinks, OtherNavLinks} from '@/data';
import {Facebook, Instagram, Linkedin} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useGlobalStore} from '@/hooks/use-global-store';

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
	const router = useRouter();

	const {updateCurrentAccountTab} = useGlobalStore();

	return (
		<div className='pt-10 md:pt-20 w-full bg-main flex flex-col px-5 sm:px-10'>
			<div className='flex flex-row flex-wrap items-start justify-between w-full'>
				<div className='mb-10 sm:mb-0 flex flex-col space-y-5'>
					<Image
						alt='logo'
						width={60}
						height={60}
						className=''
						src={'/logo.svg'}
					/>

					<h1 className='text-white text-xs'>Livestocx Limited</h1>

					<div className='flex flex-wrap items-center'>
						<p className='bg-black text-white text-xs'>
							+234 (0) 813 254 9273
						</p>
						&nbsp;
						<p className='bg-black text-white text-xs'>
							livestocxltd@gmail.com
						</p>
					</div>
				</div>

				<div className='mb-10 sm:mb-0 flex flex-col space-y-5'>
					<h1 className='text-white text-sm'>My Account</h1>

					{AccountNavLinks.map((link) => (
						<p
							key={link.title}
							onClick={() => {
								router.push(link.url);

								if (link.currentTab) {
									updateCurrentAccountTab(link?.currentTab);
								}
							}}
							className='text-white text-xs cursor-pointer'
						>
							{link.title}
						</p>
					))}
				</div>

				<div className='mb-10 sm:mb-0 flex flex-col space-y-5'>
					<h1 className='text-white text-sm'>Helps</h1>

					{HelpNavLinks.map((link) => (
						<Link
							key={link.title}
							href={link.url}
							className='text-white text-xs'
						>
							{link.title}
						</Link>
					))}
				</div>

				<div className='mb-10 sm:mb-0 flex flex-col space-y-5'>
					<h1 className='text-white text-sm'>Other</h1>

					{OtherNavLinks.map((link) => (
						<Link
							key={link.title}
							href={link.url}
							className='text-white text-xs'
						>
							{link.title}
						</Link>
					))}
				</div>

				<div className='flex flex-col items-center justify-center space-y-5 mt-10'>
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

			<div className='border-t border-t-[#ffffff80] w-full mt-20 py-3 text-center text-[#ffffff80] text-xs'>
				Livestocx &copy; {new Date().getFullYear()}. All Rights Reserved
			</div>
		</div>
	);
};

export default Footer;
