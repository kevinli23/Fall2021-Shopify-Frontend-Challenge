import React, { useState, useEffect } from 'react';
import {
	Image,
	Text,
	Wrap,
	WrapItem,
	Badge,
	Box,
	Stack,
	IconButton,
	Heading,
	Link,
	HStack,
	Collapse,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { SiImdb } from 'react-icons/si';
import { FcFilmReel } from 'react-icons/fc';
import { MdDateRange } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { BsAward } from 'react-icons/bs';
import { COLORS } from '../../utils/constants';
import { getMovieById } from '../../utils/helpers';
import Loader from '../Loader';

const NominationEntry = ({ imdbID, Poster, Title, removeEntry }) => {
	const [onLoad, setOnLoad] = useState(true);
	const [loading, setLoading] = useState(true);
	const [removed, setRemoved] = useState(false);
	const [genres, setGenres] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		if (removed) {
			(async () => {
				await new Promise((resolve) => setTimeout(resolve, 200));
				removeEntry(imdbID);
			})();
		}
	}, [removed]);

	useEffect(() => {
		(async () => {
			await new Promise((resolve) => setTimeout(resolve, 10));
			setOnLoad(false);
		})();
	}, []);

	useEffect(() => {
		if (imdbID) {
			(async () => {
				const d = await getMovieById(imdbID);
				setData(d);
				setGenres(d.Genre.split(', '));
				setLoading(false);
			})();
		}
	}, [imdbID]);

	return (
		<Collapse in={!removed && !onLoad} animateOpacity unmountOnExit={true}>
			<Box
				minW="90%"
				maxW="90%"
				p="10px"
				mt="20px"
				mb="30px"
				ml="10px"
				borderWidth="1px"
				borderRadius="lg"
				borderColor={COLORS.darkgreen}
				boxShadow="dark-lg"
			>
				<HStack position="relative" alignItems="flex-start">
					<IconButton
						position="absolute"
						right="0"
						top="0"
						variant="outline"
						aria-label="Delete Nomination"
						alignSelf="flex-end"
						icon={<DeleteIcon />}
						onClick={() => {
							setRemoved(true);
						}}
					/>
					<Image alignSelf="center" w="150px" h="225px" src={Poster} />
					<Stack direction="column">
						<HStack
							maxW="80%"
							verticalAlign="center"
							minH="60px"
							maxH="min-content"
							mb="2px"
						>
							<Heading size="md">{Title}</Heading>
						</HStack>
						{loading ? (
							<Loader />
						) : (
							<>
								<Box>
									<Wrap spacing="15px">
										{genres.map((genre) => (
											<WrapItem key={genre}>
												<Badge px="2" borderRadius="full" colorScheme="purple">
													{genre}
												</Badge>
											</WrapItem>
										))}
										<WrapItem>
											<Badge px="2" borderRadius="full" colorScheme="red">
												{data.Rated}
											</Badge>
										</WrapItem>
									</Wrap>
								</Box>
								<Stack direction="row" alignItems="center">
									<Link
										mt="2px"
										href={`https://imdb.com/title/${imdbID}`}
										target="_blank"
									>
										<IconButton
											aria-label="IMDB link"
											colorScheme="teal"
											size="xl"
											icon={<SiImdb size="2em" color="yellow" />}
										/>
									</Link>
									<AiFillStar style={{ color: '#FFDF00', fontSize: '1.5em' }} />
									<Text>{data.imdbRating}</Text>
								</Stack>
								<HStack>
									<Stack direction="row" align="center">
										<FcFilmReel />
										<Text>{data.Runtime}</Text>
									</Stack>
									<Stack direction="row">
										<MdDateRange style={{ alignSelf: 'center' }} />
										<Text>{data.Year}</Text>
									</Stack>
								</HStack>
								<HStack alignItems="center">
									<BsAward />
									<Text>{data.Awards !== 'N/A' ? data.Awards : 'None'}</Text>
								</HStack>
							</>
						)}
					</Stack>
				</HStack>
			</Box>
		</Collapse>
	);
};

export default NominationEntry;
