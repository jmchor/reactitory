function About() {
	return (
		<div className='about-container'>
			<div className='headline-container'>
				<h1>Welcome and thank you for checking out Auditory!</h1>
				<div className='backdrop'></div>
			</div>

			<div className='about-text'>
				<h3>What is this?</h3>
				<p>
					Auditory is yet another "scratch my own itch" project, as developers with a job that doesn't involve
					developing so often create.
				</p>
				<p>The itches involved here were:</p>
				<ul>
					<li>my React is getting rusty</li>
					<li>my Node is getting rusty</li>
					<li>my JavaScript overall is getting rusty</li>
					<li>I have no idea what kind of music I have on my computer</li>
					<li>maybe I could organize it in a database?</li>
					<li>I need to practice with PostgreSQL</li>
					<li>the Spotify API looks fun!</li>
				</ul>
				<p>&nbsp;</p>
				<p>
					And here we are. Written in <strong>Node.js</strong>, <strong>React</strong>, <strong>Express</strong> and{' '}
					<strong>PostgreSQL</strong>, Auditory is a database application that will fetch data and store it in a
					database for you - including manipulation!
				</p>
				<p>
					So, basic CRUD of course - no authentication or anything, you're supposed to either run it on your own system
					(localhost) or deploy it somewhere only you can access it - or share, if you want to.
				</p>
				<p>You can</p>
				<ol>
					<li>
						look up data (like artists and albums by name, get more info on each, search for specific tracks using
						artist AND trackname)
					</li>
					<li>edit data (change database entries right in the frontend UI)</li>
					<li>the deletion of data is not yet part of the package. (So that would technically be a "can't").</li>
				</ol>
				<p>
					Oh, and the image on the home page is by{' '}
					<a href='https://www.freepik.com/free-vector/hand-drawn-black-speaker-background_4471596.htm#query=speaker&position=25&from_view=search&track=sph&uuid=708bf892-f84d-4cc1-9c9f-b06f420b2ae2'>
						Freepik
					</a>
				</p>
			</div>
		</div>
	);
}

export default About;
