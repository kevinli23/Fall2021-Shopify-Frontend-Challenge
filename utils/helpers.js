// Sort the movies based on type (a for ascending d for descending)
export function sortMovies(arr, type) {
	const magnitude = type === 'a' ? 1 : -1;
	arr.sort((x, y) => (parseInt(x.Year) - parseInt(y.Year)) * magnitude);
}

// Get the movie by calling the next js api wrapper of the omdb api
export async function getMovieById(id) {
	const response = await fetch(`/api/movieById/${id}`);
	const d = await response.json();
	return d;
}

// Get the list of movies by calling the next js api wrapper of the omdb api
export async function getMovieBySearch(query, page) {
	const response = await fetch(`/api/movieBySearch/${query}/${page}`);
	const d = await response.json();
	return d;
}
