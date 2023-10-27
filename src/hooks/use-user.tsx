'use client';
import axios, {AxiosError} from 'axios';
import {useEffect, useState} from 'react';

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	password: null;
	role: string;
	accessToken: string;
	refreshToken: string;
}

export function useUserHook() {
	const [user, setUser] = useState<User | null>(null);
	const [isUserSuccess, setIsUserSuccess] = useState<boolean>(false);
	const [error, setError] = useState<AxiosError | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const {data} = await axios.get('/api/auth/account');

				setUser(data);

				setError(null);

				setIsUserSuccess(true);
			} catch (error) {
				const _error = error as AxiosError;

				setUser(null);

				setError(_error);

				setIsUserSuccess(false);
			}
		})();
	}, []);

	return {user, error, isUserSuccess};
}
