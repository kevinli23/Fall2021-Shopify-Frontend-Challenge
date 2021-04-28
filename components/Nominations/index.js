import React, { useEffect } from 'react';

import { COLORS } from '../../utils/constants';
import { useStore } from '../../utils/store';

import { Box, Heading } from '@chakra-ui/react';
import NominationEntry from './NominationEntry';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Nominations = () => {
	// const clearNominations = useStore((state) => state.clearNominations);
	const nominations = useStore((state) => state.nominations);
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
			pt="10px"
			mr="-17px"
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
			>
				{nominations.length !== 5 ? (
					<Heading fontFamily="Roboto, sans-serif">{`Your Nominations (${nominations.length} / 5)`}</Heading>
				) : (
					<Heading>Nominations Complete!</Heading>
				)}
			</Box>
			<Box bg={COLORS.darkgreen} color="white" maxH="93vh" minH="93vh" minW="40vw">
				<Box maxH="90vh" overflowY="scroll">
					{nominations.map((nom) => (
						<NominationEntry {...nom} />
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default Nominations;
