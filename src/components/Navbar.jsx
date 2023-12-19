import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/new-records'>New DB Records</Link>
				</li>
				<li>
					<Link to='/about'>About Auditory</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
