function Home() {
	return (
		<div className='home-screen'>
			<img className='home-image' src='/speaker.jpg' alt='' />
			<div className='headline-container-home'>
				<div className='headline-container' id='auditory'>
					<h1>Auditory</h1>
					<div className='backdrop-black'></div>
				</div>
				<div className='backdrop-big'></div>
			</div>
			<p>Look up artist, albums and tracks, create stuff, and be happy about it.</p>
		</div>
	);
}

export default Home;
