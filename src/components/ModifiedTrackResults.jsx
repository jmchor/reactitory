import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const SERVER = import.meta.env.VITE_API_URL;

function ModifiedTrackResults() {
	const [track, setTrack] = useState({});
	const navigate = useNavigate();
	const { track_id } = useParams();

	useEffect(() => {
		const fetchAlbumData = async () => {
			try {
				const res = await axios.get(`${SERVER}/tracks/${track_id}`);
				console.log(res.data.track);
				setTrack(res.data.track);
			} catch (error) {
				console.error(error);
			}
		};

		fetchAlbumData();
	}, [track_id]);

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

	if (track) {
		return (
			<div className='track-container'>
				<div className='headline-container'>
					<h2>Track</h2>
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
							<tr key={track.track_id}>
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
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
export default ModifiedTrackResults;
