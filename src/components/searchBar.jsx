import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Searchbar({ onSearch }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchOptions, setSearchOptions] = useState({
		searchAlbum: false,
		searchArtist: false,
		searchTrack: false,
		searchGenre: false,
	});

	const navigate = useNavigate();

	const handleSearch = () => {
		// Split the searchTerm by commas
		const queries = searchTerm.split(',').map((query) => query.trim());

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

		console.log(query);

		// Call the onSearch callback with the constructed query
		onSearch(query);
		setSearchTerm('');

		// Update the URL based on the number of query items
		if (queries.length === 1) {
			navigate(`/search/${encodeURIComponent(queries[0])}`);
		} else if (queries.length > 1) {
			navigate(`/search/multiple`);
		}
	};

	return (
		<>
			<div className='search-area'>
				<div className='search-bar-container'>
					<input
						className='search-input'
						type='text'
						placeholder='Search...'
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

export default Searchbar;
