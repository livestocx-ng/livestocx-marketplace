import ReactGA from 'react-ga4';
import type {Metadata} from 'next';
import {Poppins} from 'next/font/google';
import {Toaster} from '@/components/ui/toaster';

import './globals.css';
import Head from 'next/head';
import {ToastProvider} from '@/providers';
import AuthProvider from '@/providers/auth-provider';
import CookieBannerProvider from '@/providers/cookie-banner-provider';
import GoogleAnalyticsProvider from '@/providers/google-analytics-provider';
import SocketProvider from '@/providers/socket-provider';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
});

// Initialize Google Analytics
// ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '');

export const metadata: Metadata = {
	title: 'Livestocx - Best deals, Everything Animals',
	description: 'Best deals, Everything Animals',
	keywords: ['Livestocx', 'Livestock', 'Nigeria', 'Animals', 'Meat'],
	other: {
		'facebook-domain-verification': 'yy2fxudmyl6e8nxtl2zjx9lss8j8dl',
	},
	openGraph: {
		title: 'Livestocx',
		description: 'Best deals, Everything Animals',
		url: 'https://livestocx.com',
		siteName: 'Livestocx',
		type: 'website',
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
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				alt: 'Livestocx Banner',
				width: 1200,
				height: 630,
			},
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				alt: 'Livestocx Banner',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@livestocx',
		creator: '@livestocx',
		title: 'Livestocx',
		
		description: 'Best deals, Everything Animals',
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
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				alt: 'Livestocx Banner',
				width: 1200,
				height: 630,
			},
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				alt: 'Livestocx Banner',
			},
		],
	},
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='en'>
			<GoogleAnalyticsProvider />

			<body className={poppins.className}>
				<AuthProvider>
					<SocketProvider>
						<ToastProvider />
						<Toaster />
						{children}
					</SocketProvider>
				</AuthProvider>

				<CookieBannerProvider />
			</body>
		</html>
	);
}
