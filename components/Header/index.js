import React from 'react';
import { Image, HStack, useMediaQuery, Box } from '@chakra-ui/react';
import SearchBar from '../SearchBar';
import { GrTrophy } from 'react-icons/gr';

const Header = ({ mobileNomOnOpen }) => {
	const [isLargerThan1100] = useMediaQuery('(min-width: 1100px)');
	return (
		<HStack zIndex="1" alignItems="center" minW="100%" maxH="10vh" minH="10vh">
			{isLargerThan1100 && (
				<Image w="50" h="50" mt="10px" ml="20px" src="/shopify-logo.png" />
			)}
			<SearchBar />
		</HStack>
	);
};

export default Header;
