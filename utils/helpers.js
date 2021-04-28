import { API_URL } from './constants';

export function sortMovies(arr, type) {
	const magnitude = type === 'a' ? 1 : -1;
	arr.sort((x, y) => (parseInt(x.Year) - parseInt(y.Year)) * magnitude);
}

export async function getMovieById(id) {
	const response = await fetch(
		`${API_URL}/?i=${id}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
	);
	const d = await response.json();

	return d;
}
