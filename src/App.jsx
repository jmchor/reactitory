import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NewRecord from './pages/NewRecord';
import EditArtist from './pages/editPages/EditArtist';
import EditAlbum from './pages/editPages/EditAlbum';
import EditTrack from './pages/editPages/EditTrack';
import SearchResults from './pages/SearchResults';
import AlterRecords from './pages/AlterRecords';

const App = () => {
	return (
		<div className='App'>
			<Navbar />
			<div id='content'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/new-records' element={<NewRecord />} />
					<Route path='/alter-records' element={<AlterRecords />} />
					<Route path='/edit-artist/:id' element={<EditArtist />} />
					<Route path='/edit-album/:id' element={<EditAlbum />} />
					<Route path='/edit/track/:id' element={<EditTrack />} />
					<Route path='/search' element={<SearchResults />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
