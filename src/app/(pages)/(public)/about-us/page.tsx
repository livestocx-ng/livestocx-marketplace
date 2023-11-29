import TestimonialScetion from '@/components/common/testimonials';
import {Features, TeamMembers} from '@/data';
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

			<div className='flex flex-wrap items-center justify-between w-full px-8 sm:py-10 mt-10 sm:mt-0'>
				<div className='w-full sm:w-[40%] text-base sm:text-xl'>
					Livestocx is an AI-powered livestock marketplace connecting
					small-holder livestock farmers directly to sellers, evading
					middlemen and managing all their logistics while reducing
					trade inefficiencies, low customer reach, unsustainable
					transport services, and hence losses
				</div>
				<div className='w-[300px] h-[200px] sm:w-[60%] sm:h-[400px] relative'>
					<Image
						alt=''
						fill
						src={'/about__art__1.svg'}
						className='object-fill h-full w-full absolute'
					/>
				</div>
			</div>

			<div className='mx-auto text-center text-base sm:text-xl sm:py-10 my-10 sm:my-20 w-full sm:w-[70%] px-5 sm:px-0'>
				Our platform provides a centralized, transparent, and efficient
				marketplace where local livestock farmers connect with buyers
				from anywhere around Nigeria, carry out transactions, and
				coordinate logistics.
			</div>

			<div className='bg-[#D1F8E6] w-full py-8 my-10 sm:my-20 flex flex-col sm:flex-row justify-center sm:space-x-20'>
				<div className='w-full sm:w-[28%] bg-white h-[300px] rounded-lg shadow-md flex flex-col justify-center space-y-5 px-10'>
					<Image
						alt=''
						width={40}
						height={40}
						src={'/icon__wallet__1.svg'}
					/>

					<h1 className='font-medium'>Earn Money in a few clicks!</h1>
					<p className='text-sm'>
						Our platform provides a centralized, transparent, and
						efficient marketplace where local livestock farmers
						connect with buyers from anywhere around Nigeria, carry
						out transactions, and coordinate logistics.
					</p>
				</div>
				<div className='w-full sm:w-[28%] h-[300px] relative'>
					<Image
						fill
						alt=''
						src={'/about__art__2.svg'}
						className='object-fill w-full h-full'
					/>
				</div>
			</div>

			<div className='my-10 sm:my-20 px-8'>
				<h1 className='text-center text-orange-400 font-semibold text-base sm:text-xl'>
					Key Features
				</h1>
				<p className='text-center text-base sm:text-xl'>
					We have the following key features to support local,
					small-holder livestock keepers
				</p>

				<div className='mx-auto mt-10 flex flex-wrap justify-center items-start gap-10'>
					{Features.map((feature) => (
						<div
							key={feature.icon}
							className='w-full sm:w-[35%] h-[400px] sm:h-[350px] rounded shadow flex flex-col justify-center space-y-5 px-5 sm:px-10 py-5 sm:py-10'
						>
							<div className='w-[40px] h-[40px]'>
								<Image
									alt=''
									width={40}
									height={40}
									src={feature.icon}
									className='object-fill w-full h-full'
								/>
							</div>

							<h1 className='font-semibold text-main'>
								{feature.title}
							</h1>
							<p className='text-sm'>{feature.description}</p>
						</div>
					))}
				</div>
			</div>

			<div className='bg-[#0EBE52] w-full py-8 my-10 sm:my-20 flex flex-col sm:flex-row justify-center items-center px-5 sm:px-0 sm:space-x-20'>
				<div className='w-full sm:w-[60%] text-white'>
					We simplify the entire livestock trading process, reducing
					costs, eliminating middlemen, losses, and unsustainable
					transport systems; improving market access, and increasing
					profits for local farmers.
				</div>
				<div className='w-full sm:w-[28%] h-[300px] relative'>
					<Image
						fill
						alt=''
						src={'/about__art__3.svg'}
						className='object-fill w-full h-full'
					/>
				</div>
			</div>

			<div className='bg-about bg-cover bg-center bg-no-repeat w-full py-8 my-10 sm:my-20 flex flex-col items-end pr-5 sm:pr-10 relative'>
				<div className='flex flex-col space-y-10 justify-end px-5 pr-0 sm:pr-10 w-full sm:w-[40%]'>
					<div className='border border-main p-3'>
						<h1 className='text-orange-500 text-base sm:text-xl font-semibold text-center'>
							Our Vision
						</h1>
						<p className='text-base text-white leading-8'>
							Our grand vision for Livestocx is to become the
							go-to livestock marketplace across Africa,
							transforming the livestock industry by connecting
							over 50 million small-holder farmers directly to
							sellers. In 5-10 years, we aim to have expanded our
							reach continent-wide, facilitating 10 million
							monthly sustainable and efficient livestock trade
							while significantly impacting the livelihoods of
							farmers.
						</p>
					</div>
					<div className='border border-main p-3'>
						<h1 className='text-orange-500 text-base sm:text-xl font-semibold text-center'>
							Our Mission
						</h1>
						<p className='text-base text-white leading-8'>
							We are on a mission to revolutionize the livestock
							industry across Africa. Our mission is to empower
							small-holder farmers by connecting them directly to
							sellers, eliminating inefficiencies and middlemen.
							We leverage AI and innovative technologies to
							provide a transparent and sustainable marketplace,
							fostering economic growth, environmental
							responsibility, and community development. Through
							our commitment to inclusivity and customer-centric
							practices, we aim to create a lasting positive
							impact and contribute to the establishment of a more
							resilient and prosperous agricultural ecosystem in
							Africa.
						</p>
					</div>
				</div>
			</div>

			<div className='w-full py-5 text-center'>
				<h1 className='text-2xl font-semibold text-mai'>
					MEET OUR FOUNDERS
				</h1>
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
								className='object-cover h-full w-full absolute z-[5]'
							/>
							<div className='absolute top-5 -left-3 sm:w-[100%] h-[240px] bg-green-600' />
						</div>

						<div className='space-y-5 w-full sm:w-[70%] mt-10 sm:mt-0'>
							<h1 className='text-main font-bold text-xl'>
								{member.name}
							</h1>
							<p className='leading-[30px] text-lg'>
								{member.intro}
							</p>

							<div className='flex items-center space-x-5'>
								<Link
									target='_blank'
									href={member.facebook}
									className='bg-main h-[30px] w-[30px] relative rounded p-3'
								>
									<Image
										// width={30}
										// height={30}
										fill
										className='object-fill'
										alt={member.facebook}
										src={'/icon__facebook__2.svg'}
									/>
								</Link>
								<Link
									target='_blank'
									href={member.linkedin}
									className='bg-main h-[30px] w-[30px] relative rounded p-3'
								>
									<Image
										// width={30}
										// height={30}
										fill
										className='object-fill'
										alt={member.linkedin}
										src={'/icon__linkedin__2.svg'}
									/>
								</Link>
								<Link
									target='_blank'
									href={member.twitter}
									className='bg-main h-[30px] w-[30px] relative rounded p-3'
								>
									<Image
										// width={30}
										// height={30}
										fill
										className='object-fill'
										alt={member.twitter}
										src={'/icon__twitter.svg'}
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
