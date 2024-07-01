import {
	NavLink,
	TeamMember,
	FilterOption,
	FooterNavLink,
	Feature,
	FaqOption,
} from '@/types/index.types';
import {EnterprisePlanComparison, Testimonial} from '@/types/types';

export const NavLinks: NavLink[] = [
	{
		title: 'Home',
		url: '/',
	},
	{
		title: 'Enterprise',
		url: '/enterprise',
	},
	// {
	// 	title: 'Sellers',
	// 	url: '/sellers',
	// },
	{
		title: 'About Us',
		url: '/about-us',
	},
	{
		title: 'Contact Us',
		url: '/contact-us',
	},
];

export const AccountNavLinks: FooterNavLink[] = [
	{
		title: 'Manage Account',
		url: '/account',
		currentTab: 'Account',
	},
	{
		title: 'Products',
		url: '/account',
		currentTab: 'Products',
	},
	{
		title: 'Desired Items',
		url: '/account',
		currentTab: 'Desired Items',
	},
	{
		title: 'Sellers',
		url: '/sellers',
	},
];

export const HelpNavLinks: NavLink[] = [
	{
		title: 'Contact Us',
		url: '/contact-us',
	},
	{
		title: 'FAQs',
		url: '/contact-us',
	},
	{
		title: 'Terms of Service',
		url: '/terms-of-service',
	},
	{
		title: 'Privacy Policy',
		url: '/privacy-policy',
	},
];

export const OtherNavLinks: NavLink[] = [
	{
		title: 'About',
		url: '/about-us',
	},
	{
		title: 'Sitemap',
		url: '#',
	},
	{
		title: 'Login',
		url: '/signin',
	},
	{
		title: 'Register',
		url: '/signup',
	},
];

export const Testimonials: Testimonial[] = [
	{
		id: 1,
		author: 'Blessing Ugo',
		avatar: '/testimonial_avatar_1.svg',
		description:
			'Livestock has been the perfect marketplace for me. I had been searching for a platform to present my goat business, and this one has shown the most potential.',
	},
	{
		id: 2,
		author: 'Samuel Oguaju',
		avatar: '/testimonial_avatar_2.svg',
		description:
			'Due to the very fragmented dog market with a lot of middle men, Livestock has helped me find more customers directly. And it is free. Amazing.',
	},
	{
		id: 3,
		author: 'Michael Jigga',
		avatar: '/testimonial_avatar_3.svg',
		description:
			'I must say that their services have left a lasting impression on me, and I am eagerly looking forward to future interactions.',
	},
];

export const TeamMembers: TeamMember[] = [
	{
		id: 1,
		image: '/team/about__1.png',
		name: 'Oghenekevwe Emadago',
		intro: 'Co-founder/CEO: Oghenekevwe has over 7 years experience in sales across agricultural and hygiene sectors and has raised over $230,000 in combined funding. As the visionary leader of Livestocx, he sets the strategic direction and long-term vision for the company with his background in livestock management and deep understanding of the agricultural landscape. He also leads our customer interactions and onboarding and is in charge of fundraising/investor relations.',
		facebook:
			'https://www.facebook.com/oghenekevwe.emadago?mibextid=kFxxJD',
		linkedin:
			'https://www.linkedin.com/in/oghenekevwe-emadago?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAC6nN7sB_tHEBBPhKw7AlemgLv4gM8PXzao&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BNaz%2FvpQPTWu7rMCohxRbTQ%3D%3D',
		twitter: 'https://twitter.com/emadagokevwe',
	},
	{
		id: 2,
		image: '/team/about__2.png',
		name: 'Idokoh Divine',
		intro: "COO, Agriculturist and Graphic designer: As, Livestocx's COO, Divine brings a diverse skill set to the team. With a background in Agriculture, graphics and UI/UX design, Divine ensures operational excellence. She leads on-the-ground engagements, enhancing market understanding and driving platform growth.",
		facebook: 'https://www.facebook.com/chide2001?mibextid=ZbWKwL',
		linkedin: 'https://www.linkedin.com/in/divine-idokoh',
		twitter: 'https://x.com/ojo__chide?s=09',
	},
	{
		id: 3,
		image: '/team/about__3.jpg',
		name: 'Yada Martins',
		intro: 'Co-founder/CTO: Martins is a full stack developer with 6 years+ experience with JavaScript and Python. Most experienced in  NestJS, NextJS, and Flutter. He is the technical backbone of Livestocx, leading the development and implementation of our technology stack with his expertise in software development and emerging technologies.',
 		facebook: 'https://www.facebook.com/chide2001?mibextid=ZbWKwL',
		linkedin: 'https://www.linkedin.com/in/yada-martins',
		twitter: 'https://x.com/ojo__chide?s=09',
	},
	{
		id: 4,
		image: '/team/about__4.jpeg',
		name: 'Steve Odinkaru',
		intro: 'Co-founder/Product Architect & Lead Designer: Steve is an expert in Figma design and product management with 5 years of experience. He is also a developer of Python and C++. He is in charge of our front-end designs and user experience. He also manages our social media handles.',
		facebook: 'https://www.facebook.com/chide2001?mibextid=ZbWKwL',
		linkedin: 'https://www.linkedin.com/in/steve-odinkaru/',
		twitter: 'https://x.com/ojo__chide?s=09',
	},
	{
		id: 5,
		image: '/team/about__5.jpeg',
		name: 'Asalu Peter',
		intro: "AI/Data Engineer: Asalu is a key contributor to Livestocx's backend infrastructure, focusing on our data collection and training our AI model on collected data. With his expertise in software architecture and database management, Asalu ensures that we can handle high volumes of transactions and data while maintaining optimal performance and reliability.",
		facebook: 'https://www.facebook.com/chide2001?mibextid=ZbWKwL',
		linkedin: 'https://www.linkedin.com/in/asalu-peter-41300a188/',
		twitter: 'https://x.com/ojo__chide?s=09',
	},
];

export const FilterOptions: FilterOption[] = [
	{
		id: 1,
		title: 'Chicken',
		value: 'CHICKEN',
	},
	{
		id: 2,
		title: 'Dog',
		value: 'DOG',
	},
	{
		id: 3,
		title: 'Rabbit',
		value: 'RABBIT',
	},
	{
		id: 4,
		title: 'Turkey',
		value: 'TURKEY',
	},
	{
		id: 5,
		title: 'Cow',
		value: 'COW',
	},
	{
		id: 6,
		title: 'Goat',
		value: 'GOAT',
	},
	{
		id: 7,
		title: 'Pig',
		value: 'PIG',
	},
	{
		id: 8,
		title: 'Guinea Pig',
		value: 'GUINEAPIG',
	},
	{
		id: 9,
		title: 'Sheep',
		value: 'SHEEP',
	},
	{
		id: 10,
		title: 'Fish',
		value: 'FISH',
	},
	{
		id: 11,
		title: 'Grass Cutter',
		value: 'GRASSCUTTER',
	},
	{
		id: 12,
		title: 'Snail',
		value: 'SNAIL',
	},
	{
		id: 13,
		title: 'Bird',
		value: 'BIRD',
	},
	{
		id: 14,
		title: 'Cat',
		value: 'CAT',
	},
];

export type SellerFilterOptionsValue =
	| 'recommended'
	| 'newest'
	| 'oldest'
	| 'lowestPrice'
	| 'highestPrice';

interface SellerFilterOption {
	id: number;
	title: string;
	value: SellerFilterOptionsValue;
}

export const SellerFilterOptions: SellerFilterOption[] = [
	{
		id: 1,
		title: 'Recommended',
		value: 'recommended',
	},
	{
		id: 2,
		title: 'Newest First',
		value: 'newest',
	},
	{
		id: 3,
		title: 'Oldest First',
		value: 'oldest',
	},
	{
		id: 4,
		title: 'Lowest Price First',
		value: 'lowestPrice',
	},
	{
		id: 5,
		title: 'Highest Price First',
		value: 'highestPrice',
	},
];

export const Features: Feature[] = [
	{
		icon: '/icon__feature__1.svg',
		title: 'Co-ordination and Logistics',
		description:
			'Livestock integrates a logistics module, streamlining the coordination of transportation for livestock. Farmers can easily schedule transportation services directly through our platform, optimizing routes to minimize environmental impact and reduce the huge carbon footprint of the transportation process',
	},
	{
		icon: '/icon__feature__2.svg',
		title: 'Farmer Empowerment',
		description:
			'We are committed to empowering local farmers by eliminating unnecessary middlemen, reducing transaction costs, and ensuring fair pricing. By providing direct access to buyers and market information, our platform enhances the financial resilience of farmers, making them better equipped to adapt to climate-related challenges.',
	},
	{
		icon: '/icon__feature__3.svg',
		title: 'Real-time Data Analytics',
		description:
			'Our platform includes robust data analytics tools that provide insights into market trends, pricing, and demand patterns. Local farmers can make informed decisions, reducing the risk of overproduction and aligning their activities with climate-resilient agricultural practices.',
	},
	{
		icon: '/icon__feature__4.svg',
		title: 'Climate-Resilient Practices',
		description:
			'As a future goal, we are putting measures in place to encourage and incentivize climate-resilient farming practices. We will reward farmers who adopt eco-friendly methods, contributing to the overall climate resilience of the agricultural sector.',
	},
];

export const FaqItems: FaqOption[] = [
	{
		id: 1,
		title: 'What can Livestock do for me as a farmer?',
		description:
			'Livestock will help you get more customers easily and faster by giving you and your business increased visibility all over Nigeria and beyond. This is through our unique features to promote small-holder livestock farmers all over Africa.',
	},
	{
		id: 2,
		title: 'Do I need to pay to post my product on Livestock?',
		description:
			'Posting on Livestock, like posting on Facebook, is totally free of charge. But for farmers who want to stand out among others in search, we charge a small premium fee of 500 Naira for advertisement.',
	},
	{
		id: 3,
		title: 'Why do I have to upload my means of identification when registering?',
		description:
			'This is one of our steps to reduce the number of scammers on our platform. We only use your means of identification to verify that you are an actual and legitimate livestock farmer.',
	},
	{
		id: 4,
		title: 'What other steps are you taking to prevent scammers on your platform?',
		description:
			'We are currently working on a chat-like feature where buyers and sellers can converse in-app so that in cases of fraudulent activities, we can properly investigate it.',
		first_description:
			'We take a strong stance against all forms of scamming and fraud. To this end, in addition to collecting your details for verification, we are creating a badge system for trusted sellers who have shown credibility over time. This will help buyers avoid less credible sellers.',
		second_description:
			'We have created a means for reporting all unethical or fraudulent activities to us. This will help us take necessary action on the sellers involved.',
	},
	{
		id: 5,
		title: 'Do you have a mobile app I can download on my phone?',
		description:
			'We are currently developing our mobile app that you can download on your phone. In the meantime, you should be able to do everything through our site: www.livestocx.com',
	},
];


export const enterprisePlanComparisons: EnterprisePlanComparison[] = [
	{
		feature: 'Initial Cost',
		customBusinessWebsite: 'High (design, development, hosting, domain) $3,000 - $10,000 initial + $100 - $300/month maintenance',
		platform: 'Low (starting at $21/month)',
	},
	{
		feature: 'Maintenance Cost',
		customBusinessWebsite: 'High (ongoing maintenance, updates, hosting)',
		platform: 'Included in subscription',
	},
	{
		feature: 'Time to Launch',
		customBusinessWebsite: 'Long (weeks to months for development)',
		platform: 'Short (immediate setup upon subscription)',
	},
	{
		feature: 'Technical Skills Required',
		customBusinessWebsite: 'High (coding, design, server management)',
		platform: 'None (user-friendly interface)',
	},
	{
		feature: 'Product Uploads',
		customBusinessWebsite: 'Additional setup and costs',
		platform: 'Unlimited uploads for $5/month',
	},
	{
		feature: 'Sales Management Tools',
		customBusinessWebsite: 'Additional cost and integration needed',
		platform: 'Included',
	},
	{
		feature: 'Customer Reach',
		customBusinessWebsite: 'Limited (depends on SEO, marketing efforts)',
		platform: 'High (marketplace visibility)',
	},
	{
		feature: 'Promotion and Marketing',
		customBusinessWebsite:
			'Requires separate strategy and additional costs',
		platform: 'Included (weekly product promotions)',
	},
	{
		feature: 'Analytics and Insights',
		customBusinessWebsite: 'Requires separate setup and additional tools',
		platform: 'Included',
	},
	{
		feature: 'Security and Updates',
		customBusinessWebsite:
			'Responsibility of the business owner (time and cost-intensive)',
		platform:
			'Handled by Livestocx (regular updates and security management)',
	},
	{
		feature: 'Customer Support',
		customBusinessWebsite: 'Varies, generally limited to hosting provider',
		platform: 'Included (platform support and assistance)',
	},
];

export const NigerianStates: string[] = [
	'Abuja',
	'Abia',
	'Adamawa',
	'Akwa Ibom',
	'Anambra',
	'Bauchi',
	'Bayelsa',
	'Benue',
	'Borno',
	'Cross River',
	'Delta',
	'Ebonyi',
	'Edo',
	'Ekiti',
	'Enugu',
	'Gombe',
	'Imo',
	'Jigawa',
	'Kaduna',
	'Kano',
	'Katsina',
	'Kebbi',
	'Kogi',
	'Kwara',
	'Lagos',
	'Nasarawa',
	'Niger',
	'Ogun',
	'Ondo',
	'Osun',
	'Oyo',
	'Plateau',
	'Rivers',
	'Sokoto',
	'Taraba',
	'Yobe',
	'Zamfara',
];

export const NigerianCities: {[key: string]: string[]} = {
	Abia: [
		'Aba North',
		'Aba South',
		'Umuahia',
		'Arochukwu',
		'Bende',
		'Ikwuano',
		'Isiala Ngwa',
		'Isuikwuato',
		'Obi Ngwa',
		'Ohafia',
		'Osisioma Ngwa',
		'Ugwunagbo',
		'Ukwa',
		'Umu Nneochi',
	],
	Adamawa: [
		'Yola North',
		'Yola South',
		'Demsa',
		'Fufore',
		'Ganye',
		'Girei',
		'Gombi',
		'Guyuk',
		'Hong',
		'Jada',
		'Lamurde',
		'Madagali',
		'Maiha',
		'Mayo-Belwa',
		'Michika',
		'Mubi North',
		'Mubi South',
		'Numan',
		'Shelleng',
		'Song',
		'Toungo',
	],
	'Akwa Ibom': [
		'Abak',
		'Eket',
		'Ikot Ekpene',
		'Oron',
		'Uyo',
		'Eastern Obolo',
		'Esit-Eket',
		'Essien Udim',
		'Etim-Ekpo',
		'Etinan',
		'Ibeno',
		'Ibesikpo Asutan',
		'Ibiono Ibom',
		'Ika',
		'Ikono',
		'Ikot Abasi',
		'Ini',
		'Itu',
		'Mbo',
		'Mkpat Enin',
		'Nsit Atai',
		'Nsit Ibom',
		'Nsit Ubium',
		'Obot Akara',
		'Okobo',
		'Onna',
		'Oruk Anam',
		'Udung Uko',
		'Ukanafun',
		'Uquo-Ibeno',
		'Uruan',
		'Urue-Offong/Oruko',
	],
	Anambra: [
		'Awka',
		'Idemili',
		'Nnewi',
		'Onitsha',
		'Aghamelu',
		'Aguata',
		'Anambra East',
		'Anambra West',
		'Anaocha',
		'Ayamelum',
		'Dunukofia',
		'Ekwusigo',
		'Ihiala',
		'Njikoka',
		'Ogbaru',
		'Orumba',
		'Oyi',
	],
	Bauchi: [
		'Bauchi',
		'Bogoro',
		'Alkaleri',
		'Damban',
		'Darazo',
		'Dass',
		'Gamawa',
		'Ganjuwa',
		'Giade',
		'Itas/Gadau',
		"Jama'are",
		'Katagum',
		'Kirfi',
		'Misau',
		'Ningi',
		'Shira',
		'Toro',
		'Warji',
		'Zaki',
	],
	Bayelsa: [
		'Yenagoa',
		'Brass',
		'Sagbama',
		'Nembe',
		'Kolokuma/Opokuma',
		'Southern Ijaw',
		'Ekeremor',
		'Ogbia',
		'Nembe',
		'Oloibiri',
		'Egbemo-Angalabiri',
		'Bassambiri',
	],
	Benue: [
		'Gboko',
		'Katsina-Ala',
		'Makurdi',
		'Otukpo',
		'Ado',
		'Agatu',
		'Apa',
		'Buruku',
		'Guma',
		'Gwer',
		'Konshisha',
		'Kwande',
		'Logo',
		'Obi',
		'Ogbadibo',
		'Ohimini',
		'Oju',
		'Okpokwu',
		'Tarka',
		'Ukum',
		'Ushongo',
		'Vandeikya',
	],
	Borno: [
		'Maiduguri',
		'Abadam',
		'Askira/Uba',
		'Bama',
		'Bayo',
		'Biu',
		'Chibok',
		'Damboa',
		'Dikwa',
		'Gubio',
		'Guzamala',
		'Gwoza',
		'Hawul',
		'Jere',
		'Kaga',
		'Kala/Balge',
		'Konduga',
		'Kukawa',
		'Kwaya Kusar',
		'Mafa',
		'Magumeri',
		'Marte',
		'Mobbar',
		'Monguno',
		'Ngala',
		'Nganzai',
		'Shani',
	],
	'Cross River': [
		'Calabar',
		'Ikom',
		'Ogoja',
		'Abi',
		'Akamkpa',
		'Akpabuyo',
		'Bakassi',
		'Bekwara',
		'Biase',
		'Boki',
		'Etung',
		'Obanliku',
		'Obubra',
		'Obudu',
		'Odukpani',
		'Yakuur',
		'Yala',
	],
	Delta: [
		'Oshimili South',
		'Sapele',
		'Ugheli',
		'Uvwie',
		'Warri',
		'Aniocha North',
		'Aniocha South',
		'Bomadi',
		'Burutu',
		'Ethiope East',
		'Ethiope West',
		'Ika North East',
		'Ika South',
		'Isoko',
		'Ndokwa East',
		'Ndokwa West',
		'Okpe',
		'Oshimili North',
		'Patani',
		'Udu',
		'Ukwuani',
	],
	Ebonyi: [
		'Abakaliki',
		'Afikpo',
		'Onueke',
		'Ikwo',
		'Ishieke',
		'Ezza',
		'Ivo',
		'Ohaozara',
		'Ishielu',
		'Ezza South',
		'Afikpo South',
		'Ohaukwu',
	],
	Edo: [
		'Benin City',
		'Auchi',
		'Igarra',
		'Uromi',
		'Ekpoma',
		'Sabongida-Ora',
		'Igueben',
		'Okada',
		'Irrua',
		'Opoji',
		'Ubiaja',
		'Ewu',
	],
	Ekiti: [
		'Ado Ekiti',
		'Ido-Osi',
		'Ikere',
		'Ikole',
		'Ilawe',
		'Aiyekire (Gbonyin)',
		'Aramoko',
		'Efon',
		'Emure',
		'Ijero',
		'Ilejemeje',
		'Irepodun/Ifelodun',
		'Ise/Orun',
		'Moba',
		'Omuo',
		'Oye',
	],
	Enugu: [
		'Enugu',
		'Nkanu West',
		'Nsukka',
		'Udi',
		'Aninri',
		'Awgu',
		'Ezeagu',
		'Igbo Eze South',
		'Igbo-Etiti',
		'Igbo-Eze North',
		'Isi-Uzo',
		'Nkanu East',
		'Oji-River',
		'Udenu',
		'Uzo-Uwani',
	],
	'Abuja': [
		'Central Business District',
		'Gwarinpa',
		'Kubwa',
		'Wuse',
		'Wuse 2',
		'Abaji',
		'Apo District',
		'Asokoro',
		'Bwari',
		'Dakibiyu',
		'Dakwo District',
		'Dei-Dei',
		'Abuja',
		'Duboyi',
		'Durumi',
		'Dutse-Alhaji',
		'Gaduwa',
		'Galadimawa',
		'Garki 1',
		'Garki 2',
		'Gudu',
		'Guzape District',
		'Gwagwa',
		'Gwagwalada',
		'Idu Industrial',
		'Jabi',
		'Jahi',
		'Jikwoyi',
		'Jiwa',
		'Kabusa',
		'Kado',
		'Karmo',
		'Karshi',
		'Karu',
		'Katampe',
		'Kaura',
		'Kpeyegyi',
	],
	Gombe: [
		'Gombe',
		'Kaltungo',
		'Dukku',
		'Billiri',
		'Nafada',
		'Yamaltu/Deba',
		'Balanga',
		'Shomgom',
		'Funakaye',
		'Kwami',
		'Akko',
		'Dange/Shuni',
	],
	Imo: [
		'Ikeduru',
		'Mbaitoli',
		'Okigwe',
		'Orlu',
		'Owerri',
		'Aboh-Mbaise',
		'Ahiazu-Mbaise',
		'Ehime-Mbano',
		'Ezinihitte',
		'Ezinihitte Mbaise',
		'Ideato North',
		'Ideato South',
		'Ihitte/Uboma',
		'Isiala Mbano',
		'Isu',
		'Ngor-Okpala',
		'Njaba',
		'Nkwerre',
		'Nwangele',
		'Obowo',
		'Oguta',
		'Ohaji/Egbema',
		'Onuimo',
		'Orsu',
		'Oru',
	],
	Jigawa: [
		'Dutse-Jigawa',
		'Garki',
		'Auyo',
		'Babura',
		'Biriniwa',
		'Buji',
		'Gagarawa',
		'Gumel',
		'Guri',
		'Gwaram',
		'Gwiwa',
		'Hadejia',
		'Jahun',
		'Kafin Hausa',
		'Kaugama',
		'Kazaure',
		'Kiri Kasamma',
		'Kiyawa',
		'Maigatari',
		'Malam Madori',
		'Miga',
		'Ringim',
		'Roni',
		'Sule-Tankarkar',
		'Taura',
		'Yankwashi',
	],
	Kaduna: [
		'Chikun',
		'Igabi',
		'Kaduna',
		'Zaria',
		'Birnin-Gwari',
		'Giwa',
		'Ikara',
		'Jaba',
		"Jema'a",
		'Kachia',
		'Kagarko',
		'Kajuru',
		'Kaura',
		'Kauru',
		'Kubau',
		'Kudan',
		'Lere',
		'Makarfi',
		'Sanga',
		'Soba',
		'Zango-Kataf',
	],
	Kano: [
		'Fagge',
		'Kano Municipal',
		'Nasarawa-Kano',
		'Tarauni',
		'Ajingi',
		'Albasu',
		'Bagwai',
		'Bebeji',
		'Bichi',
		'Bunkure',
		'Dala',
		'Dambatta',
		'Dawakin Kudu',
		'Dawakin Tofa',
		'Doguwa',
		'Gabasawa',
		'Garko',
		'Garum Mallam',
		'Garun Mallam',
		'Gaya',
		'Gezawa',
		'Gwale',
		'Gwarzo',
		'Kabo',
		'Karaye',
		'Kibiya',
		'Kiru',
		'Kumbotso',
		'Kunchi',
		'Kura',
		'Madobi',
		'Makoda',
		'Minjibir',
		'Rano',
		'Rimin Gado',
		'Rogo',
		'Shanono',
		'Sumaila',
		'Takai',
		'Tofa',
		'Tsanyawa',
		'Tudun Wada',
		'Ungogo',
		'Warawa',
		'Wudil',
	],
	Katsina: [
		'Danja',
		'Daura',
		'Katsina',
		'Zango',
		'Bakori',
		'Batagarawa',
		'Batsari',
		'Baure',
		'Bindawa',
		'Charanchi',
		'Dan Musa',
		'Dandume',
		'Dutsi',
		'Dutsin-Ma',
		'Faskari',
		'Funtua',
		'Ingawa',
		'Jibia',
		'Kafur',
		'Kaita',
		'Kankara',
		'Kankia',
		'Kurfi',
		'Kusada',
		"Mai'adua",
		'Malumfashi',
		'Mani',
		'Mashi',
		'Matazu',
		'Musawa',
		'Rimi',
		'Sabuwa',
		'Safana',
		'Sandamu',
	],
	Kebbi: [
		'Birnin Kebbi',
		'Jega',
		'Zuru',
		'Aleiro',
		'Arewa-Dandi',
		'Argungu',
		'Augie',
		'Bagudo',
		'Bunza',
		'Dandi',
		'Fakai',
		'Gwandu',
		'Kalgo',
		'Koko/Besse',
		'Maiyama',
		'Ngaski',
		'Sakaba',
		'Shanga',
		'Suru',
		'Wasagu/Danko',
		'Yauri',
	],
	Kogi: [
		'Lokoja',
		'Okene',
		'Adavi',
		'Ajaokuta',
		'Ankpa',
		'Bassa',
		'Dekina',
		'Ibaji',
		'Idah',
		'Igala Mela',
		'Igalamela-Odolu',
		'Ijumu',
		'Kabba/Bunu',
		'Kogi LGA',
		'Koton Karfe',
		'Mopa-Muro',
		'Ofu',
		'Ogori/Magongo',
		'Okehi',
		'Olamaboro',
		'Omala',
		'Yagba East',
		'Yagba West',
	],
	Kwara: [
		'Ilorin East',
		'Ilorin South',
		'Ilorin West',
		'Asa',
		'Baruten',
		'Edu',
		'Ekiti-Kwara',
		'Ifelodun-Kwara',
		'Irepodun-Kwara',
		'Isin',
		'Kaiama',
		'Moro',
		'Offa',
		'Oke-Ero',
		'Oyun',
		'Pategi',
	],
	Lagos: [
		'Ajah',
		'Alimosho',
		'Ikeja',
		'Ojo',
		'Surulere',
		'Abule Egba',
		'Agbara-Igbesan',
		'Agboyi/Ketu',
		'Agege',
		'Amuwo-Odofin',
		'Apapa',
		'Badagry',
		'Egbe/Idimu',
		'Ejigbo',
		'Eko Atlantic',
		'Epe',
		'Gbagada',
		'Ibeju',
		'Ifako-Ijaiye',
		'Ikorodu',
		'Ikotun/Igando',
		'Ikoyi',
		'Ilashe',
		'Ilupeju',
		'Ipaja',
		'Isolo',
		'Kosofe',
		'Lagos Island Eko',
		'Lekki',
		'Magodo',
	],
	Nasarawa: [
		'Karu-Nasarawa',
		'Keffi',
		'Lafia',
		'Akwanga',
		'Awe',
		'Doma',
		'Keana',
		'Kokona',
		'Nasarawa',
		'Nasarawa-Eggon',
		'Obi-Nasarawa',
		'Toto',
		'Wamba',
	],
	Niger: [
		'Bida',
		'Bosso',
		'Chanchaga',
		'Minna',
		'Suleja',
		'Agaie',
		'Agwara',
		'Borgu',
		'Edati',
		'Gbako',
		'Gurara',
		'Katcha',
		'Kontagora',
		'Lapai',
		'Lavun',
		'Magama',
		'Mariga',
		'Mashegu',
		'Mokwa',
		'Muya',
		'Paikoro',
		'Rafi',
		'Shiroro',
		'Tafa',
		'Wushishi',
	],
	Ogun: [
		'Abeokuta South',
		'Ado-Odo/Ota',
		'Ijebu Ode',
		'Obafemi-Owode',
		'Sagamu',
		'Abeokuta North',
		'Ayetoro',
		'Ewekoro',
		'Ifo',
		'Ijebu',
		'Ikenne',
		'Ilaro',
		'Imeko Afon',
		'Ipokia',
		'Iseri',
		'Odeda',
		'Odogbolu',
		'Ogun Waterside',
		'Pakuro',
		'Remo North',
	],
	Ondo: [
		'Akure',
		'Iju/Itaogbolu',
		'Okitipupa',
		'Owo',
		'Akungba',
		'Ese-Odo',
		'Idanre',
		'Ifedore',
		'Ikare Akoko',
		'Ilaje',
		'Ile-Oluji-Okeigbo',
		'Irele',
		'Isua',
		'Odigbo',
		'Oka',
		'Okeagbe',
		'Okeigbo',
		'Ose',
	],
	Osun: [
		'Ede',
		'Ife',
		'Ilesa',
		'Olorunda-Osun',
		'Osogbo',
		'Aiyedade',
		'Aiyedire',
		'Atakumosa East',
		'Atakumosa West',
		'Boluwaduro',
		'Boripe',
		'Egbedore',
		'Ifedayo',
		'Ifelodun-Osun',
		'Ikirun',
		'Ila',
		'Irepodun-Osun',
		'Irewole',
		'Isokan',
		'Iwo',
		'Obokun',
		'Ola-Oluwa',
		'Oriade',
		'Orolu',
	],
	Oyo: [
		'Akinyele',
		'Egbeda',
		'Ibadan',
		'Ido',
		'Oluyole',
		'Afijio',
		'Atiba',
		'Atisbo',
		'Ayete',
		'Eruwa',
		'Igbo Ora',
		'Irepo',
		'Iseyin',
		'Itesiwaju',
		'Iwajowa',
		'Kajola',
		'Lagelu',
		'Ogbomosho North',
		'Ogbomosho South',
		'Ogo Oluwa',
		'Olorunsogo',
		'Ona-Ara',
		'Orelope',
		'Ori Ire',
		'Oyo',
		'Saki East',
		'Saki West',
		'Surulere-Oyo',
	],
	Plateau: [
		'Jos North',
		'Jos South',
		'Jos East',
		'Bukuru',
		'Pankshin',
		'Barkin Ladi',
		'Shendam',
		'Langtang',
		'Riyom',
		'Bassa',
		'Bokkos',
		'Mangu',
		'Kanke',
		'Wase',
	],
	Rivers: [
		'Eleme',
		'Ikwerre',
		'Obio-Akpor',
		'Oyigbo',
		'Port-Harcourt',
		'Abua/Odual',
		'Ahoada',
		'Akuku Toru',
		'Andoni',
		'Asari-Toru',
		'Bonny',
		'Degema',
		'Emohua',
		'Etche',
		'Gokana',
		'Khana',
		'Ogba/Egbema/Ndoni',
		'Ogu/Bolo',
		'Okrika',
		'Omuma',
		'Tai',
	],
	Sokoto: [
		'Illela',
		'Sokoto North',
		'Sokoto South',
		'Binji',
		'Bodinga',
		'Dange-Shuni',
		'Gada',
		'Goronyo',
		'Gudu',
		'Gwadabawa',
		'Isa',
		'Kebbe',
		'Kware',
		'Rabah',
		'Sabon Birni',
		'Shagari',
		'Silame',
		'Tambuwal',
		'Tangaza',
		'Tureta',
		'Wamako',
		'Wurno',
		'Yabo',
	],
	Taraba: [
		'Jalingo',
		'Takum',
		'Wukari',
		'Ardo-Kola',
		'Bali',
		'Donga',
		'Gashaka',
		'Gassol',
		'Ibi',
		'Karim-Lamido',
		'Kurmi',
		'Lau',
		'Sardauna',
		'Ussa',
		'Yorro',
		'Zing',
	],
	Yobe: [
		'Damaturu',
		'Potiskum',
		'Bade',
		'Bursari',
		'Fika',
		'Fune',
		'Geidam',
		'Gujba',
		'Gulani',
		'Jakusko',
		'Karasuwa',
		'Machina',
		'Nangere',
		'Nguru',
		'Tarmua',
		'Yunusari',
		'Yusufari',
	],
	Zamfara: [
		'Gusau',
		'Anka',
		'Bakura',
		'Birnin Magaji',
		'Bukkuyum',
		'Bungudu',
		'Gummi',
		'Kaura Namoda',
		'Maradun',
		'Maru',
		'Shinkafi',
		'Talata Mafara',
		'Tsafe',
		'Zurmi',
	],
};
