import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ArtistResult from '../components/ArtistResult';
import AlbumResult from '../components/AlbumResult';
import AllArtists from '../components/AllArtists';

const SERVER = import.meta.env.VITE_API_URL;

function SearchResults(query) {
	const [artist, setArtist] = useState({});
	const [album, setAlbum] = useState({});
	const [track, setTrack] = useState({});
	const [genres, setGenres] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const [currentAlbums, setCurrentAlbums] = useState([]);
	const [allAlbums, setAllAlbums] = useState([]);
	const [allArtists, setAllArtists] = useState([]);
	const [currentArtists, setCurrentArtists] = useState([]);

	const location = useLocation();
	const { editMessage } = location.state || {};

	const itemsPerPage = 5;

	const { searchTerm, path } = query;

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');

	const handleOpenModal = (imageUrl) => {
		setSelectedImage(imageUrl);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const formatReleaseYear = (dateString) => {
		const year = new Date(dateString).getFullYear();
		return year;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				let res;

				if (searchTerm === '' && path === 'genre') {
					res = await axios.get(`${SERVER}/search/${path}/all`);
					const uniqueGenres = [...new Set(res.data.response)];
					setGenres(uniqueGenres);
				} else if (searchTerm === 'all' && path === 'artist') {
					res = await axios.get(`${SERVER}/search/${path}/all`);
					setAllArtists((prevArtist) => res.data.response);
					setCurrentArtists(res.data.response.slice(0, itemsPerPage));
				} else if (searchTerm !== 'all' && path === 'artist') {
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
					} else if (searchTerm === 'all' && path === 'genre') {
						setGenres(res.data.response);
					} else if (path === 'genre') {
						setGenres(res.data.response);
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

	const handleArtistPageChange = (pageNumber) => {
		const indexOfLastItem = pageNumber * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		const artistsToDisplay = allArtists.slice(indexOfFirstItem, indexOfLastItem);

		setCurrentArtists(artistsToDisplay);
		setCurrentPage(pageNumber);
	};

	const totalPages = Math.ceil(allAlbums.length / itemsPerPage);
	const totalArtistPages = Math.ceil(allArtists.length / itemsPerPage);

	if (genres || artist || album || track) {
		return (
			<div className='results'>
				{editMessage && <p className='message'>{editMessage}</p>}

				<div>
					{path === 'artist' && artist && searchTerm !== 'all' && (
						<ArtistResult
							artist={artist}
							allAlbums={allAlbums}
							currentAlbums={currentAlbums}
							totalPages={totalPages}
							currentPage={currentPage}
							handlePageChange={handlePageChange}
							modalOpen={modalOpen}
							selectedImage={selectedImage}
							handleOpenModal={handleOpenModal}
							handleCloseModal={handleCloseModal}
						/>
					)}

					{path === 'album' && album && <AlbumResult album={album} formatReleaseYear={formatReleaseYear} />}

					{path === 'track' && track && (
						<div className='track-container'>
							<div className='headline-container'>
								<h2>{track.track}</h2>
								<div className='backdrop-smaller'></div>
							</div>

							<div className='tracks-table' id='for-tracks'>
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
							</div>
						</div>
					)}

					{path === 'genre' && genres && searchTerm === 'all' && (
						<>
							<div className='headline-container'>
								<h2>Genres</h2>
								<div className='backdrop-smaller'></div>
							</div>

							{Array.isArray(genres) && genres.length > 0 ? (
								<ul className='genres-table'>
									{genres.map((genre, index) => (
										<li key={genre} className='genre-item'>
											<div className='headline-container'>
												<p>{genre}</p>
												<div className='backdrop-genres'></div>
											</div>
										</li>
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

					{path === 'genre' && genres && searchTerm !== '' && (
						<>
							<div className='headline-container'>
								<h2>Artists with this Genre</h2>
								<div className='backdrop-smaller'></div>
							</div>

							{Array.isArray(genres) && genres.length > 0 ? (
								<ul className='genres-table'>
									{genres.map((genre, index) => (
										<li key={genre.artist_id} className='genre-item'>
											<div className='headline-container'>
												<p>{genre.artist}</p>
												<div className='backdrop-genres'></div>
											</div>
										</li>
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

					{path === 'artist' && allArtists && searchTerm === 'all' && (
						<AllArtists
							allArtists={allArtists}
							currentArtists={currentArtists}
							totalPages={totalArtistPages}
							currentPage={currentPage}
							handlePageChange={handleArtistPageChange}
							modalOpen={modalOpen}
							selectedImage={selectedImage}
							handleOpenModal={handleOpenModal}
							handleCloseModal={handleCloseModal}
						/>
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
