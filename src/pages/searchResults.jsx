import React from 'react';
import SearchBar from '../components/searchBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
const SERVER = import.meta.env.VITE_API_URL;

function SearchResults() {
	const [searchTerm, setSearchTerm] = useState('');
	const [path, setPath] = useState({
		album: false,
		artist: false,
		track: false,
		genre: false,
	});
	const [allGenres, setAllGenres] = useState(false);
	const [artist, setArtist] = useState({});
	const [album, setAlbum] = useState({});
	const [track, setTrack] = useState({});
	const [genres, setGenres] = useState({});

	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm.term);

		// Find the first true option and set the corresponding path property
		const trueOption = Object.keys(searchTerm.options).find((key) => searchTerm.options[key]);

		if (trueOption) {
			setPath(trueOption);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				let res;

				if (searchTerm === '' && path === 'genre') {
					res = await axios.get(`${SERVER}/search/${path}/all`);
					setAllGenres(true);

					const uniqueGenres = [...new Set(res.data.response)];
					setGenres(uniqueGenres);
				} else if (path === 'artist') {
					res = await axios.get(`${SERVER}/search/${path}/${encodeURIComponent(searchTerm)}/albums`);
					setArtist((prevArtist) => res.data.response);
				} else {
					res = await axios.get(`${SERVER}/search/${path}/${encodeURIComponent(searchTerm)}`);

					if (path === 'album') {
						setAlbum(res.data);
					} else if (path === 'track') {
						setTrack(res.data);
					}
				}

				// Assuming the artist is part of the response
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [searchTerm, path]);

	if (genres || artist || album || track) {
		return (
			<>
				<div>
					<SearchBar onSearch={handleSearch} />
				</div>
				<div>
					<h1>Search Results</h1>

					{path === 'artist' && artist && (
						<>
							<h2>Artist</h2>
							<p>{artist.artist}</p>
							<img src={artist.image} alt='' />

							<h3>Albums</h3>
							{Array.isArray(artist.albums) && artist.albums.length > 0 ? (
								<table>
									<thead>
										<tr>
											<th>Name</th>
											<th>Image</th>
										</tr>
									</thead>
									<tbody>
										{artist.albums.map((album) => (
											<tr key={album.releaseDate}>
												<td>{album.albumName}</td>
												<td>
													<img src={album.image} alt='' style={{ width: '100px', height: '100px' }} />
												</td>
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<p>No albums available for this artist.</p>
							)}

							<p>Genres:</p>
							{Array.isArray(artist.genres) && artist.genres.length > 0 ? (
								<ul>
									{artist.genres.map((genre) => (
										<li key={genre}>{genre}</li>
									))}
								</ul>
							) : (
								<p>No genres available for this artist.</p>
							)}
						</>
					)}

					{path === 'album' && album && (
						<>
							<h2>Album</h2>
						</>
					)}

					{path === 'track' && track && (
						<>
							<h2>Track</h2>
							<p>{track.name}</p>
							<p>{track.duration}</p>
						</>
					)}

					{path === 'genre' && genres && (
						<>
							<h2>Genre</h2>
							{Array.isArray(genres) && genres.length > 0 ? (
								<ul>
									{genres.map((genre) => (
										<li key={genre}>{genre}</li>
									))}
								</ul>
							) : (
								<p>
									{searchTerm} genre
									{searchTerm.endsWith('s') ? '' : 's'}
								</p>
							)}
						</>
					)}

					{/* Add a case for when no data is available */}
					{!artist && !album && !track && (!genres || (Array.isArray(genres) && genres.length === 0)) && (
						<p>No results found for your search criteria.</p>
					)}
				</div>
			</>
		);
	}
}

export default SearchResults;
