import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav>
			<ul>
				<li>
					<a href='/'>Home</a>
				</li>
				<li>
					<a href='/new-records'>New DB Records</a>
				</li>

				<li>
					<a href='/about'>About Auditory</a>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
