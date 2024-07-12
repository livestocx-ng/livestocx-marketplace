import Image from 'next/image';
import {useGlobalStore} from '@/hooks/use-global-store';
import Link from 'next/link';

const SellerFooter = () => {
	const {vendorProfile} = useGlobalStore();

	return (
		<div className='pt-5 md:pt-10 w-full bg-main flex flex-col px-5 sm:px-10'>
			<div className='flex flex-row flex-wrap items-start justify-between w-full'>
				<div className='mb-10 sm:mb-0 flex flex-col space-y-2 w-full md:w-fit'>
					<Image
						alt='logo'
						width={30}
						height={30}
						unoptimized={true}
						className='rounded-md'
						src={vendorProfile?.avatar!}
					/>

					<h1 className='text-white text-xs'>
						{vendorProfile?.name}
					</h1>

					<div className='flex flex-col items-start space-y-2'>
						<p className='text-white text-xs'>
							{vendorProfile?.address} {vendorProfile?.city},{' '}
							{vendorProfile?.state}
						</p>
						<p className='text-white text-xs'>
							{vendorProfile?.phoneNumber}
						</p>

						<p className='text-white text-xs'>
							{vendorProfile?.email}
						</p>
					</div>
				</div>

				<div className='flex flex-col justify-start md:items-center md:justify-center space-y-5 mt-5'>
					<div className='flex items-center space-x-10 sm:space-x-3'>
						<Link href={'#'}>
							<Image
								alt={''}
								width={30}
								height={30}
								className='object-cover'
								unoptimized={true}
								src={'/icon__facebook.svg'}
							/>
						</Link>
						<Link href={'#'}>
							<Image
								alt={''}
								width={30}
								height={30}
								unoptimized={true}
								className='object-cover'
								src={'/icon__linkedin.svg'}
							/>
						</Link>
						<Link href={'#'}>
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
				</div>
			</div>

			<div className='border-t border-t-[#ffffff80] w-full mt-5 md:mt-5 py-3 text-center text-[#ffffff80] text-xs'>
				Powered by Livestocx Inc &copy; {new Date().getFullYear()}. All
				Rights Reserved
			</div>
		</div>
	);
};

export default SellerFooter;
