import React from 'react';
import {
	VStack,
	Heading,
	Text,
	Image,
	useBreakpointValue,
} from '@chakra-ui/react';
import { COLORS } from '../../utils/constants';

const LandingPage = () => {
	const showImage = useBreakpointValue({ sm: false, lg: true });
	return (
		<VStack
			fontFamily="Roboto, sans-serif"
			alignItems="center"
			justifyContent="center"
			maxH="100%"
			minH="100%"
		>
			{showImage && <Image src="/shoppies-icon.png" mb="20px" />}
			<Heading
				bgGradient={`linear(to-l, ${COLORS.darkgreen},${COLORS.green})`}
				bgClip="text"
				as="h1"
				size="3xl"
				fontFamily="Montserrat, sans-serif"
			>
				The Shoppies
			</Heading>
			<Heading fontFamily="Montserrat, sans-serif" as="h3" size="md">
				Movie awards for entrepreneurs
			</Heading>
			<Text mt="5">Enter a movie name in the search bar to get started</Text>
			<Text mt="1">You are allowed a total of 5 nominations!</Text>
		</VStack>
	);
};

export default LandingPage;
