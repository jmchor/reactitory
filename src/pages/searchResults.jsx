import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArtistResult from '../components/ArtistResult';
import AlbumResult from '../components/AlbumResult';
import AllArtists from '../components/AllArtists';
import GenreResults from '../components/GenreResults';
import AllGenres from '../components/AllGenres';
import TrackResults from '../components/TrackResults';
const SERVER = import.meta.env.VITE_API_URL;

function SearchResults(query) {
	const [artistData, setArtistData] = useState({});
	const [albumData, setAlbumData] = useState({});
	const [trackData, setTrackData] = useState({});
	const [genres, setGenres] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentItems, setCurrentItems] = useState([]);
	const [allItems, setAllItems] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');
	const [modal, setModal] = useState({ open: false, selectedImage: '' });

	const navigate = useNavigate();
	const location = useLocation();
	const { editMessage } = location.state || {};
	const { searchTerm, path } = query;

	console.log('QUERY', query);

	const handleOpenModal = (imageUrl) => {
		setModal({ open: true, selectedImage: imageUrl });
	};

	const handleCloseModal = () => {
		setModal({ open: false, selectedImage: '' });
	};

	const formatReleaseYear = (dateString) => new Date(dateString).getFullYear();

	const itemsPerPage = 5;

	useEffect(() => {
		const fetchData = async () => {
			try {
				let res;

				if (searchTerm === '' && path === 'genre') {
					res = await axios.get(`${SERVER}/search/${path}/all`);
					setGenres([...new Set(res.data.response)]);
				} else if ((searchTerm === 'all' && path === 'artist') || (searchTerm !== 'all' && path === 'artist')) {
					res = await axios.get(
						`${SERVER}/search/${path}/${searchTerm === 'all' ? 'all' : encodeURIComponent(searchTerm)}/albums`
					);

					if (res.data.success) {
						setArtistData(res.data.response);
						setAllItems(res.data.response.albums);
						setCurrentItems(res.data.response.albums.slice(0, itemsPerPage));
					} else {
						console.log(res.data.message);
						setErrorMessage(res.data.message);

						setTimeout(() => {
							navigate('/');
							setErrorMessage('');
						}, 3000);
					}
				} else if (path === 'track' && searchTerm.length === 2) {
					// Case where the path is "tracks" and the searchTerm has two items
					const [query1, query2] = searchTerm;

					res = await axios.get(`${SERVER}/search/${path}`, {
						params: {
							query1: encodeURIComponent(query1),
							query2: encodeURIComponent(query2),
						},
					});

					if (res.data.success) {
						setTrackData(res.data.response);
					} else {
						console.log(res.data.message);
						setErrorMessage(res.data.message);

						setTimeout(() => {
							navigate('/');
							setErrorMessage('');
						}, 3000);
					}
				} else if (path === 'album' && searchTerm.length === 2) {
					// Case where the path is "albums" and the searchTerm has two items
					const [query1, query2] = searchTerm;

					res = await axios.get(`${SERVER}/search/${path}/with-artist`, {
						params: {
							query1: encodeURIComponent(query1),
							query2: encodeURIComponent(query2),
						},
					});

					if (res.data.success) {
						setAlbumData(res.data.response);
					} else {
						console.log(res.data.message);
						setErrorMessage(res.data.message);

						setTimeout(() => {
							navigate('/');
							setErrorMessage('');
						}, 3000);
					}
				} else {
					console.log('CALLING THIS ROUTE!');
					res = await axios.get(`${SERVER}/search/${path}/${encodeURIComponent(searchTerm)}`);

					if ((path === 'album' || path === 'track') && res.data.success) {
						path === 'album' ? setAlbumData(res.data.response) : setTrackData(res.data.response);
					} else if ((searchTerm === 'all' || path === 'genre') && res.data.success) {
						setGenres(res.data.response);
					} else {
						console.log(res.data.message);
						setErrorMessage(res.data.message);

						setTimeout(() => {
							navigate('/');
							setErrorMessage('');
						}, 3000);
					}
				}
			} catch (error) {
				console.error(error.message);
			}
		};

		fetchData();
	}, [searchTerm, path]);

	const handlePageChange = (pageNumber) => {
		const indexOfLastItem = pageNumber * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		const itemsToDisplay = allItems.slice(indexOfFirstItem, indexOfLastItem);

		setCurrentItems(itemsToDisplay);
		setCurrentPage(pageNumber);
	};

	const totalPages = Math.ceil(allItems.length / itemsPerPage);

	if (genres || artistData || albumData || trackData) {
		return (
			<div className='results'>
				{editMessage && <p className='message'>{editMessage}</p>}

				{!errorMessage ? (
					<div>
						{path === 'artist' && artistData && searchTerm !== 'all' && (
							<ArtistResult
								artist={artistData}
								allAlbums={allItems}
								currentAlbums={currentItems}
								totalPages={totalPages}
								currentPage={currentPage}
								handlePageChange={handlePageChange}
								modalOpen={modal.open}
								selectedImage={modal.selectedImage}
								handleOpenModal={handleOpenModal}
								handleCloseModal={handleCloseModal}
							/>
						)}

						{path === 'album' && albumData && <AlbumResult album={albumData} formatReleaseYear={formatReleaseYear} />}

						{path === 'track' && trackData && <TrackResults track={trackData} />}

						{path === 'genre' && genres && searchTerm === 'all' && (
							<AllGenres genres={genres} searchTerm={searchTerm} />
						)}

						{path === 'genre' && genres && searchTerm !== '' && (
							<GenreResults genres={genres} searchTerm={searchTerm} />
						)}

						{path === 'artist' && allItems && searchTerm === 'all' && (
							<AllArtists
								allArtists={allItems}
								currentArtists={currentItems}
								totalPages={totalPages}
								currentPage={currentPage}
								handlePageChange={handlePageChange}
								modalOpen={modal.open}
								selectedImage={modal.selectedImage}
								handleOpenModal={handleOpenModal}
								handleCloseModal={handleCloseModal}
							/>
						)}
					</div>
				) : (
					<div>{errorMessage}</div>
				)}
			</div>
		);
	}
}

export default SearchResults;
