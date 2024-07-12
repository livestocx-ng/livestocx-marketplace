import React from 'react';

const PageBanner = ({text}: {text: string}) => {
	return (
		<div className='w-full relative flex items-center justify-center px-4 py-2 bg-gray-200 text-main font-bold rounded'>
			<h1 className='text-sm sm:text-xl'>{text}</h1>
		</div>
	);
};

export default PageBanner;
