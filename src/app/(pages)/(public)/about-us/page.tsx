import TestimonialScetion from '@/components/common/testimonials';
import {TeamMembers} from '@/data';
import Image from 'next/image';
import Link from 'next/link';

const AboutUsPage = () => {
	return (
		<main>
			<section className='h-[50vh] md:h-[50vh] w-full bg-home flex flex-col items-center justify-center pt-28 md:pt-0'>
				<h1 className='text-xl md:text-5xl font-medium text-white'>
					About Us
				</h1>
			</section>

			<div className='w-full bg-slate-200 py-5 text-center'>
				<h1 className='text-2xl font-semibold text-main'>Team</h1>
			</div>

			<div className='space-y-20 px-8 py-10 pb-20 w-full'>
				{TeamMembers.map((member) => (
					<div
						key={member.id}
						className='flex flex-col md:flex-row sm:space-x-5 items-start w-full'
					>
						<div className='w-full sm:w-[20%] h-[250px] relative'>
							<Image
								fill
								alt={member.name}
								src={member.image}
								className='object-cover h-full w-full rounded-[50px]'
							/>
						</div>

						<div className='space-y-5 w-full sm:w-[70%] mt-10 sm:mt-0'>
							<h1 className='text-main font-bold text-xl'>
								{member.name}
							</h1>
							<p className='leading-[30px] text-lg'>
								{member.intro}
							</p>

							<div className='flex items-center space-x-5'>
								<Link target='_blank' href={member.facebook}>
									<Image
										width={20}
										height={20}
										alt={member.facebook}
										src={'/icon__facebook.svg'}
									/>
								</Link>
								<Link target='_blank' href={member.linkedin}>
									<Image
										width={20}
										height={20}
										alt={member.linkedin}
										src={'/icon__linkedin.svg'}
									/>
								</Link>
								<Link target='_blank' href={member.instagram}>
									<Image
										width={20}
										height={20}
										alt={member.instagram}
										src={'/icon__instagram.svg'}
									/>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>

			<TestimonialScetion />
		</main>
	);
};

export default AboutUsPage;
