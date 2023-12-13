import { useState } from 'react';

function SearchBar({ onSearch }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchOptions, setSearchOptions] = useState({
		searchAlbum: false,
		searchArtist: false,
		searchTrack: false,
		searchGenre: false,
	});

	const handleSearch = () => {
		// Construct the search query based on the selected checkboxes
		const query = {
			term: searchTerm,
			options: {
				album: searchOptions.searchAlbum,
				artist: searchOptions.searchArtist,
				track: searchOptions.searchTrack,
				genre: searchOptions.searchGenre,
			},
		};

		// Call the onSearch callback with the constructed query
		onSearch(query);
	};

	return (
		<div>
			<input type='text' placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			<label>
				Album
				<input
					type='checkbox'
					checked={searchOptions.searchAlbum}
					onChange={() =>
						setSearchOptions((prevOptions) => ({
							...prevOptions,
							searchAlbum: !prevOptions.searchAlbum,
						}))
					}
				/>
			</label>
			<label>
				Artist
				<input
					type='checkbox'
					checked={searchOptions.searchArtist}
					onChange={() =>
						setSearchOptions((prevOptions) => ({
							...prevOptions,
							searchArtist: !prevOptions.searchArtist,
						}))
					}
				/>
			</label>
			<label>
				Track
				<input
					type='checkbox'
					checked={searchOptions.searchTrack}
					onChange={() =>
						setSearchOptions((prevOptions) => ({
							...prevOptions,
							searchTrack: !prevOptions.searchTrack,
						}))
					}
				/>
			</label>
			<label>
				Genre
				<input
					type='checkbox'
					checked={searchOptions.searchGenre}
					onChange={() =>
						setSearchOptions((prevOptions) => ({
							...prevOptions,
							searchGenre: !prevOptions.searchGenre,
						}))
					}
				/>
			</label>
			<button onClick={handleSearch}>Search</button>
		</div>
	);
}

export default SearchBar;
