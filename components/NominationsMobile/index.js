import React, { useEffect } from 'react';

import { useStore } from '../../utils/store';
import { Box, Heading, Image, VStack } from '@chakra-ui/react';

import { toast } from 'react-toastify';

const removeEntryQuery = (state) => state.removeNomination;

const NominationsMobile = () => {
	const nominations = useStore((state) => state.nominations);
	const removeNomination = useStore(removeEntryQuery);
	const notify = () => toast.dark('Nominations complete! 🎉🎉🎉');
	return (
		<VStack p="10px" bg="green.300">
			<Heading>Your Nominations</Heading>
			<Box overflowY="hidden" d="flex" flexDir="row">
				{nominations.map((nom) => (
					<Box key={nom.imdbID}>
						<Image p="10px" w="100px" h="150px" src={nom.Poster} />
					</Box>
				))}
			</Box>
		</VStack>
	);
};

export default NominationsMobile;
