import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const SERVER = import.meta.env.VITE_API_URL;
import Modal from './Modal';

function ModifiedArtistResult({ handleCloseModal, handleOpenModal, modalOpen, selectedImage, itemsPerPage }) {
	const [artist, setArtist] = useState({});
	const [allAlbums, setAllAlbums] = useState([]);
	const [currentAlbums, setCurrentAlbums] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [genres, setGenres] = useState([]);
	const [onHarddrive, setOnHarddrive] = useState(false);
	const [image, setImage] = useState({});
	const [success, setSuccess] = useState(false);

	const { artist_id } = useParams();

	useEffect(() => {
		const fetchAlbumData = async () => {
			try {
				const res = await axios.get(`${SERVER}/artists/${artist_id}`);
				setSuccess(true);
				setArtist(res.data.response.artist);
				setAllAlbums(res.data.response.albums);
				setCurrentAlbums(res.data.response.albums.slice(0, itemsPerPage));
				setGenres(res.data.response.genres);
				setOnHarddrive(res.data.response.harddrive);
				setImage(res.data.response.image);
				setSuccess(true);
			} catch (error) {
				console.error(error);
			}
		};

		fetchAlbumData();
	}, [artist_id]);

	console.log('HERE');
	const handlePageChange = (pageNumber) => {
		const indexOfLastItem = pageNumber * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		const itemsToDisplay = allAlbums.slice(indexOfFirstItem, indexOfLastItem);

		setCurrentAlbums(itemsToDisplay);
		setCurrentPage(pageNumber);
	};

	const totalPages = Math.ceil(allAlbums.length / itemsPerPage);

	const navigate = useNavigate();

	const handleEditArtist = (artistId) => {
		navigate(`/edit-artist/${artistId}`, { state: { artist } });
	};

	const handleEditAlbum = (albumid, album) => {
		navigate(`/edit-album/${albumid}`, { state: { album } });
	};

	if (success) {
		return (
			<>
				<div className='container'>
					<div className='headline-container'>
						<h1>{artist}</h1> <div className='backdrop'></div>
					</div>
					<div className='artist-content'>
						<div className='page-header'>
							<img className='artist-image' src={image} alt='' />
							{onHarddrive ? (
								<div className='headline-container'>
									<div className='harddrive'>
										<p>on harddrive</p>
										<div className='checkmark'>&#10004;</div>
										<button className='edit-button' onClick={() => handleEditArtist(artist_id)}>
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
										<button className='edit-button' onClick={() => handleEditArtist(artist_id)}>
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
							{Array.isArray(genres) && genres.length > 0 ? (
								<ul className='genres-table'>
									{genres.map((genre) => (
										<li key={genre} className='genre-item'>
											<div className='headline-container'>
												<p>{genre}</p>
												<div className='backdrop-smaller'></div>
											</div>
										</li>
									))}
								</ul>
							) : (
								<p>{genres ? 'Loading genres...' : 'No genres available for this artist.'}</p>
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
}

export default ModifiedArtistResult;
