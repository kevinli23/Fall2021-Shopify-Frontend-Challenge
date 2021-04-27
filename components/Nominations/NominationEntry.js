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
import { SiImdb } from 'react-icons/si';
import { FcFilmReel } from 'react-icons/fc';
import { MdDateRange } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { BsAward } from 'react-icons/bs';

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
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		if (Genre) setGenres(Genre.split(', '));
	}, [Genre]);

	return (
		<Fade in={true}>
			<Box minW="90%" maxW="90%" p="10px" m="5px" border="1px solid black">
				<HStack alignItems="flex-start">
					<Image w="100px" h="150px" src={Poster} />
					<Stack direction="column">
						<Heading size="md">{Title}</Heading>
						<Box mb="1">
							<Wrap spacing="10px">
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
							<Link href={`https://imdb.com/title/${imdbID}`} target="_blank">
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
