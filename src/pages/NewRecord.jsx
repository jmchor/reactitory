import { useState } from 'react';
import axios from 'axios';
const SERVER = import.meta.env.VITE_API_URL;

function NewRecord() {
	const [name, setName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		submitRecord(name);
	};

	const submitRecord = async (name) => {
		console.log(name);
		// try {
		// 	const res = await axios.post(`${SERVER}/catchall/${name}`, name);
		// 	console.log(res);
		// } catch (err) {
		// 	console.error(err);
		// }
	};

	return (
		<div>
			<h1>Create new records here!</h1>
			<p>It's as easy as putting the name in the input field below and hit "CREATE"</p>

			<form onSubmit={handleSubmit}>
				<label htmlFor='name'>Name</label>
				<input type='text' id='name' name='name' value={name} onChange={(e) => setName(e.target.value)} />
				<button type='submit'>CREATE</button>
			</form>

			<p>
				Or you can go back to the <a href='/'>home page</a>
			</p>
		</div>
	);
}

export default NewRecord;

// after subbmitting the form, wait a bit and then basically do exactly what the search results page does
