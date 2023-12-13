import { Link } from 'react-router-dom'; // Assuming you are using React Router

function Navbar() {
	return (
		<nav>
			<ul>
				<li>
					<Link to='/search'>Search Database</Link>
				</li>
				<li>
					<Link to='/new-records'>Insert New Records</Link>
				</li>
				<li>
					<Link to='/alter-records'>Alter Record</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
