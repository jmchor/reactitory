import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NewRecord from './pages/NewRecord';

import SearchResults from './pages/searchResults';
import Searchbar from './components/Searchbar';
import EditAlbum from './pages/editPages/EditAlbum';
import EditArtist from './pages/editPages/EditArtist';
import EditTrack from './pages/editPages/EditTrack';

const App = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [path, setPath] = useState({
		album: false,
		artist: false,
		track: false,
		genre: false,
	});

	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm.term);

		// Find the first true option and set the corresponding path property
		const trueOption = Object.keys(searchTerm.options).find((key) => searchTerm.options[key]);

		if (trueOption) {
			setPath(trueOption);
		}
	};

	const location = useLocation();
	const isSearchResultsPage =
		(location.pathname.startsWith('/search/') && location.pathname !== '/search/:query') ||
		location.pathname === '/new-records';

	return (
		<div className='App'>
			<Navbar />
			{!isSearchResultsPage && <Searchbar onSearch={handleSearch} />}

			<div id='content'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/new-records' element={<NewRecord />} />
					<Route path='/edit-artist/:id' element={<EditArtist />} />
					<Route path='/edit-album/:id' element={<EditAlbum />} />
					<Route path='/edit/track/:id' element={<EditTrack />} />
					<Route path='/search/:query' element={<SearchResults searchTerm={searchTerm} path={path} />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
