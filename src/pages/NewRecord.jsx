import React from 'react';

function NewRecord() {
	return (
		<div>
			<h1>Create new records here!</h1>
			<p>It's as easy as putting the name in the input field below and hit "CREATE"</p>

			<form>
				<label htmlFor='name'>Name</label>
				<input type='text' id='name' name='name' />
				<button type='submit'>CREATE</button>
			</form>

			<p>
				Or you can go back to the <a href='/'>home page</a>
			</p>
		</div>
	);
}

export default NewRecord;
