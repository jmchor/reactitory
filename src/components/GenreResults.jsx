function GenreResults({ genres, searchTerm }) {
	return (
		<div>
			<div className='headline-container'>
				<h2>Artists with this Genre</h2>
				<div className='backdrop-smaller'></div>
			</div>

			{Array.isArray(genres) && genres.length > 0 ? (
				<ul className='genres-table'>
					{genres.map((genre) => (
						<li key={genre.artist_id} className='genre-item'>
							<div className='headline-container'>
								<p>
									<a href={`/artist/${genre.artist_id}`}>{genre.artist}</a>
								</p>
								<div className='backdrop-genres'></div>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p>{searchTerm} genre not found</p>
			)}
		</div>
	);
}

export default GenreResults;
