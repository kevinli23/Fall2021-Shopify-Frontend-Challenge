import { API_URL } from '../../../utils/constants';

export default async (req, res) => {
	const { id } = req.query;
	const response = await fetch(
		`${API_URL}/?i=${id}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
	);
	const d = await response.json();

	res.status(200).json(d);
};
