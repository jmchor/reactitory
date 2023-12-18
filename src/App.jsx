import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
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

const App = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [path, setPath] = useState({
		album: false,
		artist: false,
		track: false,
		genre: false,
	});
	const [modal, setModal] = useState({ open: false, selectedImage: '' });
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

	const location = useLocation();
	const isSearchResultsPage =
		(location.pathname.startsWith('/search/') && location.pathname !== '/search/:query') ||
		location.pathname === '/new-records' ||
		location.pathname.startsWith('/album/');

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
							/>
						}
					/>
					<Route path='/album/:albumid' element={<ModifiedAlbumResult formatReleaseYear={formatReleaseYear} />}></Route>
					<Route
						path='/artist/:artist_id'
						element={
							<ModifiedArtistResult
								handleCloseModal={handleCloseModal}
								handleOpenModal={handleOpenModal}
								modalOpen={modal.open}
								selectedImage={modal.selectedImage}
								itemsPerPage={itemsPerPage}
							/>
						}
					></Route>
					<Route path='/track/:track_id' element={<ModifiedTrackResults />}></Route>
				</Routes>
			</div>
		</div>
	);
};

export default App;
