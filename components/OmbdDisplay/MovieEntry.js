import React, { useState, useEffect } from 'react';
import { Box, Image, Button, Badge, Heading, Fade } from '@chakra-ui/react';
import { useStore, useModalStore } from '../../utils/store';
import { COLORS } from '../../utils/constants';

const MovieEntry = ({ Title, Year, Type, imdbID, Poster }) => {
	const nominations = useStore((state) => state.nominations);
	const { setId, setOpen } = useModalStore();

	const addNomination = useStore((state) => state.addNomination);

	const [nominated, setNominated] = useState(false);

	useEffect(() => {
		setNominated(nominations.filter((x) => x.imdbID === imdbID).length === 1);
	}, [nominations]);

	return (
		<Box
			display="flex"
			flexDir="column"
			alignItems="center"
			p="15px"
			m="5px"
			maxW="300px"
			minW="300px"
			maxH="400px"
			minH="400px"
			borderWidth="1px"
			borderRadius="lg"
			boxShadow="lg"
			position="relative"
			as="button"
			_hover={{ boxShadow: 'dark-lg' }}
			onClick={() => {
				setId(imdbID);
				setOpen(true);
			}}
		>
			<Image
				h="225px"
				w="150px"
				mr="10px"
				src={Poster}
				fallbackSrc={'https://via.placeholder.com/150'}
			/>
			<Box w="100%" mt="5" d="flex" flexDir="column" alignItems="center">
				<Box fontWeight="semibold" as="h4" lineHeight="tight">
					{Title}
				</Box>
				<Box d="flex" alignItems="baseline">
					<Badge borderRadius="full" px="2" colorScheme="teal">
						{Year}
					</Badge>
				</Box>
			</Box>
			<Button
				alignSelf="center"
				mt="auto"
				colorScheme="green"
				isDisabled={nominated || nominations.length === 5}
				onClick={async (e) => {
					e.stopPropagation();
					const response = await fetch(
						`http://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
					);
					const d = await response.json();
					setNominated(true);
					addNomination(d);
				}}
			>
				Nominate
			</Button>

			<Fade in={nominated}>
				<Box
					position="absolute"
					w="100%"
					p="5"
					bg="#C60F0F"
					left="0"
					top="100px"
					textAlign="center"
					verticalAlign="center"
					transform="skewY(-20deg)"
					opcaity="0"
					transition="opacity 0.5s ease-in-out"
				>
					<Heading size="xl" color={COLORS.green} fontFamily="Bungee, cursive">
						Nominated!
					</Heading>
				</Box>
			</Fade>
		</Box>
	);
};

export default MovieEntry;
