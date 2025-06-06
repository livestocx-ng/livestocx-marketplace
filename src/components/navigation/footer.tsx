'use client';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useGlobalStore} from '@/hooks/use-global-store';
import {AccountNavLinks, HelpNavLinks, OtherNavLinks, Sponsors} from '@/data';

const Footer = () => {
	const router = useRouter();

	const {updateCurrentAccountTab} = useGlobalStore();

	return (
		<div className='pt-5 md:pt-10 w-full bg-main flex flex-col px-5 sm:px-10'>
			<div className='flex flex-row flex-wrap items-start justify-between w-full'>
				<div className='flex flex-col justify-between w-full mb-5 md:mb-10'>
					<div className='flex justify-center items-center text-white'>
						Our Partners
					</div>
					<div className='flex flex-row flex-wrap items-center justify-center gap-4 w-full'>
						{Sponsors.map((sponsor) => (
							<Image
								width={80}
								height={80}
								src={sponsor.image}
								className='object-cover'
								alt={`Livestocx Sponsored by: ${sponsor.name}`}
							/>
						))}
					</div>
				</div>
				<div className='mb-10 sm:mb-0 flex flex-col space-y-5 w-full md:w-fit'>
					<Image
						alt='logo'
						width={30}
						height={30}
						className=''
						src={'/logo.svg'}
						unoptimized={true}
					/>

					<h1 className='text-white text-xs'>Livestocx</h1>

					<div className='flex flex-col items-start space-y-2'>
						<div className='space-y-1'>
							<p className='text-white text-xs'>
								1680 East Barstow Avenue, <br /> Fresno
								California, United States
							</p>
							<p className='text-white text-xs'>+1(559)6683783</p>
						</div>
						<div className='space-y-1'>
							<p className='text-white text-xs'>
								Shimex Estate Lugbe Federal Capital Territory,
								Nigeria.
							</p>
							<p className='text-white text-xs'>+2348132549273</p>
						</div>

						<p className='text-white text-xs'>
							support@livestocx.com
						</p>
					</div>
				</div>

				<div className='mb-5 md:mb-10 sm:mb-0 flex flex-col space-y-5'>
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

				<div className='mb-5 md:mb-10 sm:mb-0 flex flex-col space-y-5'>
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

				<div className='mb-5 md:mb-10 sm:mb-0 flex flex-col space-y-5'>
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

				<div className='flex flex-col justify-start md:items-center md:justify-center space-y-5 mt-5'>
					<div className='flex items-center space-x-10 sm:space-x-3'>
						<Link
							target='_blank'
							href={
								'https://www.facebook.com/profile.php?id=61550763699954'
							}
						>
							<Image
								alt={''}
								width={30}
								height={30}
								className='object-cover'
								unoptimized={true}
								src={'/icon__facebook.svg'}
							/>
						</Link>
						<Link
							className=''
							target='_blank'
							href={
								'https://www.linkedin.com/company/livestocxltd/'
							}
						>
							<Image
								alt={''}
								width={30}
								height={30}
								unoptimized={true}
								className='object-cover'
								src={'/icon__linkedin.svg'}
							/>
						</Link>
						<Link
							target='_blank'
							href={
								'https://instagram.com/livestocx?igshid=MzNlNGNkZWQ4Mg=='
							}
						>
							<Image
								alt={''}
								width={30}
								height={30}
								unoptimized={true}
								className='object-cover'
								src={'/icon__instagram.svg'}
							/>
						</Link>
					</div>
					<div className='flex items-center space-x-3'>
						<Link href={'#'} className=''>
							<Image
								alt={''}
								width={120}
								height={60}
								unoptimized={true}
								className='object-cover'
								src={'/icon__appstore__2.svg'}
							/>
						</Link>
						<Link
							className=''
							target='_blank'
							// href={'#'}
							href={
								'https://play.google.com/store/apps/details?id=com.livestocx.livestocx_mobile&pcampaignid=web_share'
							}
						>
							<Image
								alt={''}
								width={120}
								height={60}
								unoptimized={true}
								className='object-cover'
								src={'/icon__playstore__2.svg'}
							/>
						</Link>
					</div>
				</div>
			</div>

			<div className='border-t border-t-[#ffffff80] w-full mt-5 md:mt-0 py-3 text-center text-[#ffffff80] text-xs'>
				Powered by Livestocx Inc &copy; {new Date().getFullYear()}. All
				Rights Reserved
			</div>
		</div>
	);
};

export default Footer;
