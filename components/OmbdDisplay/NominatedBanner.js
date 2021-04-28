import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { COLORS } from '../../utils/constants';

const NominatedBanner = () => {
	return (
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
	);
};

export default NominatedBanner;
