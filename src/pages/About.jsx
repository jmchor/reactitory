function About() {
	return (
		<div>
			<h1 id='reactitory-the-auditory-frontend-written-in-react'>
				Reactitory - the auditory frontend written in React
			</h1>
			<p>
				This is the frontend magic for the <a href='https://github.com/jmchor/auditory'>auditory backend magic</a>.
				Magic all around.
			</p>
			<p align='center'>
				<img src='public/reactitory.png' alt='the auditory fron page' width='500px' />
			</p>
			<h2 id='features'>Features</h2>
			<p>All of the routes are getting called - and now you have a nice frontend UI for it!</p>
			<ul>
				<li>
					<p>
						<strong>Create New Records:</strong> Type in the name of an artist - and auditory does the rest (while you
						get to enjoy loading spinners!)
					</p>
				</li>
				<li>
					<p>
						<strong>Alter Records:</strong> Every Artist and Album has the option to edit the database entry
					</p>
				</li>
				<li>
					<p>
						<strong>Dynamic Search Results:</strong> The component dynamically fetches and displays results based on the
						user&#39;s search query, including artists, albums, tracks, and genres.
					</p>
				</li>
				<li>
					<p>
						<strong>Pagination:</strong> For lengthy result lists, the component implements pagination to improve user
						navigation and experience.
					</p>
				</li>
				<li>
					<p>
						<strong>Modal Display:</strong> When a user clicks on an image in the table, a modal with a larger version
						of the image is displayed.
					</p>
				</li>
			</ul>
			<h2 id='usage'>Usage</h2>
			<p>Put in a search term, select a search option, and see what you get!</p>
			<ul>
				<li>
					<p>
						<strong>Track Search:</strong> Here you NEED to put in the ARTIST, TRACK names. I found that loads of
						artists share track titles.
					</p>
				</li>
				<li>
					<p>
						<strong>Album Search:</strong> Here you can choose - just the ALBUM, or ALBUM, ARTIST - if you&#39;re not
						sure if the album name is unique or not.
					</p>
				</li>
			</ul>
			<h2 id='dependencies'>Dependencies</h2>
			<ul>
				<li>React</li>
				<li>Axios</li>
			</ul>
			<h2 id='how-to-run'>How to Run</h2>
			<ol>
				<li>
					Install dependencies: <code>npm install</code>
				</li>
				<li>
					Run the application: <code>npm start</code>
				</li>
			</ol>
			Image by{' '}
			<a href='https://www.freepik.com/free-vector/hand-drawn-black-speaker-background_4471596.htm#query=speaker&position=25&from_view=search&track=sph&uuid=708bf892-f84d-4cc1-9c9f-b06f420b2ae2'>
				Freepik
			</a>
		</div>
	);
}

export default About;
