import React from 'react';

import { COLORS } from '../../utils/constants';
import { useStore } from '../../utils/store';

import { Box, Heading } from '@chakra-ui/react';
import NominationEntry from './NominationEntry';

const Nominations = () => {
	const clearNominations = useStore((state) => state.clearNominations);
	const nominations = useStore((state) => state.nominations);

	return (
		<Box bg={COLORS.darkgreen} color="white" minH="100vh" minW="40vw" p="20px">
			<Box maxH="5vh" minH="5vh">
				<Heading fontFamily="Roboto, sans-serif">Your Nominations</Heading>
			</Box>

			<Box maxH="90vh" overflowY="scroll">
				{nominations.map((nom) => (
					<NominationEntry {...nom} />
				))}
			</Box>
		</Box>
	);
};

export default Nominations;
