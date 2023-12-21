import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function SearchBar({ onSearch }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchOptions, setSearchOptions] = useState({
		searchAlbum: false,
		searchArtist: true,
		searchTrack: false,
		searchGenre: false,
	});

	const navigate = useNavigate();

	const generateUniqueId = () => {
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
	};

	const handleSearch = () => {
		// Generate a unique ID for the search process
		const searchId = generateUniqueId();

		// Split the searchTerm by commas
		const queries = searchTerm.split('AND').map((query) => query.trim());

		// Construct the search query based on the selected checkboxes and queries
		const query = {
			term: queries,
			options: {
				album: searchOptions.searchAlbum,
				artist: searchOptions.searchArtist,
				track: searchOptions.searchTrack,
				genre: searchOptions.searchGenre,
			},
		};

		// Call the onSearch callback with the constructed query and the search ID
		onSearch({ ...query, searchId });
		setSearchTerm('');

		// Update the URL with the search ID
		navigate(`/search/${encodeURIComponent(queries.join('-'))}/${searchId}`);
	};

	return (
		<>
			<div className='search-area'>
				<div className='search-bar-container'>
					<input
						className='search-input'
						type='text'
						placeholder='artist AND track, album, artist, all...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button className='search-button' onClick={handleSearch}>
						Search
					</button>
				</div>
				<div className='checkbox-options'>
					<label className='checkbox-label'>
						Album
						<input
							type='checkbox'
							checked={searchOptions.searchAlbum}
							onChange={() =>
								setSearchOptions((prevOptions) => ({ ...prevOptions, searchAlbum: !prevOptions.searchAlbum }))
							}
						/>
					</label>
					<label className='checkbox-label'>
						Artist
						<input
							type='checkbox'
							checked={searchOptions.searchArtist}
							onChange={() =>
								setSearchOptions((prevOptions) => ({ ...prevOptions, searchArtist: !prevOptions.searchArtist }))
							}
						/>
					</label>
					<label className='checkbox-label'>
						Track
						<input
							type='checkbox'
							checked={searchOptions.searchTrack}
							onChange={() =>
								setSearchOptions((prevOptions) => ({ ...prevOptions, searchTrack: !prevOptions.searchTrack }))
							}
						/>
					</label>
					<label className='checkbox-label'>
						Genre
						<input
							type='checkbox'
							checked={searchOptions.searchGenre}
							onChange={() =>
								setSearchOptions((prevOptions) => ({ ...prevOptions, searchGenre: !prevOptions.searchGenre }))
							}
						/>
					</label>
				</div>
			</div>
		</>
	);
}

export default SearchBar;

SearchBar.propTypes = {
	onSearch: PropTypes.func.isRequired,
};
