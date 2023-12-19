import axios from 'redaxios';
const SERVER = import.meta.env.VITE_API_URL;

function TrackResults({ tracks }) {
	const handleButtonClick = async (trackId) => {
		try {
			// Make a POST request to update the YouTube URL for the specific track
			const response = await axios.post(`${SERVER}/ytupdate/single-track/${trackId}`);

			if (response.data.success) {
				console.log('YouTube URL updated for track:', response.data.track);
				window.history.go(-1);

				setTimeout(() => {
					window.history.go(1);
				}, 1000);

				// You can add any further logic here, such as updating the state
			} else {
				console.error('Failed to update YouTube URL:', response.data.error);
			}
		} catch (error) {
			console.error('Error updating YouTube URL:', error.message);
		}
	};

	if (Array.isArray(tracks)) {
		return (
			<div className='track-container'>
				<div className='headline-container'>
					<div className='headline-box'>
						<h2>Tracks</h2>
					</div>
					<div className='backdrop-smaller'></div>
				</div>

				<div className='tracks-table' id='for-tracks'>
					<table>
						<thead>
							<tr>
								<th>Album</th>
								<th>Artist</th>
								<th>Track</th>
								<th>Duration</th>
								<th>YouTube URL</th>
							</tr>
						</thead>
						<tbody>
							{tracks.map((track, index) => (
								<tr key={index}>
									<td>{track.album}</td>
									<td>{track.artist}</td>
									<td>{track.track}</td>
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
				</div>
			</div>
		);
	}
}
export default TrackResults;
