import React, { useState, useEffect } from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
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
} from '@chakra-ui/react';
import { SiImdb } from 'react-icons/si';
import { FcFilmReel } from 'react-icons/fc';
import { MdDateRange } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { BsAward } from 'react-icons/bs';

import { useModalStore } from '../../utils/store';
import Loader from '../Loader';

const MovieModal = () => {
	const { isOpen, setOpen, imdbId } = useModalStore();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		if (imdbId) {
			setLoading(true);
			(async () => {
				const response = await fetch(
					`https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
				);
				const d = await response.json();
				setData(d);
				setGenres(d.Genre.split(', '));
				setLoading(false);
			})();
		}
	}, [imdbId]);

	return (
		<Modal
			onClose={() => {
				setOpen(false);
				setLoading(true);
			}}
			isOpen={isOpen}
			isCentered
		>
			<ModalOverlay />
			<ModalContent minW="550px" minH="300px" w="max-content">
				{loading ? (
					<Loader
						mt="20%"
						alignSelf="center"
						justifySelf="center"
						size="xl"
						color="green"
					/>
				) : (
					<>
						<ModalHeader>{data.Title}</ModalHeader>
						<ModalCloseButton />
						<ModalBody
							overflowWrap="break-word"
							p="20px"
							fontFamily="Roboto, sans-serif"
						>
							<Stack direction="row">
								<Image src={data.Poster} />
								<Stack direction="column">
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
													{data.Rated}
												</Badge>
											</WrapItem>
										</Wrap>
									</Box>
									<Stack direction="row" alignItems="center">
										<Link href={`https://imdb.com/title/${imdbId}`} target="_blank">
											<IconButton
												aria-label="IMDB link"
												variant="outline"
												colorScheme="yellow"
												size="xl"
												icon={<SiImdb size="2em" />}
											/>
										</Link>
										<AiFillStar style={{ color: '#FFDF00', fontSize: '1.5em' }} />
										<Text>{data.imdbRating}</Text>
									</Stack>
									<Stack direction="row">
										<Stack direction="row" align="center">
											<FcFilmReel />
											<Text>{data.Runtime}</Text>
										</Stack>
										<Stack direction="row">
											<MdDateRange style={{ alignSelf: 'center' }} />
											<Text>{data.Year}</Text>
										</Stack>
									</Stack>
									<Stack direction="row" alignItems="center">
										<BsAward />
										<Text>{data.Awards !== 'N/A' ? data.Awards : 'None'}</Text>
									</Stack>
									<Heading size="md">Description</Heading>
									<Text>{data.Plot}</Text>
								</Stack>
							</Stack>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default MovieModal;
