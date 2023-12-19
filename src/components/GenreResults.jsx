function GenreResults({ genres, searchTerm }) {
	return (
		<div>
			<div className='headline-container'>
				<div className='headline-box'>
					<h2>Artists with this Genre</h2>
				</div>
				<div className='backdrop-smaller'></div>
			</div>

			{Array.isArray(genres) && genres.length > 0 ? (
				<ul className='genres-table' id='artists'>
					{genres.map((genre) => (
						<li key={genre.artist_id} className='genre-item'>
							<p>
								<a href={`/artist/${genre.artist_id}`}>{genre.artist}</a>
							</p>
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
