import React, { useState, useEffect } from 'react';
import { useQueryStore } from '../../utils/store';
import { Box, Text, Link, Wrap, WrapItem, Select } from '@chakra-ui/react';
import { COLORS } from '../../utils/constants';
import MovieEntry from './MovieEntry';
import Loader from '../Loader';
import { sortMovies, getMovieBySearch } from '../../utils/helpers';
import LandingPage from '../LandingPage';

const OmbdDisplay = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalResults, setTotalResults] = useState(0);
	const [displayPage, setPage] = useState(0);

	const { query, sorting, setSorting } = useQueryStore();

	useEffect(() => {
		if (sorting) {
			sortMovies(movies, sorting);
			setMovies([...movies]);
		}
	}, [sorting]);

	useEffect(() => {
		if (query) {
			(async () => {
				setLoading(true);
				setMovies([]);
				setPage(1);
				var page = 1;
				var moviesAcc = [];
				var ids = [];
				while (true) {
					const data = await getMovieBySearch(query, page);
					if (data.Response === 'False') {
						break;
					}
					setPage(page + 1);
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
		} else {
			setMovies([]);
		}
	}, [query]);

	if (loading) {
		return (
			<Box
				d="flex"
				minW="100%"
				h="100%"
				minH="400px"
				alignItems="center"
				justifyContent="center"
			>
				<Loader
					size="xl"
					color={COLORS.green}
					speed="0.5s"
					text={`Loading Page ${displayPage}`}
				/>
			</Box>
		);
	}

	return (
		<>
			{query && (
				<Box display="flex" flexDir="row" alignItems="center">
					<Text p="10px" pl="20px" pb="0px" justifySelf="center">
						{totalResults} search results for
						<Link href={`https://www.google.com/search?q=${query}`} target="_blank">
							<Text as="em"> {query}</Text>
						</Link>
					</Text>
					<Box flexGrow="1" />
					<Select
						w="max-content"
						mr="20px"
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
					maxH="90%"
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
