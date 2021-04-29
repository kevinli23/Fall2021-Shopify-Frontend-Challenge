import React, { useState, useEffect } from 'react';

import { COLORS } from '../../utils/constants';
import { useStore } from '../../utils/store';

import { Box, Heading } from '@chakra-ui/react';
import NominationEntry from './NominationEntry';

import { toast } from 'react-toastify';

const removeEntryQuery = (state) => state.removeNomination;

const Nominations = () => {
	const [headerColor, setHeaderColor] = useState('green.300');
	const nominations = useStore((state) => state.nominations);
	const removeNomination = useStore(removeEntryQuery);
	const notify = () => toast.dark('Nominations complete! 🎉🎉🎉');

	useEffect(() => {
		if (nominations.length === 5) {
			notify();
			setHeaderColor('blue.500');
		} else {
			setHeaderColor('green.300');
		}
	}, [nominations]);

	return (
		<>
			<Box
				bg={COLORS.darkgreen}
				color="white"
				d="flex"
				flexDir="column"
				minH="100vh"
				minW="100%"
				maxW="100%"
				pl="10px"
				maxH="100vh"
				overflowX="hidden"
				overflowY="hidden"
			>
				<Box
					bg={headerColor}
					maxH="7vh"
					minH="7vh"
					alignItems="center"
					p="5px"
					pl="10px"
					ml="-10px"
				>
					<Heading p="5px" fontFamily="Roboto, sans-serif">
						{nominations.length !== 5
							? `Your Nominations (${nominations.length} / 5)`
							: 'Nominations Complete!'}
					</Heading>
				</Box>
				<Box
					bg={COLORS.darkgreen}
					color="white"
					maxH="93vh"
					minH="93vh"
					minW="100%"
					maxW="100%"
				>
					<Box minW="100%" maxW="100%" maxH="90vh" overflowY="scroll">
						{nominations.map((nom) => (
							<NominationEntry
								key={nom.imdbID}
								{...nom}
								removeEntry={removeNomination}
							/>
						))}
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Nominations;
