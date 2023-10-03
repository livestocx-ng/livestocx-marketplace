import Footer from '@/components/navigation/footer';
import Navbar from '@/components/navigation/main-nav-bar';

interface PagesLayoutProps {
	children: React.ReactNode;
}

const PagesLayout = ({children}: PagesLayoutProps) => {
	return (
		<div className=''>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default PagesLayout;
