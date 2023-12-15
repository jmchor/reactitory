import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import SearchBar from './components/searchBar';
import NewRecord from './pages/NewRecord';
import EditArtist from './pages/editPages/EditArtist';
import EditAlbum from './pages/editPages/EditAlbum';
import EditTrack from './pages/editPages/EditTrack';
import SearchResults from './pages/SearchResults';
import AlterRecords from './pages/AlterRecords';
import AlternateResults from './pages/AlternateResults';

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

	return (
		<div className='App'>
			<Navbar />
			<SearchBar onSearch={handleSearch} />

			<div id='content'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/new-records' element={<NewRecord />} />
					<Route path='/alter-records' element={<AlterRecords />} />
					<Route path='/edit-artist/:id' element={<EditArtist />} />
					<Route path='/edit-album/:id' element={<EditAlbum />} />
					<Route path='/edit/track/:id' element={<EditTrack />} />
					<Route path='/search/:query' element={<SearchResults searchTerm={searchTerm} path={path} />} />
					{/* <Route path='/search/' element={<AlternateResults />} /> */}
				</Routes>
			</div>
		</div>
	);
};

export default App;
