import SearchForm from '../../(public)/(home)/components/search-form';

const AuthHeader = () => {
	return (
		<section className='h-[35vh] w-full flex flex-col items-center justify-end bg-red-400 bg-home pb-20'>
			<SearchForm />
		</section>
	);
};

export default AuthHeader;
