function TrackResults({ track }) {
	return (
		<div className='track-container'>
			<div className='headline-container'>
				<h2>{track.track}</h2>
				<div className='backdrop-smaller'></div>
			</div>

			<div className='tracks-table' id='for-tracks'>
				<table>
					<thead>
						<tr>
							<th>Album</th>
							<th>Artist</th>
							<th>Duration</th>
							<th>YouTube URL</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{track.album}</td>
							<td>{track.artist}</td>
							<td>{track.duration}</td>
							<td>{track.youtube_url || '---'}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default TrackResults;
