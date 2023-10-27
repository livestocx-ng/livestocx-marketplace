import React from 'react';

const PageBanner = ({text}: {text: string}) => {
	return (
		<div className='w-full relative flex items-center justify-between px-4 py-4 bg-gray-200 rounded'>
			<h1>{text}</h1>
		</div>
	);
};

export default PageBanner;
