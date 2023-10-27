import React from 'react';
import AccountSettings from './settings/account-settings';
import BillingSettings from './settings/billing-settings';
import PasswordSettings from './settings/password-settings';

const SettingsContent = () => {
	return (
		<div className='w-[78%] flex flex-col gap-5'>
			<AccountSettings />

			<BillingSettings />

			<PasswordSettings />
		</div>
	);
};

export default SettingsContent;
