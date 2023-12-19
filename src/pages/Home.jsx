import { DotLoader } from 'react-spinners';
import { useState, useEffect } from 'react';
import axios from 'redaxios';
const SERVER = import.meta.env.VITE_API_URL;

function Home() {
	const [success, setSuccess] = useState(false);
	const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchSuccess = async () => {
			try {
				// Simulate a delayed response (e.g., 3000 milliseconds or 3 seconds)

				const res = await axios.get(`${SERVER}/`);
				setSuccess(res.data.success);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		fetchSuccess();
	}, []);

	useEffect(() => {
		// Set up interval for changing loading messages
		const intervalId = setInterval(() => {
			setLoadingMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
		}, 5000);

		// Clean up the interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	const loadingMessages = [
		'Initializing server... Please wait.',
		'Starting up the server. This may take a moment.',
		'Server is waking up. Hang tight!',
		'Loading server components. Almost there!',
		'Preparing the server for action. Just a moment.',
		'Booting up the server. Sit back and relax.',
		"Initializing services. It won't be long now.",
		'Server startup in progress. Stay patient!',
		'Setting up the server environment. Be patient with us.',
		"Starting server processes. This won't take long.",
	];
	return (
		<div>
			{!success && isLoading ? (
				<div className='loading-box'>
					<DotLoader color='#e4cf32' />

					<p>{loadingMessages[loadingMessageIndex]}</p>
				</div>
			) : (
				// Render the rest of the content when success is true
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
			)}
		</div>
	);
}

export default Home;
