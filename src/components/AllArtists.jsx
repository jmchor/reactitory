import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

function AllArtists({
	allArtists,
	currentArtists,
	totalPages,
	currentPage,
	handlePageChange,
	modalOpen,
	selectedImage,
	handleCloseModal,
	handleOpenModal,
}) {
	const navigate = useNavigate();

	const handleEditArtist = (artistId, artist) => {
		navigate(`/edit-artist/${artistId}`, { state: { artist } });
	};

	console.log(currentArtists);

	{
		return (
			<div className='table-container'>
				<div className='albums-table'>
					<div className='headline-container'>
						{totalPages > 1 && (
							<div id='pagination'>
								<button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
									&lArr;
								</button>
								<h2>Artists</h2>
								<button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
									&rArr;
								</button>
							</div>
						)}
						<div className='backdrop-smaller'></div>
					</div>
					{Array.isArray(allArtists) && allArtists.length > 0 ? (
						<>
							<table>
								<thead>
									<tr>
										<th>Name</th>
										<th>Image</th>
										<th>genres</th>
										<th>on harddrive</th>
									</tr>
								</thead>
								<tbody>
									{currentArtists.map((artist) => (
										<tr key={artist.artist_id}>
											<td>
												<a href={`/artist/${artist.artist_id}`}>{artist.artist}</a>
											</td>
											<td>
												<img
													src={artist.image}
													alt=''
													style={{ width: '120px', height: '120px', cursor: 'pointer' }}
													onClick={() => handleOpenModal(artist.image)}
												/>
											</td>
											<td>
												{Array.isArray(artist.genres) && artist.genres.length > 0 ? (
													<ul>
														<li>{artist.genres.join(', ')}</li>
													</ul>
												) : (
													<p>No genres available for this artist.</p>
												)}
											</td>
											<td>
												{artist.harddrive ? (
													<div className='harddrive'>
														<div className='checkmark'>&#10003;</div>
														<button className='edit-button' onClick={() => handleEditArtist(artist.artist_id, artist)}>
															&#9998;
														</button>
													</div>
												) : (
													<div className='harddrive'>
														<div className='crossmark'>&#9747;</div>
														<button className='edit-button' onClick={() => handleEditArtist(artist.artist_id, artist)}>
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
						<p>{allArtists.length === 0 ? 'No artist available for this reuqest.' : 'Loading artists...'}</p>
					)}
				</div>
				<Modal isOpen={modalOpen} imageUrl={selectedImage} onClose={handleCloseModal} />
			</div>
		);
	}
}

export default AllArtists;
