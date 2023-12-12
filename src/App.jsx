import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
	const [artist, setArtist] = useState(null);
	const [data, setData] = useState(null);
	const [albums, setAlbums] = useState(null);

	useEffect(() => {
		axios.get(`${API_URL}/search/artist/tesseract/albums`).then((res) => {
			setData(res.data);
			setArtist(res.data.artist);
			setAlbums(res.data.albums);
		});
	}, []);

	console.log(data);

	if (!artist) {
		return <div>Loading...</div>;
	} else {
		return (
			<>
				<div>
					<h1>TEST PAGE --- TEST PAGE --- TEST PAGE</h1>
					<h1>This is the result page for {artist.artist}</h1>
					<h2>Albums</h2>
					<ul>
						{albums.map((album) => (
							<li key={album.releaseDAte}>
								{album.albumName} with {album.trackCount} tracks
							</li>
						))}
					</ul>

					<p>The whole band plays a very distinct style, and the genres are</p>
					<ul>
						{artist.genres.map((genre) => (
							<li key={genre}>{genre}</li>
						))}
					</ul>
				</div>
			</>
		);
	}
}

export default App;
