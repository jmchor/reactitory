import SearchBar from '../components/searchBar';
import { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import ArtistResult from '../components/ArtistResult';
const SERVER = import.meta.env.VITE_API_URL;

function SearchResults() {
	const [searchTerm, setSearchTerm] = useState('');
	const [path, setPath] = useState({
		album: false,
		artist: false,
		track: false,
		genre: false,
	});
	const [artist, setArtist] = useState({});
	const [album, setAlbum] = useState({});
	const [track, setTrack] = useState({});
	const [genres, setGenres] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const [currentAlbums, setCurrentAlbums] = useState([]);
	const [allAlbums, setAllAlbums] = useState([]);

	const itemsPerPage = 4;

	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm.term);

		// Find the first true option and set the corresponding path property
		const trueOption = Object.keys(searchTerm.options).find((key) => searchTerm.options[key]);

		if (trueOption) {
			setPath(trueOption);
		}
	};

	const formatReleaseYear = (dateString) => {
		const year = new Date(dateString).getFullYear();
		return year;
	};

	let albumsToDisplay;

	useEffect(() => {
		const fetchData = async () => {
			try {
				let res;

				if (searchTerm === '' && path === 'genre') {
					res = await axios.get(`${SERVER}/search/${path}/all`);
					const uniqueGenres = [...new Set(res.data.response)];
					setGenres(uniqueGenres);
				} else if (path === 'artist') {
					res = await axios.get(`${SERVER}/search/${path}/${encodeURIComponent(searchTerm)}/albums`);
					setArtist((prevArtist) => res.data.response);
					setAllAlbums(res.data.response.albums);
					setCurrentAlbums(res.data.response.albums.slice(0, itemsPerPage));
				} else {
					res = await axios.get(`${SERVER}/search/${path}/${encodeURIComponent(searchTerm)}`);

					if (path === 'album') {
						setAlbum(res.data.response);
					} else if (path === 'track') {
						setTrack(res.data.response);
					}
				}

				// Assuming the artist is part of the response
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [searchTerm, path]); // Include currentPage in the dependencies array

	const handlePageChange = (pageNumber) => {
		const indexOfLastItem = pageNumber * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		const albumsToDisplay = allAlbums.slice(indexOfFirstItem, indexOfLastItem);

		setCurrentAlbums(albumsToDisplay);
		setCurrentPage(pageNumber);
	};

	const totalPages = Math.ceil(allAlbums.length / itemsPerPage);

	if (genres || artist || album || track) {
		return (
			<div className='results'>
				<div>
					<SearchBar onSearch={handleSearch} />
				</div>
				<div>
					{path === 'artist' && artist && (
						<ArtistResult
							artist={artist}
							allAlbums={allAlbums}
							currentAlbums={currentAlbums}
							totalPages={totalPages}
							currentPage={currentPage}
							handlePageChange={handlePageChange}
						/>
					)}

					{path === 'album' && album && (
						<div className='artist-content'>
							<>
								<div className='page-header'>
									<h1 id='album-head'>{album.albumname}</h1>
									<h3>{album.artist}</h3>
									<h5>Released in {formatReleaseYear(album.releasedate)}</h5>
									<img className='artist-image' src={album.image} alt='' />
								</div>

								<div className='table-container'>
									<div className='albums-table'>
										<h3>Tracks</h3>
										{Array.isArray(album.tracklist) && album.tracklist.length > 0 ? (
											<table>
												<thead>
													<tr>
														<th>Name</th>
														<th>Duration</th>
														<th>Youtube URL</th>
													</tr>
												</thead>
												<tbody>
													{album.tracklist.map((track) => (
														<tr key={track.track_id}>
															<td>{track.track}</td>
															<td>{track.duration}</td>
															<td>{track.youtube_url || ' --- '}</td>
														</tr>
													))}
												</tbody>
											</table>
										) : (
											<p>No tracks available for this album.</p>
										)}
									</div>
								</div>
							</>
						</div>
					)}

					{path === 'track' && track && (
						<>
							<h2>{track.track}</h2>
							<table>
								<thead>
									<tr>
										<th>Album</th>
										<th>Artist</th>
										<th>Duration</th>
										<th>YouTube URL</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{track.album}</td>
										<td>{track.artist}</td>
										<td>{track.duration}</td>
										<td>{track.youtube_url || '---'}</td>
									</tr>
								</tbody>
							</table>
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
			</div>
		);
	}
}

export default SearchResults;
