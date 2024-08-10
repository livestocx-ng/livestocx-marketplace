'use client';
import {
	TwitterIcon,
	WhatsappIcon,
	FacebookIcon,
	TwitterShareButton,
	FacebookShareButton,
	WhatsappShareButton,
} from 'react-share';
import {Copy, Users, X} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import CopyToClipboard from 'react-copy-to-clipboard';
import {useReferralModalStore, useGlobalStore} from '@/hooks/use-global-store';

const UserReferralModal = () => {
	const {user} = useGlobalStore();
	const {onClose} = useReferralModalStore();

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-20'>
			<div className='bg-white py-6 px-5 w-[90%] md:w-[40%] transition-all duration-700 ease-in-out md:translate-x-3'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center space-x-2'>
						<h1 className='text-sm font-bold'>Referrals </h1>
						<Users size={14} />
					</div>

					<Button
						type='button'
						onClick={() => {
							onClose();
						}}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				<div className='space-y-3 my-5'>
					<p className='text-sm leading-6'>
						Congratulations! You're now a part of our referral
						program! Share your unique referral code with friends
						and family, earn rewards and discounts for every
						successful referral! Plus, get a chance to win a{' '}
						<span className='font-medium'>
							Free product promotion every week🚀.
						</span>{' '}
						&nbsp; Refer now and start earning!
						<br />
					</p>

					<p className='text-center text-sm'>Share link via:</p>

					<div className='flex justify-center space-x-2'>
						<WhatsappShareButton
							title={`Join Livestocx with my referral code & get rewards! ${user?.referralCode}`}
							url={`https://livestocx.com/signup?referralCode=${user?.referralCode}`}
						>
							<WhatsappIcon size={30} round />
						</WhatsappShareButton>
						<FacebookShareButton
							title={`Join Livestocx with my referral code & get rewards! ${user?.referralCode}`}
							url={`https://livestocx.com/signup?referralCode=${user?.referralCode}`}
						>
							<FacebookIcon size={30} round />
						</FacebookShareButton>
						<TwitterShareButton
							title={`Join Livestocx with my referral code & get rewards! ${user?.referralCode}`}
							url={`https://livestocx.com/signup?referralCode=${user?.referralCode}`}
						>
							<TwitterIcon size={30} round />
						</TwitterShareButton>

						<CopyToClipboard
							text={`https://livestocx.com/signup?referralCode=${user?.referralCode}`}
							onCopy={(text: string, result: boolean) => {
								toast.success('Link copied to clipboard', {
									className: 'text-sm',
								});
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
	);
};

export default UserReferralModal;
