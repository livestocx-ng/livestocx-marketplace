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
	title: 'Livestocx - Best deals, Everything Livestock',
	description: 'Best deals, Everything Animals',
	keywords: ['livestocx', 'Livestock', 'Nigeria', 'Animals', 'Meat'],
	other: {
		'facebook-domain-verification': 'yy2fxudmyl6e8nxtl2zjx9lss8j8dl',
	},
	openGraph: {
		images: [
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-sitemap.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-sitemap.png',
				width: 300,
				height: 300,
			},
		],
	},
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='en'>
			<Head>
				<meta
					property='og:image'
					content={
						'https://livestocx-media.s3.amazonaws.com/public/livestocx-sitemap.png'
					}
				/>
			</Head>
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
