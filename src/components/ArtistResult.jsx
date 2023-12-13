import React from 'react';

function ArtistResult({ artist, allAlbums, currentAlbums, totalPages, currentPage, handlePageChange }) {
	return (
		<>
			<div className='artist-content'>
				<div className='page-header'>
					<h2>{artist.artist}</h2>
					<img className='artist-image' src={artist.image} alt='' />
					<div className='genres-list'>
						<h4>Genres</h4>
						{Array.isArray(artist.genres) && artist.genres.length > 0 ? (
							<ul className='genres-table'>
								{artist.genres.map((genre, index) => (
									<li key={genre} className='genre-item'>
										{genre}
									</li>
								))}
							</ul>
						) : (
							<p>{artist.genres ? 'Loading genres...' : 'No genres available for this artist.'}</p>
						)}
					</div>
				</div>

				<div className='table-container'>
					<div className='albums-table'>
						<h3>Albums</h3>

						{Array.isArray(allAlbums) && allAlbums.length > 0 ? (
							<>
								<table>
									<thead>
										<tr>
											<th>Name</th>
											<th>Image</th>
										</tr>
									</thead>
									<tbody>
										{currentAlbums.map((album) => (
											<tr key={album.albumId}>
												<td>{album.albumName}</td>
												<td>
													<img src={album.image} alt='' style={{ width: '100px', height: '100px' }} />
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</>
						) : (
							<p>{allAlbums.length === 0 ? 'No albums available for this artist.' : 'Loading albums...'}</p>
						)}
					</div>
					{totalPages > 1 && (
						<div id='pagination'>
							<button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
								Back
							</button>
							<span>{currentPage}</span>
							<button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
								Next
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default ArtistResult;
