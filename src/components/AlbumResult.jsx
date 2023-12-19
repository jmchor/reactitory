import { useNavigate } from 'react-router-dom';

function AlbumResult({ album, formatReleaseYear }) {
	const navigate = useNavigate();

	const handleEditAlbum = (albumId, album) => {
		navigate(`/edit-album/${albumId}`, { state: { album } });
	};

	const handleButtonClick = async (track_id) => {
		try {
			// Make a POST request to update the YouTube URL for the specific track
			const response = await axios.post(`${SERVER}/ytupdate/single-track/${track_id}`);

			if (response.data.success) {
				console.log('YouTube URL updated for track:', response.data.track);

				setTimeout(() => {
					// Go back in history
					navigate(`/album/${track.albumid}`);
				}, 1000);

				// You can add any further logic here, such as updating the state
			} else {
				console.error('Failed to update YouTube URL:', response.data.error);
			}
		} catch (error) {
			console.error('Error updating YouTube URL:', error.message);
		}
	};

	return (
		<div className='artist-content'>
			<>
				<div className='page-header'>
					<div className='headline-container'>
						<h1 id='album-head'>{album.albumname}</h1>
						<div className='backdrop'></div>
					</div>
					<div className='headline-container' id='album-artist'>
						<h3>{album.artist}</h3>
						<div className='backdrop-smaller'></div>
					</div>
					{album.harddrive ? (
						<div className='headline-container'>
							<div className='harddrive'>
								<p>on harddrive</p>
								<div className='checkmark'>&#10003;</div>
								<button className='edit-button' onClick={() => handleEditAlbum(album.albumid, album)}>
									&#9998;
								</button>
							</div>
							<div className='backdrop-smaller'></div>
						</div>
					) : (
						<div className='headline-container'>
							<div className='harddrive'>
								<p>on harddrive</p>
								<div className='crossmark'>&#9747;</div>
								<button className='edit-button' onClick={() => handleEditAlbum(album.albumid, album)}>
									&#9998;
								</button>
							</div>
							<div className='backdrop-smaller'></div>
						</div>
					)}

					<h5>Released in {formatReleaseYear(album.releasedate)}</h5>
					<img className='artist-image' src={album.image} alt='' />
				</div>

				<div className='table-container'>
					<div className='tracks-table'>
						<div className='headline-container' id='track-list'>
							<h3>Tracks</h3>
							<div className='backdrop-smaller'></div>
						</div>

						{Array.isArray(album.tracklist) && album.tracklist.length > 0 ? (
							<table>
								<thead>
									<tr>
										<th>Name</th>
										<th>Duration</th>
										<th>Youtube URL</th>
									</tr>
								</thead>
								<tbody>
									{album.tracklist.map((track) => (
										<tr key={track.track_id}>
											<td>
												<a href={`/track/${track.track_id}`}>{track.track}</a>
											</td>
											<td>{track.duration}</td>
											<td>
												{track.youtube_url ? (
													<a href={track.youtube_url} target='_blank' rel='noopener noreferrer'>
														Watch on YouTube
													</a>
												) : (
													<button className='yt-button' onClick={() => handleButtonClick(track.track_id)}>
														Add YouTube URL
													</button>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p>No tracks available for this album.</p>
						)}
					</div>
				</div>
			</>
		</div>
	);
}

export default AlbumResult;
