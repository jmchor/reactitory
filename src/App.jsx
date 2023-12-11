import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
	const [count, setCount] = useState(0);
	const [artist, setArtist] = useState(null);

	useEffect(() => {
		axios.get(`${API_URL}/search/artist/tesseract`).then((res) => {
			setArtist(res.data.artist);
		});
	}, []);

	console.log(artist);

	if (!artist) {
		return <div>Loading...</div>;
	} else {
		return (
			<>
				<div>
					<h1>{artist.artist}</h1>

					<p>What styles of music do we play?</p>

					<ul>
						{artist.genres.map((genre) => (
							<li key={genre}>{genre}</li>
						))}
					</ul>

					<p>And those are all our albums (by ID)</p>

					<ul>
						{artist.album_ids.map((album) => (
							<li key={album.id}>{album}</li>
						))}
					</ul>
				</div>
			</>
		);
	}
}

export default App;
