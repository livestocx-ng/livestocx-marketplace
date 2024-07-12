'use client';
import {
	TwitterIcon,
	WhatsappIcon,
	FacebookIcon,
	TwitterShareButton,
	FacebookShareButton,
	WhatsappShareButton,
} from 'react-share';
import {useEffect} from 'react';
import {
	useGlobalStore,
	useShareSellerStoreModalStore,
} from '@/hooks/use-global-store';
import {Copy, X} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {Button} from '@/components/ui/button';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';

const ShareSellerStoreModal = () => {
	const {vendorProfile} = useGlobalStore();

	const {onClose} = useShareSellerStoreModalStore();

	const handleFetchStoreUrl = async () => {
		await axios.get(`https://livestocx.com/store/${vendorProfile?.slug}`);
	};

	useEffect(() => {
		if (vendorProfile !== null) {
			handleFetchStoreUrl();
		}
	}, [vendorProfile]);

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-10'>
			<div className='flex flex-col w-[90%] md:w-[30%] bg-white py-2 px-4  overflow-y-auto scrollbar__1'>
				<div className='flex items-center justify-between px4'>
					<h1 className='text- font-medium'>Share Store</h1>

					<Button
						type='button'
						onClick={() => onClose()}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				<div className='flex flex-col items-center w-full py-8 space-y-4'>
					<div className='flex items-center'>
						<div className='flex space-x-5'>
							<WhatsappShareButton
								title={`Check out my mini-website/online store ${vendorProfile?.name} on Livestocx: `}
								url={`https://livestocx.com/store/${vendorProfile?.slug}`}
							>
								<WhatsappIcon size={30} round />
							</WhatsappShareButton>
							<FacebookShareButton
								title={`Check out my mini-website/online store ${vendorProfile?.name} on Livestocx: `}
								url={`https://livestocx.com/store/${vendorProfile?.slug}`}
							>
								<FacebookIcon size={30} round />
							</FacebookShareButton>
							<TwitterShareButton
								title={`Check out my mini-website/online store ${vendorProfile?.name} on Livestocx: `}
								url={`https://livestocx.com/store/${vendorProfile?.slug}`}
							>
								<TwitterIcon size={30} round />
							</TwitterShareButton>

							<CopyToClipboard
								text={`https://livestocx.com/store/${vendorProfile?.slug}`}
								onCopy={(text: string, result: boolean) => {
									toast.success('Copied to clipboard');
								}}
							>
								<div className='rounded-full border border-slate-400 h-8 w-8 flex items-center justify-center cursor-pointer'>
									<Copy className='h-4 w-4' />
								</div>
							</CopyToClipboard>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShareSellerStoreModal;
