import React from 'react';
import { Image, Box } from '@chakra-ui/react';
import SearchBar from '../SearchBar';

const Header = () => {
	return (
		<Box
			zIndex="1"
			d="flex"
			flexDir="row"
			alignItems="center"
			w="100%"
			maxH="100px"
		>
			<Image w="50" h="50" mt="10px" ml="20px" src="/shopify-logo.png" />
			<SearchBar />
		</Box>
	);
};

export default Header;
