export function sortMovies(arr, type) {
	const magnitude = type === 'a' ? 1 : -1;
	arr.sort((x, y) => (parseInt(x.Year) - parseInt(y.Year)) * magnitude);
}
