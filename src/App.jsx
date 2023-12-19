/* eslint-disable no-case-declarations */
import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'redaxios';

const SERVER = import.meta.env.VITE_API_URL;

import Home from './pages/Home';
import Navbar from './components/Navbar';
import NewRecord from './pages/NewRecord';

import SearchResults from './pages/searchResults';
import SearchBar from './components/SearchBarComponent';
import EditAlbum from './pages/editpages/EditAlbum';
import EditArtist from './pages/editpages/EditArtist';
import EditTrack from './pages/editpages/EditTrack';
import ModifiedAlbumResult from './components/ModifiedAlbumResult';
import ModifiedArtistResult from './components/ModifiedArtistResult';
import ModifiedTrackResults from './components/ModifiedTrackResults';
import About from './pages/About';

const App = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [path, setPath] = useState({
		album: false,
		artist: false,
		track: false,
		genre: false,
	});
	const [modal, setModal] = useState({ open: false, selectedImage: '' });
	const [albumData, setAlbumData] = useState({});
	const [tracksData, setTracksData] = useState([]);
	const [genres, setGenres] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentItems, setCurrentItems] = useState([]);
	const [allItems, setAllItems] = useState([]);
	const [artist, setArtist] = useState({});
	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();

	const handleOpenModal = (imageUrl) => {
		setModal({ open: true, selectedImage: imageUrl });
	};

	const handleCloseModal = () => {
		setModal({ open: false, selectedImage: '' });
	};

	const formatReleaseYear = (dateString) => new Date(dateString).getFullYear();

	const itemsPerPage = 5;

	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm.term);

		// Find the first true option and set the corresponding‚ path property
		const trueOption = Object.keys(searchTerm.options).find((key) => searchTerm.options[key]);

		if (trueOption) {
			setPath(trueOption);
		}
	};

	const wait = () => {
		setTimeout(() => {
			navigate('/');
			setErrorMessage('');
		}, 3000);
	};

	const location = useLocation();
	const isSearchResultsPage = location.pathname === '/new-records' || location.pathname === '/about';

	const handlePageChange = (pageNumber) => {
		const indexOfLastItem = pageNumber * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		const itemsToDisplay = allItems.slice(indexOfFirstItem, indexOfLastItem);

		setCurrentItems(itemsToDisplay);
		setCurrentPage(pageNumber);
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
								res = await axios.get(`${SERVER}/search/${path}/${artistSearchTerm}/albums`);
								setArtist(res.data.response);
								setAllItems(res.data.response.albums);
								setCurrentItems(res.data.response.albums.slice(0, itemsPerPage));
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
								console.log('HERE');
								res = await axios.get(`${SERVER}/search/${path}/${encodeURIComponent(searchTerm)}`);
								setAlbumData(res.data.response);
								navigate(`/album/${res.data.response.albumid}`);
							}
							break;

						default:
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
	}, [searchTerm, path]);

	const totalPages = Math.ceil(allItems.length / itemsPerPage);

	return (
		<div className='App'>
			<Navbar />
			{!isSearchResultsPage && <SearchBar onSearch={handleSearch} />}

			<div id='content'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/new-records' element={<NewRecord />} />
					<Route path='/edit-artist/:id' element={<EditArtist />} />
					<Route path='/edit-album/:id' element={<EditAlbum />} />
					<Route path='/edit/track/:id' element={<EditTrack />} />

					<Route
						path='/search/:query/:searchId'
						element={
							<SearchResults
								searchTerm={searchTerm}
								path={path}
								formatReleaseYear={formatReleaseYear}
								handleCloseModal={handleCloseModal}
								handleOpenModal={handleOpenModal}
								modalOpen={modal.open}
								selectedImage={modal.selectedImage}
								itemsPerPage={itemsPerPage}
								albumData={albumData}
								tracksData={tracksData}
								genres={genres}
								currentPage={currentPage}
								currentItems={currentItems}
								allItems={allItems}
								totalPages={totalPages}
								handlePageChange={handlePageChange}
								navigate={navigate}
								errorMessage={errorMessage}
							/>
						}
					/>
					<Route
						path='/album/:albumid'
						element={<ModifiedAlbumResult formatReleaseYear={formatReleaseYear} album={albumData} />}
					></Route>
					<Route
						path='/artist/:artist_id'
						element={
							<ModifiedArtistResult
								handleCloseModal={handleCloseModal}
								handleOpenModal={handleOpenModal}
								modalOpen={modal.open}
								selectedImage={modal.selectedImage}
								itemsPerPage={itemsPerPage}
								allItems={allItems}
								currentItems={currentItems}
								currentPage={currentPage}
								genres={genres}
								totalPages={totalPages}
								handlePageChange={handlePageChange}
								artist={artist}
							/>
						}
					></Route>
					<Route path='/track/:track_id' element={<ModifiedTrackResults />}></Route>
					<Route path='/about' element={<About />}></Route>
				</Routes>
			</div>
		</div>
	);
};

export default App;
