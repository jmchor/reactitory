function AllGenres({ genres, searchTerm }) {
	return (
		<>
			<div className='headline-container'>
				<h2>All Genres (like, ALL of them!)</h2>
				<div className='backdrop-smaller'></div>
			</div>

			{Array.isArray(genres) && genres.length > 0 ? (
				<ul className='genres-table'>
					{genres.map((genre) => (
						<li key={genre} className='genre-item'>
							<div className='headline-container'>
								<p>{genre}</p>
								<div className='backdrop-genres'></div>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p>
					{searchTerm} genre
					{searchTerm.endsWith('s') ? '' : 's'}
				</p>
			)}
		</>
	);
}

export default AllGenres;
