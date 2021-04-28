export function sortMovies(arr, type) {
	const magnitude = type === 'a' ? 1 : -1;
	arr.sort((x, y) => (parseInt(x.Year) - parseInt(y.Year)) * magnitude);
}

export async function getMovieById(id) {
	const response = await fetch(`/api/movieById/${id}`);
	const d = await response.json();
	return d;
}

export async function getMovieBySearch(query, page) {
	const response = await fetch(`/api/movieBySearch/${query}/${page}`);
	const d = await response.json();
	return d;
}
