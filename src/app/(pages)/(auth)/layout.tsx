import Footer from '@/components/navigation/footer';
import Navbar from '@/components/navigation/main-nav-bar';

interface AuthPagesLayoutProps {
	children: React.ReactNode;
}

const PagesLayout = ({children}: AuthPagesLayoutProps) => {
	return (
		<div className=''>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default PagesLayout;
