import type {Metadata} from 'next';
import {Poppins} from 'next/font/google';

import './globals.css';
import {ToastProvider} from '@/providers';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
	title: 'Livestocx - Best deals, Everything Livestocx',
	description: 'Best deals, Everything Livestocx',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='en'>
			<body className={poppins.className}>
				<ToastProvider />
				{children}
			</body>
		</html>
	);
}
