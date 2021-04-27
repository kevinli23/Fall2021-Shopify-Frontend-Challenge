import React from 'react';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import { COLORS } from '../../utils/constants';

const LandingPage = () => {
	return (
		<Box
			d="flex"
			flexDir="column"
			alignItems="center"
			justifyContent="center"
			maxH="80vh"
			minH="80vh"
		>
			<Heading
				bgGradient={`linear(to-l, ${COLORS.darkgreen},${COLORS.green})`}
				bgClip="text"
				as="em"
				size="4xl"
			>
				THE SHOPPIEs
			</Heading>
			<Heading as="em" size="lg">
				Movie awards for entrepreneurs
			</Heading>
			<Text mt="5">Enter a movie name in the search bar to get started</Text>
			<Text mt="1">You are allowed a total of 5 nominations!</Text>
		</Box>
	);
};

export default LandingPage;
