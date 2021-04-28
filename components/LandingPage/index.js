import React from 'react';
import { VStack, Heading, Text, Image } from '@chakra-ui/react';
import { COLORS } from '../../utils/constants';

const LandingPage = () => {
	return (
		<VStack
			fontFamily="Roboto, sans-serif"
			alignItems="center"
			justifyContent="center"
			maxH="80vh"
			minH="80vh"
		>
			<Image src="/shoppies-icon.png" mb="20px" />
			<Heading
				bgGradient={`linear(to-l, ${COLORS.darkgreen},${COLORS.green})`}
				bgClip="text"
				as="h1"
				size="4xl"
				fontFamily="Montserrat, sans-serif"
			>
				THE SHOPPIEs
			</Heading>
			<Heading fontFamily="Montserrat, sans-serif" as="h3" size="lg">
				Movie awards for entrepreneurs
			</Heading>
			<Text mt="5">Enter a movie name in the search bar to get started</Text>
			<Text mt="1">You are allowed a total of 5 nominations!</Text>
		</VStack>
	);
};

export default LandingPage;
