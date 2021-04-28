import { API_URL } from '../../../utils/constants';

export default async (req, res) => {
	const { search } = req.query;
	const response = await fetch(
		`${API_URL}/?s=${search[0]}&page=${search[1]}&type=movie&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
	);
	const d = await response.json();

	res.status(200).json(d);
};
