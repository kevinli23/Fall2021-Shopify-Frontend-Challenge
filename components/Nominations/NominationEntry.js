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
	Fade,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { SiImdb } from 'react-icons/si';
import { FcFilmReel } from 'react-icons/fc';
import { MdDateRange } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { BsAward } from 'react-icons/bs';
import { COLORS } from '../../utils/constants';
import { useStore } from '../../utils/store';

const NominationEntry = ({
	Title,
	Poster,
	imdbRating,
	Runtime,
	Year,
	Awards,
	Genre,
	Rated,
	imdbID,
}) => {
	const removeNomination = useStore((state) => state.removeNomination);
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		if (Genre) setGenres(Genre.split(', '));
	}, [Genre]);

	return (
		<Fade in={true}>
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
						onClick={() => removeNomination(imdbID)}
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
										{Rated}
									</Badge>
								</WrapItem>
							</Wrap>
						</Box>
						<Stack direction="row" alignItems="center">
							<Link mt="2px" href={`https://imdb.com/title/${imdbID}`} target="_blank">
								<IconButton
									aria-label="IMDB link"
									colorScheme="teal"
									size="xl"
									icon={<SiImdb size="2em" color="yellow" />}
								/>
							</Link>
							<AiFillStar style={{ color: '#FFDF00', fontSize: '1.5em' }} />
							<Text>{imdbRating}</Text>
						</Stack>
						<HStack>
							<Stack direction="row" align="center">
								<FcFilmReel />
								<Text>{Runtime}</Text>
							</Stack>
							<Stack direction="row">
								<MdDateRange style={{ alignSelf: 'center' }} />
								<Text>{Year}</Text>
							</Stack>
						</HStack>
						<HStack alignItems="center">
							<BsAward />
							<Text>{Awards !== 'N/A' ? Awards : 'None'}</Text>
						</HStack>
					</Stack>
				</HStack>
			</Box>
		</Fade>
	);
};

export default NominationEntry;
