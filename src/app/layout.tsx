import ReactGA from 'react-ga4';
import type {Metadata} from 'next';
import {Poppins} from 'next/font/google';
import {Toaster} from '@/components/ui/toaster';

import './globals.css';
import {ToastProvider} from '@/providers';
import AuthProvider from '@/providers/auth-provider';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
});

// Initialize Google Analytics
ReactGA.initialize(process.env.NEXT_GOOGLE_ANALYTICS_MEASUREMENT_ID ?? '');

export const metadata: Metadata = {
	title: 'Livestocx - Best deals, Everything Livestocx',
	description: 'Best deals, Everything Livestocx',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='en'>
			<body className={poppins.className}>
				<AuthProvider>
					<ToastProvider />
					<Toaster />
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
