/* eslint-disable no-case-declarations */

import { useLocation } from 'react-router-dom';

import AlbumResult from '../components/AlbumResult';
import AllArtists from '../components/AllArtists';
import GenreResults from '../components/GenreResults';
import AllGenres from '../components/AllGenres';
import TrackResults from '../components/TrackResults';

function SearchResults({
	searchTerm,
	path,
	formatReleaseYear,
	handleCloseModal,
	handleOpenModal,
	modalOpen,
	selectedImage,
	albumData,
	tracksData,
	genres,
	currentPage,
	currentItems,
	allItems,
	totalPages,
	handlePageChange,
	errorMessage,
}) {
	const location = useLocation();
	const { editMessage } = location.state || {};

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
