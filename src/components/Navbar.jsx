import { Link, useLocation } from 'react-router-dom';

function Navbar() {
	const location = useLocation();

	const handleRefresh = (pathname) => {
		// Check if the current location pathname matches the link pathname
		if (location.pathname === pathname) {
			// Use window.location.reload() to refresh the current page
			window.location.reload();
		}
	};

	return (
		<nav>
			<ul>
				<li>
					<Link to='/' onClick={() => handleRefresh('/')}>
						Home
					</Link>
				</li>
				<li>
					<Link to='/new-records' onClick={() => handleRefresh('/new-records')}>
						Insert New Records
					</Link>
				</li>

				<li>
					<Link to='/about' onClick={() => handleRefresh('/about')}>
						About
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
