import React, { useState, useEffect } from 'react';
import { useQueryStore } from '../../utils/store';
import { Box, Text, Link, Wrap, WrapItem, Select } from '@chakra-ui/react';
import { COLORS } from '../../utils/constants';
import MovieEntry from './MovieEntry';
import Loader from '../Loader';
import { sortMovies } from '../../utils/helpers';
import LandingPage from '../LandingPage';

const OmbdDisplay = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalResults, setTotalResults] = useState(0);
	const { query, sorting, setSorting } = useQueryStore();

	useEffect(() => {
		if (sorting) {
			sortMovies(movies, sorting);
			setMovies([...movies]);
		}
	}, [sorting]);

	console.log(movies, sorting);

	useEffect(() => {
		if (query) {
			(async () => {
				setLoading(true);
				setMovies([]);
				var page = 1;
				var moviesAcc = [];
				var ids = [];
				while (true) {
					const response = await fetch(
						`https://www.omdbapi.com/?s=${query}&type=movie&page=${page}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
					);
					const data = await response.json();
					if (data.Response === 'False') {
						break;
					}
					page += 1;
					for (var m in data.Search) {
						var mov = data.Search[m];
						if (!ids.includes(mov.imdbID)) {
							moviesAcc.push(mov);
							ids.push(mov.imdbID);
						}
					}
				}
				setMovies(moviesAcc);
				setTotalResults(moviesAcc.length);
				setLoading(false);
			})();
		}
	}, [query]);

	if (loading) {
		return (
			<Box minH="80vh" d="flex" justifyContent="center" alignItems="center">
				<Loader size="xl" color={COLORS.green} spped="0.2s" />
			</Box>
		);
	}

	return (
		<>
			{query && (
				<Box display="flex" flexDir="row" alignItems="center">
					<Text p="20px" pb="0px">
						{totalResults} search results for
						<Link href={`https://www.google.com/search?q=${query}`} target="_blank">
							<Text as="em"> {query}</Text>
						</Link>
					</Text>
					<Box flexGrow="1" />
					<Select
						w="30vw"
						value={sorting}
						onChange={(e) => setSorting(e.target.value)}
						placeholder="Sort movies by"
					>
						<option value="a">Year (Ascending)</option>
						<option value="d">Year (Descending)</option>
					</Select>
				</Box>
			)}
			{movies.length > 0 ? (
				<Wrap
					p="20px"
					maxH="83vh"
					overflowY="scroll"
					mt="10px"
					spacing="30px"
					justify="center"
				>
					{movies.map((movie) => (
						<WrapItem key={movie.imdbID}>
							<MovieEntry {...movie} />
						</WrapItem>
					))}
				</Wrap>
			) : (
				<LandingPage />
			)}
		</>
	);
};

export default OmbdDisplay;
