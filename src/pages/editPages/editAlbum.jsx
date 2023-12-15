import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const SERVER = import.meta.env.VITE_API_URL;

function EditAlbum() {
	const location = useLocation();
	const { album } = location.state || {};
	const navigate = useNavigate();

	const [editedAlbum, setEditedAlbum] = useState({
		onHarddrive: album.harddrive || false,
	});

	const handleCheckboxChange = (e) => {
		const { name, checked } = e.target;
		setEditedAlbum((prevAlbum) => ({
			...prevAlbum,
			[name]: checked,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(editedAlbum);
		submitAlbum(editedAlbum, album.albumid);
		navigate(-1, { state: { editMessage: message } });
	};

	let message;
	if (editedAlbum.onHarddrive) {
		message = 'Updated database, album added to harddrive';
	} else {
		message = 'Updated database, album removed from harddrive';
	}

	const submitAlbum = async (editedAlbum, id) => {
		try {
			const res = await axios.put(`${SERVER}/edit/album/${id}`, editedAlbum);
			console.log(res);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className='edit-box'>
			<h2>
				Now editing: {album.albumName} {album.albumname}
			</h2>
			<form>
				<label>
					On Harddrive:
					<input
						type='checkbox'
						name='onHarddrive'
						checked={editedAlbum.onHarddrive || false}
						onChange={handleCheckboxChange}
					/>
				</label>
			</form>
			<button className='search-button' type='submit' onClick={handleSubmit}>
				Save Changes
			</button>
		</div>
	);
}

export default EditAlbum;
