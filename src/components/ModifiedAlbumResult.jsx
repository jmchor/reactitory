import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'redaxios';
const SERVER = import.meta.env.VITE_API_URL;

function ModifiedAlbumResult({ formatReleaseYear, albumData: propAlbum }) {
	const navigate = useNavigate();
	const { albumid: routeAlbumId } = useParams();
	const [album, setAlbum] = useState(propAlbum);

	const handleEditAlbum = (albumId, album) => {
		navigate(`/edit-album/${albumId}`, { state: { album } });
	};

	useEffect(() => {
		const fetchAlbumData = async () => {
			try {
				if (!album) {
					const res = await axios.get(`${SERVER}/albums/${routeAlbumId}`);
					setAlbum(res.data.albumData);
				}
			} catch (error) {
				console.error(error);
			}
		};

		if (!album) {
			fetchAlbumData();
		}
	}, [album, routeAlbumId]);

	if (album) {
		return (
			<div className='artist-content'>
				<>
					<div className='page-header'>
						<div className='headline-container'>
							<h1 id='album-head'>{album.albumname}</h1>
							<div className='backdrop'></div>
						</div>
						<div className='headline-container' id='album-artist'>
							<div className='headline-box'>
								<h3>{album.artist}</h3>
							</div>
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
														<p>---</p>
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
}

export default ModifiedAlbumResult;
