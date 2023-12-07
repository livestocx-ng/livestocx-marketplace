import axios from 'axios';
import {cookies} from 'next/headers';
import {AuthOptions} from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import {COOKIE_MAX_AGE, COOKIE_NAME} from '@/lib/constants';

const handler: AuthOptions = NextAuth({
	secret: process.env.AUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET ?? '',
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'online',
				},
			},
		}),
	],
	callbacks: {
		async signIn({account, profile}) {
			if (account?.provider === 'google') {
				console.log('[GOOGLE-SIGNIN-SUCCESS]');
				console.log(`[USER] :: `, profile);

				try {
					const {data} = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/google-signin`,
						{email: profile?.email}
					);

					// console.log('[DATA] :: ', data.data);

					cookies().set({
						name: COOKIE_NAME,
						value: JSON.stringify({
							...data.data.user,
							accessToken: data?.data?.accessToken,
							refreshToken: data?.data?.refreshToken,
						}),
						httpOnly: true,
						maxAge: COOKIE_MAX_AGE,
						path: '/',
						sameSite: 'strict',
						secure: process.env.NODE_ENV === 'production',
					});

					return Promise.resolve('/');
				} catch (error) {
					console.error('[GOOGLE-SIGIN-API-ERROR]', error);
				}
			}

			// return profile?.email && profile?.email.endsWith("@example.com")

			return true; // Do different verification for other providers that don't have `email`
		},
	},
	// async redirect({url, baseUrl}) {
	// 	// Allows relative callback URLs
	// 	if (url.startsWith('/')) return `${baseUrl}${url}`;
	// 	// Allows callback URLs on the same origin
	// 	else if (new URL(url).origin === baseUrl) return url;
	// 	return baseUrl;
	// },
});

export {handler as GET, handler as POST};
