import { useParams, useLocation } from 'react-router-dom';

function AlternateResults() {
	const { query } = useParams();
	const location = useLocation();
	const fullUrl = location.pathname + location.search;

	console.log('Full URL:', fullUrl);
	console.log('Query:', query);

	return <div> {query}</div>;
}

export default AlternateResults;
