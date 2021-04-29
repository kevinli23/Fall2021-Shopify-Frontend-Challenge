import React, { useState, useEffect } from 'react';
import {
	Box,
	Image,
	Button,
	Badge,
	useBreakpointValue,
	Fade,
} from '@chakra-ui/react';
import { useStore, useModalStore } from '../../utils/store';
import NominatedBanner from './NominatedBanner';

const addNomQuery = (state) => state.addNomination;

const compareState = (oldNoms, newNoms, imdbID) => {
	const case1 =
		newNoms.length !== 5 &&
		newNoms.filter((x) => x.imdbID === imdbID).length === 0 &&
		oldNoms.filter((x) => x.imdbID === imdbID).length === 0;
	const case2 = oldNoms.length !== 5 && newNoms.length !== 5;

	return case1 && case2;
};

const MovieEntry = ({ Title, Year, imdbID, Poster }) => {
	const showExtra = useBreakpointValue({
		base: false,
		sm: false,
		md: true,
		lg: true,
	});
	const nominations = useStore(
		(state) => state.nominations,
		(oldNominations, newNominations) =>
			compareState(oldNominations, newNominations, imdbID)
	);
	const { setId, setOpen } = useModalStore();

	const addNomination = useStore(addNomQuery);

	const [nominated, setNominated] = useState(false);

	console.log(`rerender ${Title}`);

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
				if (showExtra) {
					setId(imdbID);
					setOpen(true);
				}
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
					setNominated(true);
					addNomination({ imdbID, Poster, Title });
				}}
			>
				Nominate
			</Button>

			<Fade in={nominated}>
				<NominatedBanner />
			</Fade>
		</Box>
	);
};

export default MovieEntry;
