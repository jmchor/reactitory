function AllGenres({ genres }) {
	// Use Set to filter out duplicate genres
	let uniqueGenres = [...new Set(genres)];

	return (
		<>
			<div className='headline-container'>
				<h2>All Genres (like, ALL of them!)</h2>
				<div className='backdrop-smaller'></div>
			</div>

			{Array.isArray(uniqueGenres) && uniqueGenres.length > 0 ? (
				<ul className='genres-table'>
					{uniqueGenres.map((genre) => (
						<li key={genre} className='genre-item'>
							<div className='headline-container'>
								<p>{genre}</p>
								<div className='backdrop-genres'></div>
							</div>
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
