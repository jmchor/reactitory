function AllGenres({ genres }) {
	// Use Set to filter out duplicate genres
	let uniqueGenres = [...new Set(genres)];

	return (
		<>
			<div className='headline-container'>
				<div className='headline-box'>
					<h2>Genres</h2>
				</div>
				<div className='backdrop-smaller'></div>
			</div>

			{Array.isArray(uniqueGenres) && uniqueGenres.length > 0 ? (
				<ul className='genres-table' id='artists'>
					{uniqueGenres.map((genre) => (
						<li key={genre} className='genre-item'>
							<p>{genre}</p>
						</li>
					))}
				</ul>
			) : (
				<p>Nothing found</p>
			)}
		</>
	);
}

export default AllGenres;
