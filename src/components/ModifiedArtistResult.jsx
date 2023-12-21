import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'redaxios';
import Modal from './Modal';
import PropTypes from 'prop-types';

const SERVER = import.meta.env.VITE_API_URL;

function ModifiedArtistResult({
	handleCloseModal,
	handleOpenModal,
	modalOpen,
	selectedImage,
	currentPage: propCurrentPage,
	allItems: propAllItems,
	currentItems: propCurrentItems,
	totalPages: propTotalPages,
	artist: propArtist,
	itemsPerPage,
}) {
	const [artist, setArtist] = useState(propArtist);
	const [allItems, setAllItems] = useState(propAllItems);
	const [currentItems, setCurrentItems] = useState(propCurrentItems);
	const [totalPages, setTotalPages] = useState(propTotalPages);
	const [currentPage, setCurrentPage] = useState(propCurrentPage);
	const navigate = useNavigate();
	const { artist_id: routeArtistId } = useParams();

	const handleEditArtist = (artistId) => {
		navigate(`/edit-artist/${artistId}`, { state: { artist } });
	};

	const handleEditAlbum = (albumid, album) => {
		navigate(`/edit-album/${albumid}`, { state: { album } });
	};
	const handlePageChange = (pageNumber) => {
		const indexOfLastItem = pageNumber * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		const itemsToDisplay = allItems.slice(indexOfFirstItem, indexOfLastItem);

		setCurrentItems(itemsToDisplay);
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		const fetchArtistData = async () => {
			try {
				console.log('HELLO!');
				const res = await axios.get(`${SERVER}/artists/${routeArtistId}`);
				setArtist(res.data.response);
				setAllItems(res.data.response.albums);
				setCurrentItems(res.data.response.albums.slice(0, itemsPerPage));
				setTotalPages(Math.ceil(allItems.length / itemsPerPage));
			} catch (error) {
				console.error(error);
			}
		};

		if (!artist || artist.artist_id !== routeArtistId || totalPages === 0) {
			fetchArtistData();
		}
	}, [routeArtistId, artist]);

	console.log(currentPage);

	if (artist) {
		return (
			<>
				<div className='container'>
					<div className='border-container'>
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
									<div className='headline-box'>
										<h2>Genres</h2>
									</div>
									<div className='backdrop-smaller'></div>
								</div>
								{Array.isArray(artist.genres) && artist.genres.length > 0 ? (
									<ul className='genres-table'>
										{artist.genres.map((genre) => (
											<li key={genre} className='genre-item'>
												<p>{genre}</p>
											</li>
										))}
									</ul>
								) : (
									<p>{artist.genres ? 'Loading genres...' : 'No genres available for this artist.'}</p>
								)}
							</div>
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
										<div className='headline-box'>
											<h2>Albums</h2>
										</div>
										<button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
											&rArr;
										</button>
									</div>
								)}
								<div className='backdrop-smaller'></div>
							</div>
							{(Array.isArray(allItems) && allItems.length > 0) || totalPages > 1 ? (
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
											{currentItems.map((album) => (
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
								<p>{allItems.length === 0 ? 'No albums available for this artist.' : 'Loading albums...'}</p>
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

ModifiedArtistResult.propTypes = {
	handleCloseModal: PropTypes.func,
	handleOpenModal: PropTypes.func,
	modalOpen: PropTypes.bool,
	selectedImage: PropTypes.string,
	currentPage: PropTypes.number,
	allItems: PropTypes.array,
	currentItems: PropTypes.array,
	totalPages: PropTypes.number,
	artist: (PropTypes.shape = {
		artist: PropTypes.string,
		harddrive: PropTypes.bool,
		image: PropTypes.string,
		artist_id: PropTypes.string,
		gernres: PropTypes.array,
	}),
	itemsPerPage: PropTypes.number,
};
