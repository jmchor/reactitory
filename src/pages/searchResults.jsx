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

function SearchResults({
	searchTerm,
	path,
	formatReleaseYear,
	handleCloseModal,
	handleOpenModal,
	modalOpen,
	selectedImage,
	itemsPerPage,
}) {
	const [albumData, setAlbumData] = useState({});
	const [tracksData, setTracksData] = useState([]);
	const [genres, setGenres] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentItems, setCurrentItems] = useState([]);
	const [allItems, setAllItems] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();
	const location = useLocation();
	const { editMessage } = location.state || {};
	const wait = () => {
		setTimeout(() => {
			navigate('/');
			setErrorMessage('');
		}, 3000);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				let res;

				if (searchTerm === '' && path === 'genre') {
					res = await axios.get(`${SERVER}/search/${path}/all`);
					setGenres([...new Set(res.data.response)]);
				} else {
					switch (path) {
						case 'artist':
							const artistSearchTerm = searchTerm[0] === 'all' ? 'all' : encodeURIComponent(searchTerm[0]);
							res = await axios.get(`${SERVER}/search/${path}/${artistSearchTerm}`);

							if (searchTerm[0] !== 'all' && res.data.success) {
								navigate(`/artist/${res.data.response.artist_id}`);
							} else if (searchTerm[0] === 'all' && res.data.success) {
								setAllItems(res.data.response);
								setCurrentItems(res.data.response.slice(0, itemsPerPage));
							} else {
								console.log(res.data.message);
								setErrorMessage(res.data.message);
								wait();
							}
							break;

						case 'track':
							if (searchTerm.length === 2) {
								const [query1, query2] = searchTerm;
								res = await axios.get(`${SERVER}/search/${path}`, {
									params: {
										query1: encodeURIComponent(query1),
										query2: encodeURIComponent(query2),
									},
								});

								if (res.data.success) {
									setTracksData(res.data.response);
								} else {
									console.log(res.data.message);
									setErrorMessage(res.data.message);
									wait();
								}
							}
							break;

						case 'album':
							if (searchTerm.length === 2) {
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
									wait();
								}
							} else if (searchTerm.length < 2) {
								res = await axios.get(`${SERVER}/search/${path}/${encodeURIComponent(searchTerm)}`);
								setAlbumData(res.data.response);
								navigate(`/album/${res.data.response.albumid}`);
							}
							break;

						default:
							console.log('HERE');
							res = await axios.get(`${SERVER}/search/${path}/${encodeURIComponent(searchTerm)}`);

							if ((searchTerm === 'all' || path === 'genre') && res.data.success) {
								setGenres(res.data.response);
							} else {
								console.log(res.data.message);
								setErrorMessage(res.data.message);
								wait();
							}
					}
				}
			} catch (error) {
				console.error(error.message);
			}
		};

		fetchData();
	}, [searchTerm, path, navigate]);

	const handlePageChange = (pageNumber) => {
		const indexOfLastItem = pageNumber * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		const itemsToDisplay = allItems.slice(indexOfFirstItem, indexOfLastItem);

		setCurrentItems(itemsToDisplay);
		setCurrentPage(pageNumber);
	};

	const totalPages = Math.ceil(allItems.length / itemsPerPage);

	if (genres || albumData || tracksData) {
		return (
			<div className='results'>
				{editMessage && <p className='message'>{editMessage}</p>}

				{!errorMessage ? (
					<div>
						{path === 'album' && albumData && <AlbumResult album={albumData} formatReleaseYear={formatReleaseYear} />}

						{path === 'track' && tracksData && <TrackResults tracks={tracksData} />}

						{path === 'genre' && genres && searchTerm[0] === 'all' && (
							<AllGenres genres={genres} searchTerm={searchTerm} />
						)}

						{path === 'genre' && genres && searchTerm !== '' && (
							<GenreResults genres={genres} searchTerm={searchTerm} />
						)}

						{path === 'artist' && allItems && searchTerm[0] === 'all' && (
							<AllArtists
								allArtists={allItems}
								currentArtists={currentItems}
								totalPages={totalPages}
								currentPage={currentPage}
								handlePageChange={handlePageChange}
								modalOpen={modalOpen}
								selectedImage={selectedImage}
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
