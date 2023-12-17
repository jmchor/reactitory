import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import axios from 'axios';
const SERVER = import.meta.env.VITE_API_URL;

function NewRecord() {
	const [name, setName] = useState('');
	const [fetchedResults, setFetchedResults] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
	const navigate = useNavigate();

	const loadingMessages = [
		'Calling the database...',
		'Fetching all the artist data',
		'Now the albums - this might take a while to avoid rate limiting...',
		'Putting them all away in the database...',
		'Now we can fetch the tracks for each album...',
		'We space that out too to avoid rate limiting...AGAIN...',
		'Now we can put the tracks in the database...',
		'Did you know that Spotify has a rate limit?',
		'Rate limiting is a pain, but we got through it!',
		'Almost done!',
		'Just a few more things...',
		'And we are done!',
		'Redirecting you to the search page...',
	];

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);

		submitRecord(name);
	};

	const submitRecord = async (name) => {
		try {
			const res = await axios.post(`${SERVER}/catchall/${name}`, name);
			console.log(res);
			setFetchedResults(true);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (fetchedResults) {
			// Redirect to the search page with the provided name

			setTimeout(() => {
				navigate(`/`);
				setFetchedResults(false);
				setIsLoading(false);
			}, 2000);
		}
	}, [fetchedResults, name, navigate]);

	useEffect(() => {
		// Set up interval for changing loading messages
		const intervalId = setInterval(() => {
			setLoadingMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
		}, 5000);

		// Clean up the interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	return (
		<>
			<div className='new-records'>
				<div className='newrecords-text'>
					<div className='headline-container'>
						<h1>Create a new Catch-All-Record!</h1>
						<div className='backdrop'></div>
					</div>

					<div className='headline-container'>
						<h3>You put in an artist's name, and we'll do the rest!</h3>
						<h4>
							We'll get their ID and other info, all of their albums (and put all of those in the albums table) as well
							as ALL the tracks for those albums!
						</h4>
						<div className='backdrop'></div>
					</div>
				</div>

				<div className='search-area'>
					<div className='search-bar-container'>
						<input
							className='search-input'
							type='text'
							id='name'
							name='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<button className='search-button' onClick={handleSubmit}>
							Create
						</button>
					</div>

					{!fetchedResults && isLoading && (
						<div className='loading-box'>
							<RingLoader color='#e4cf32' />

							<p>{loadingMessages[loadingMessageIndex]}</p>
						</div>
					)}

					<div className='headline-container'>
						<p>
							Or you can go back to the <a href='/'>home page</a>
						</p>
						<div className='backdrop-smaller'></div>
					</div>
				</div>
			</div>
		</>
	);
}

export default NewRecord;

// after subbmitting the form, wait a bit and then basically do exactly what the search results page does
