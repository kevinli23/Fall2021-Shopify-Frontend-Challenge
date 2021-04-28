import React, { useEffect } from 'react';

import { COLORS } from '../../utils/constants';
import { useStore } from '../../utils/store';

import { Box, Heading } from '@chakra-ui/react';
import NominationEntry from './NominationEntry';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nominations = () => {
	const nominations = useStore((state) => state.nominations);
	const removeNomination = useStore((state) => state.removeNomination);
	const notify = () => toast.dark('Nominations complete! 🎉🎉🎉');

	useEffect(() => {
		if (nominations.length === 5) {
			notify();
		}
	}, [nominations]);

	return (
		<Box
			bg={COLORS.darkgreen}
			color="white"
			d="flex"
			flexDir="column"
			minH="100vh"
			minW="40vw"
			pl="10px"
			maxH="100vh"
			overflowX="hidden"
			overflowY="hidden"
		>
			<Box
				bg={nominations.length === 5 ? COLORS.blue : COLORS.darkgreen}
				maxH="7vh"
				minH="7vh"
				alignItems="center"
				p="5px"
				pl="10px"
				ml="-10px"
			>
				{nominations.length !== 5 ? (
					<Heading
						p="5px"
						fontFamily="Roboto, sans-serif"
					>{`Your Nominations (${nominations.length} / 5)`}</Heading>
				) : (
					<Heading p="5px">Nominations Complete!</Heading>
				)}
			</Box>
			<Box bg={COLORS.darkgreen} color="white" maxH="93vh" minH="93vh" minW="40vw">
				<Box maxH="90vh" overflowY="scroll">
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
	);
};

export default Nominations;
