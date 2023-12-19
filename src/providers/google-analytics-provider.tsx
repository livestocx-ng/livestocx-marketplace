import ReactGA from 'react-ga4';

const useGoogleAnalyticsEventTracker = (category: string) => {
	const eventTracker = (action = 'test action', label = 'test label') => {
		ReactGA.event({category, action, label});
	};
	return eventTracker;
};

export default useGoogleAnalyticsEventTracker;
