import axios from 'axios';
import {cookies} from 'next/headers';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import {
	COOKIE_MAX_AGE,
	COOKIE_NAME,
	LIVESTOCX_AUTH_REDIRECT,
} from '@/lib/constants';

const handler = NextAuth({
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
				try {
					const name = profile?.name
						? profile?.name?.split(' ')
						: ['', ''];

					const {data} = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/google-signin`,
						{
							email: profile?.email,
							firstName: name[0],
							lastName: name[1],
						}
					);

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

					const cookiesInstance = cookies();
					const redirectUrlCookie = cookiesInstance.get(
						LIVESTOCX_AUTH_REDIRECT
					);

					console.info(
						'[CALLBACK_LIVESTOCX_AUTH_REDIRECT] :: ',
						redirectUrlCookie
					);
					console.info(
						'[CALLBACK_LIVESTOCX_AUTH_REDIRECT_VALUE] :: ',
						redirectUrlCookie?.value
					);
					console.info(
						'[CALLBACK_LIVESTOCX_AUTH_REDIRECT_VALUE_INCLUDES_BUSINESS] :: ',
						redirectUrlCookie?.value.includes('business')
					);

					if (redirectUrlCookie?.value.includes('business')) {
						const redirectUrl = redirectUrlCookie?.value.includes(
							'business'
						)
							? '/business?subscription_now=true'
							: redirectUrlCookie?.value;

						console.info(
							'[RETURN_LIVESTOCX_AUTH_REDIRECT] :: ',
							redirectUrlCookie
						);

						return Promise.resolve(redirectUrl);
					}

					return Promise.resolve('/');
				} catch (error) {
					// console.error('[GOOGLE-SIGN-API-ERROR]', error);
				}
			}

			// return profile?.email && profile?.email.endsWith("@example.com")

			return true; // Do different verification for other providers that don't have `email`
		},
		// async redirect({url, baseUrl}) {
		// 	const cookiesInstance = cookies();
		// 	const redirectUrlCookie = cookiesInstance.get(
		// 		LIVESTOCX_AUTH_REDIRECT
		// 	);

		// 	console.info('[LIVESTOCX_AUTH_REDIRECT] :: ', redirectUrlCookie);
		// 	console.info('[LIVESTOCX_AUTH_REDIRECT_VALUE] :: ', redirectUrlCookie?.value);
		// 	console.info('[LIVESTOCX_AUTH_REDIRECT_VALUE_INCLUDES_BUSINESS] :: ', redirectUrlCookie?.value.includes('business'));

		// 	if (redirectUrlCookie?.value.includes('business')) {
		// 		const redirectUrl = redirectUrlCookie?.value.includes('business')
		// 			? '/business?subscription_now=true'
		// 			: redirectUrlCookie?.value;

		// 		console.info(
		// 			'[LIVESTOCX_AUTH_REDIRECT] :: ',
		// 			redirectUrlCookie
		// 		);

		// 		return redirectUrl;
		// 	}

		// 	return baseUrl;
		// },
	},
});

export {handler as GET, handler as POST};
