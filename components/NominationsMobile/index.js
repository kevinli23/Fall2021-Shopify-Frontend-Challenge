import React, { useState, useEffect } from 'react';

import { useStore } from '../../utils/store';
import {
	Box,
	Heading,
	Image,
	VStack,
	IconButton,
	useBreakpointValue,
} from '@chakra-ui/react';

import { toast } from 'react-toastify';
import { CgRemove } from 'react-icons/cg';

const removeEntryQuery = (state) => state.removeNomination;

const NominationsMobile = () => {
	const [headerColor, setHeaderColor] = useState('green.300');
	const notifyMe = useBreakpointValue({ base: true, sm: true, lg: false });
	const nominations = useStore((state) => state.nominations);
	const removeNomination = useStore(removeEntryQuery);
	const notify = () => toast.dark('Nominations complete! 🎉🎉🎉');

	useEffect(() => {
		if (nominations.length === 5 && notifyMe) {
			notify();
			setHeaderColor('blue.500');
		} else {
			setHeaderColor('green.300');
		}
	}, [nominations]);

	return (
		<VStack minW="100vw" p="10px" minH="100%" maxH="100%" bg={headerColor}>
			<Heading size="md" fontFamily="Roboto, sans-serif">
				{nominations.length !== 5
					? `Your Nominations (${nominations.length} / 5)`
					: 'Nominations Complete'}
			</Heading>
			<Box
				overflowY="hidden"
				overflowX="scroll"
				minH="90%"
				maxH="90%"
				maxW="100%"
				d="flex"
				flexDir="row"
			>
				{nominations.map((nom) => (
					<Box position="relative" key={nom.imdbID} p="5px" minW="100px">
						<Image w="100px" h="150px" src={nom.Poster} />
						<IconButton
							colorScheme="red"
							position="absolute"
							top="0"
							right="0"
							icon={<CgRemove />}
							onClick={() => removeNomination(nom.imdbID)}
						/>
					</Box>
				))}
			</Box>
		</VStack>
	);
};

export default NominationsMobile;
