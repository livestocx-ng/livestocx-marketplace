'use client';
import Image from 'next/image';
import React, {Fragment} from 'react';
import Footer from '@/components/navigation/footer';
import MainNavbar from '@/components/navigation/main-nav-bar';
import StoreLinksToggle from '@/components/storeLinkToggle/storeLinksToggle';

const MobileClimatePage = () => {
	return (
		<Fragment>
			<MainNavbar />
			<main>
				<section className='h-[30vh] md:h-[40vh] w-full bg-home flex flex-col items-center justify-center pt- md:pt-0'>
					<h1 className='text-xl md:text-3xl font-medium text-white px-4 md:px-0'>
						Mobile Climate Information Services
					</h1>
				</section>

				<div className='w-full py-10 px-4 md:px-8 flex flex-col space-y-5'>
					<div>
						<p className='text-sm leading-7'>
							Livestock production across Africa is highly
							dependent on seasonal climatic conditions, making
							timely and localized weather information not just
							beneficial, but essential for farmers and herders.
							In many pastoral and agro-pastoral communities,
							decisions about when and where to move livestock
							directly impact animal health, productivity, and
							household income. Livestocx is addressing this need
							by deploying innovative mobile based climate
							information services. These services are designed to
							work even in remote areas with minimal internet
							access, ensuring farmers can receive hyper localized
							weather forecasts directly on their mobile phones.
							The forecasts go beyond general temperature or
							rainfall predictions,they include specific alerts
							about wind speeds, humidity levels, and heat stress
							indices, all tailored to livestock needs. The power
							of this system lies in transforming raw climate data
							into actionable intelligence. For example, if a
							region is expected to experience unseasonably high
							temperatures or delayed rains, the platform doesn’t
							just report it, it recommends the best course of
							action such as moving herds earlier than planned,
							stocking supplementary feed, or preparing water
							reserves. This functionality significantly reduces
							losses due to heatstroke, dehydration, and forage
							depletion, which are increasingly common with
							climate variability. By translating scientific data
							into practical, local actions, Livestocx equips
							farmers with tools to protect their herds and
							optimize grazing decisions. These mobile platforms
							represent a step change in the accessibility of
							climate smart agriculture.
						</p>

						<div className='mx-auto flex justify-center items-center'>
							<Image
								width={300}
								height={200}
								src={'/climate/mobile-climate.png'}
								className='object-cover rounded-md'
								alt={`Livestocx - Mobile Climate`}
							/>
						</div>
					</div>
					<div>
						<p className='text-sm leading-7'>
							In addition to regular forecasts, Livestocx delivers
							real time early warning alerts for climate related
							hazards such as droughts, floods, and extreme
							heatwaves. These warnings aren’t just notifications,
							they’re paired with step by step guidance tailored
							to the user’s region and herd type. For example, if
							a drought warning is issued for a particular region,
							the platform might recommend early offloading of
							some animals, relocation to better-grazed zones, or
							specific water conservation techniques. The system
							pulls data from multiple sources including satellite
							feeds, meteorological agencies, and local weather
							stations. However, what sets it apart is its
							integration of indigenous climate knowledge. Many
							pastoral communities already have early indicators
							for climate changes, and Livestocx collaborates with
							these communities to embed such insights into its
							predictive models. The system uses AI-based climate
							modeling to analyze patterns and trends, improving
							the accuracy and relevance of forecasts. This
							integration of technology with traditional knowledge
							ensures that the information is not only precise but
							also culturally trusted and contextually actionable.
							The platform supports both SMS based and app based
							delivery, enabling access for both smartphone users
							and those with basic feature phones. By reducing
							uncertainty in livestock management, these early
							warnings help communities avoid crisis mode
							decisions, maintaining herd health and sustaining
							income levels even under climatic stress.
						</p>
					</div>
					<div>
						<p className='text-sm leading-7'>
							Among the platform’s standout innovations is the
							livestock movement planning tool. In countries where
							transhumance is common, managing livestock mobility
							efficiently is vital to reducing conflicts,
							maximizing pasture use, and safeguarding animal
							health. The movement planning tool utilizes
							geospatial data and satellite mapping to advise
							herders on optimal grazing paths. It considers
							real-time forage availability, water sources,
							disease risk zones, and regional security updates.
							For example, if a grazing route shows signs of
							pasture depletion or is nearing an outbreak zone,
							the system will alert the user and suggest safer
							alternatives. It also includes collaborative
							planning features, allowing multiple herders in the
							same region to coordinate movement patterns and
							avoid overcrowding on the same grazing fields. This
							feature reduces pressure on fragile ecosystems and
							encourages rotational grazing practices that are
							more sustainable over time. Furthermore, it helps
							prevent conflicts that can arise from competition
							over grazing territory, especially in cross-border
							regions or during drought periods when resources are
							scarce. By digitizing movement planning and
							integrating climate variables, Livestocx helps
							pastoralists respond proactively to environmental
							changes, making migration more predictable, less
							risky, and ecologically responsible. This level of
							planning supported by real time data was previously
							inaccessible to most rural farmers, yet it is now
							available in the palm of their hands, setting a new
							standard for climate informed livestock management.
						</p>
					</div>
					<div>
						<p className='text-sm leading-7'>
							The impact of these services extends far beyond
							productivity it touches on resilience, economic
							stability, and long-term adaptation. By
							democratizing access to consistent, reliable, and
							relevant climate data, Livestocx is enabling rural
							communities to shift from reactive to proactive
							livestock management. The mobile climate information
							service reduces guesswork, enhances preparedness,
							and helps users mitigate the worst effects of
							climate volatility. In the long run, this improves
							herd health, reduces financial losses, and supports
							food security in vulnerable regions. What makes
							Livestocx’s solution transformative is its
							commitment to making advanced data tools accessible
							to smallholder farmers not just in interface design,
							but in linguistic support, offline functionality,
							and cost effectiveness. The platform doesn’t require
							users to have a deep understanding of meteorology,
							it simply guides them through every step of decision
							making with timely, easy to understand prompts. This
							creates a bridge between the world of climate
							science and traditional farming knowledge. As
							climate change continues to intensify, these kinds
							of digital services will become not just helpful,
							but essential to sustainable livestock production.
							Livestocx is proud to lead this change, using
							technology to empower farmers and herders to protect
							their animals, their income, and their future.
						</p>
					</div>
					<div>
						<StoreLinksToggle />
					</div>
				</div>
			</main>
			<Footer />
		</Fragment>
	);
};

export default MobileClimatePage;
