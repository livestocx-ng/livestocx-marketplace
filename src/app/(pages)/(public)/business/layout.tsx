import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: 'Livestocx - Business',
	description: 'Best deals, Everything Animals',
	keywords: ['Livestocx', 'Livestock', 'Nigeria', 'Animals', 'Meat'],
	openGraph: {
		images: [
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x200.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x200.png',
				width: 300,
				height: 200,
			},
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x300.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x300.png',
				width: 300,
				height: 300,
			},
		],
	},
	twitter: {
		images: [
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x200.png',
				secureUrl:
				'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x200.png',
				width: 300,
				height: 200,
			},
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x300.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x300.png',
				width: 300,
				height: 300,
			},
		],
	},
	
};

export default function PricingLayout({children}: {children: React.ReactNode}) {
	return <>{children}</>;
}
