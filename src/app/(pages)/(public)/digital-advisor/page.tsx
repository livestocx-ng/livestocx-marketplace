'use client';
import Image from 'next/image';
import React, {Fragment, useState} from 'react';
import Footer from '@/components/navigation/footer';
import MainNavbar from '@/components/navigation/main-nav-bar';
import Link from 'next/link';
import StoreLinksToggle from '@/components/storeLinkToggle/storeLinksToggle';

const DigitalAdvisorPage = () => {
	const [showStores, setShowStores] = useState(false);
	return (
		<Fragment>
			<MainNavbar />
			<main>
				<section className='h-[30vh] md:h-[40vh] w-full bg-home flex flex-col items-center justify-center pt- md:pt-0'>
					<h1 className='text-xl md:text-3xl font-medium text-white px-4 md:px-0'>
						Digital Advisory for Animal Health and Nutrition
					</h1>
				</section>

				<div className='w-full py-10 px-4 md:px-8 flex flex-col space-y-5'>
					<div>
						<p className='text-sm leading-7'>
							Livestock health is not just a biological concern it
							is the lifeblood of rural economies and food
							systems. In Africa, smallholder farmers often lack
							consistent access to veterinary services and
							scientific guidance, which makes them vulnerable to
							animal health issues that could otherwise be
							preventable or manageable. Recognizing this,
							Livestocx has built a comprehensive Digital Advisory
							Platform that provides localized and timely guidance
							on livestock management. This platform combines
							veterinary knowledge, climate insights, nutritional
							advice, and market access strategies into a single,
							user friendly interface. Farmers receive
							personalized tips based on their location, species
							of livestock, age and health history of animals, and
							even the season of the year. Whether a herder in the
							Sahel managing cattle or a poultry farmer in Eastern
							Nigeria, the platform adapts its recommendations
							accordingly. One of its core strengths lies in
							localization not just in language, but in cultural
							relevance and on the ground practicality. Advice is
							simplified into easy to understand messages
							delivered via app, USSD, or SMS, ensuring inclusion
							regardless of literacy level or smartphone
							ownership. This service helps eliminate trial and
							error in livestock care and replaces it with
							informed, expert backed decision making at every
							stage of the farming process.
						</p>

						<div className='mx-auto flex justify-center items-center mt-5'>
							<Image
								width={500}
								height={200}
								src={'/climate/livestock-health.jpg'}
								className='object-cover rounded-md'
								alt={`Livestocx - Digital Advisor`}
							/>
						</div>
					</div>
					<div>
						<p className='text-sm leading-7'>
							A common challenge in livestock management is the
							delayed identification and treatment of diseases.
							Many farmers may not recognize early warning signs
							of illness until the situation becomes severe or
							contagious. With the Livestocx advisory platform,
							farmers no longer have to rely solely on their
							intuition or sporadic visits from veterinarians.
							Through the system, they can describe symptoms like
							fever, diarrhea, coughing, lethargy, or loss of
							appetite and instantly receive possible diagnoses,
							recommended first actions, and indicators for when
							to seek veterinary intervention. The platform uses
							AI powered logic trees to suggest the most likely
							causes based on symptoms and historical trends. It
							also allows farmers to send images or voice
							recordings if needed, which are then reviewed by
							trained veterinary consultants. To enhance
							prevention, the system also sends proactive health
							alerts and reminders, such as upcoming vaccination
							dates, deworming schedules, and breeding cycles
							based on each animal’s profile. These features are
							especially valuable for pastoralists managing large
							herds without individual medical records. By
							ensuring regular check ups and timely treatments,
							Livestocx is helping farmers reduce animal mortality
							and improve productivity without relying entirely on
							physical veterinary infrastructure. It is a leap
							forward in bringing preventive veterinary care to
							the last mile.
						</p>
					</div>
					<div>
						<p className='text-sm leading-7'>
							Feed management is another area where the Livestocx
							digital platform is making a measurable difference.
							Livestock nutrition directly affects growth rates,
							milk yield, reproductive health, and immune strength
							but many smallholder farmers lack access to proper
							feed advisory services. Most rely on traditional
							knowledge, which, while valuable, may not always
							meet modern dietary needs or reflect current feed
							availability and costs. Livestocx changes that by
							analyzing local data to recommend optimized feeding
							strategies. The platform factors in the regional
							climate conditions, forage types available, market
							prices for supplements, and seasonal trends to help
							farmers decide what to feed and when. For example,
							during the dry season, the system might suggest
							affordable, protein-rich feed alternatives or guide
							farmers to silage providers in their area. It can
							also detect if an animal's weight gain or milk
							production is below normal and offer feeding
							corrections. This advice is especially helpful
							during droughts or floods when forage becomes
							scarce, and strategic feeding is essential. Over
							time, consistent nutritional guidance results in
							healthier animals, better reproductive cycles, and
							higher profits. It also promotes sustainable
							resource usage by discouraging overgrazing and
							recommending feed combinations that maximize
							nutrient efficiency per cost spent.
						</p>
					</div>
					<div>
						<p className='text-sm leading-7'>
							Beyond health and nutrition, Livestocx's advisory
							services support livestock owners in understanding
							and navigating the market. Accessing fair and
							profitable markets remains a persistent challenge
							for many rural producers, who often have limited
							bargaining power and market information. Through the
							platform, farmers receive regular updates on
							livestock prices in nearby markets, seasonal demand
							trends, and upcoming auctions or bulk buyer
							opportunities. This transparency allows them to make
							smarter decisions about when to sell, what to sell,
							and at what price. It also provides them with
							insights on transport logistics, regulatory
							requirements for cross-regional sales, and basic
							financial literacy such as calculating profit
							margins. Furthermore, the platform features a
							built-in digital marketplace where verified sellers
							can connect directly with trusted buyers, reducing
							dependency on exploitative middlemen. Over time,
							this improves income security and encourages farmers
							to invest further in livestock health and
							productivity. By bringing together health,
							nutrition, and market knowledge in a single digital
							ecosystem, Livestocx is not just solving isolated
							problems it is building a holistic support system
							for smallholder livestock farmers. This integrated
							approach is what sets the platform apart and ensures
							long-term impact on the agricultural economy.
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

export default DigitalAdvisorPage;
