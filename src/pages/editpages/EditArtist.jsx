import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const SERVER = import.meta.env.VITE_API_URL;
import { TextField, Checkbox, FormControlLabel, InputLabel, Input, Button, Box } from '@mui/material';

function EditArtist() {
	const location = useLocation();
	const { artist } = location.state || {};
	const navigate = useNavigate();

	const [editedArtist, setEditedArtist] = useState({
		artistName: artist.artist || '',
		onHarddrive: artist.harddrive || false,
		genres: artist.genres || [],
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditedArtist((prevArtist) => ({
			...prevArtist,
			[name]: value,
		}));
	};

	const handleCheckboxChange = (e) => {
		const { name, checked } = e.target;
		setEditedArtist((prevArtist) => ({
			...prevArtist,
			[name]: checked,
		}));
	};

	const handleGenresChange = (e) => {
		const { value } = e.target;
		setEditedArtist((prevArtist) => ({
			...prevArtist,
			genres: value.split(',').map((genre) => genre.trim()),
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		submitArtist(editedArtist, artist.artist_id);
		navigate(-1, { state: { editMessage: message } });
	};

	let message;

	if (editedArtist.onHarddrive) {
		message = 'Updated database, artist added to harddrive';
	} else {
		message = 'Updated database, artist removed from harddrive';
	}

	const submitArtist = async (editedArtist, id) => {
		try {
			const res = await axios.put(`${SERVER}/edit/artist/${id}`, editedArtist);
			console.log(res);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className='edit-box'>
			<h2>Now editing: {artist.artist}</h2>
			<form className='artist-edit-form'>
				<TextField
					label='Artist Name'
					type='text'
					name='artistName'
					value={editedArtist.artistName}
					onChange={handleChange}
					fullWidth
				/>

				<FormControlLabel
					control={
						<Checkbox name='onHarddrive' checked={editedArtist.onHarddrive || false} onChange={handleCheckboxChange} />
					}
					label='On Harddrive'
				/>

				<TextField
					label='Genres (comma-separated)'
					type='text'
					name='genres'
					value={editedArtist.genres.join(', ')}
					onChange={handleGenresChange}
					fullWidth
				/>
			</form>
			<button className='search-button' type='submit' onClick={handleSubmit}>
				Save Changes
			</button>
		</div>
	);
}

export default EditArtist;
