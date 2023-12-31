import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

function ArtistResult({
	artist,
	allAlbums,
	currentAlbums,
	totalPages,
	currentPage,
	handlePageChange,
	modalOpen,
	selectedImage,
	handleCloseModal,
	handleOpenModal,
}) {
	const navigate = useNavigate();

	const handleEditArtist = (artistId) => {
		navigate(`/edit-artist/${artistId}`, { state: { artist } });
	};

	const handleEditAlbum = (albumid, album) => {
		navigate(`/edit-album/${albumid}`, { state: { album } });
	};

	return (
		<>
			<div className='container'>
				<div className='headline-container'>
					<h1>{artist.artist}</h1> <div className='backdrop'></div>
				</div>
				<div className='artist-content'>
					<div className='page-header'>
						<img className='artist-image' src={artist.image} alt='' />
						{artist.harddrive ? (
							<div className='headline-container'>
								<div className='harddrive'>
									<p>on harddrive</p>
									<div className='checkmark'>&#10004;</div>
									<button className='edit-button' onClick={() => handleEditArtist(artist.artist_id)}>
										&#9998;
									</button>
								</div>
								<div className='backdrop-smaller'></div>
							</div>
						) : (
							<div className='headline-container'>
								<div className='harddrive'>
									<p>on harddrive</p>
									<div className='crossmark'>&#10008;</div>
									<button className='edit-button' onClick={() => handleEditArtist(artist.artist_id)}>
										&#9998;
									</button>
								</div>
								<div className='backdrop-smaller'></div>
							</div>
						)}
					</div>
					<div className='genres-list'>
						<div className='headline-container'>
							<h2>Genres</h2>
							<div className='backdrop-smaller'></div>
						</div>
						{Array.isArray(artist.genres) && artist.genres.length > 0 ? (
							<ul className='genres-table'>
								{artist.genres.map((genre) => (
									<li key={genre} className='genre-item'>
										<div className='headline-container'>
											<p>{genre}</p>
											<div className='backdrop-smaller'></div>
										</div>
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
						<div className='headline-container'>
							{totalPages >= 1 && (
								<div id='pagination'>
									<button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
										&lArr;
									</button>
									<h2>Albums</h2>
									<button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
										&rArr;
									</button>
								</div>
							)}
							<div className='backdrop-smaller'></div>
						</div>
						{(Array.isArray(allAlbums) && allAlbums.length > 0) || totalPages > 1 ? (
							<>
								<table>
									<thead>
										<tr>
											<th>Name</th>
											<th>Image</th>
											<th>on harddrive</th>
										</tr>
									</thead>
									<tbody>
										{currentAlbums.map((album) => (
											<tr key={album.albumid}>
												<td>
													<a href={`/album/${album.albumid}`}>{album.albumName}</a>
												</td>
												<td>
													<img
														src={album.image}
														alt=''
														style={{ width: '120px', height: '120px', cursor: 'pointer' }}
														onClick={() => handleOpenModal(album.image)}
													/>
												</td>
												<td>
													{album.harddrive ? (
														<div className='harddrive'>
															<div className='checkmark'>&#10003;</div>
															<button className='edit-button' onClick={() => handleEditAlbum(album.albumid, album)}>
																&#9998;
															</button>
														</div>
													) : (
														<div className='harddrive'>
															<div className='crossmark'>&#9747;</div>
															<button className='edit-button' onClick={() => handleEditAlbum(album.albumid, album)}>
																&#9998;
															</button>
														</div>
													)}
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
					<Modal isOpen={modalOpen} imageUrl={selectedImage} onClose={handleCloseModal} />
				</div>
			</div>
		</>
	);
}

export default ArtistResult;
