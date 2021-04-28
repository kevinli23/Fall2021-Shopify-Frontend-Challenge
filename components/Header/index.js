import React from 'react';
import { Image, HStack } from '@chakra-ui/react';
import SearchBar from '../SearchBar';

const Header = () => {
	return (
		<HStack zIndex="1" alignItems="center" w="100%" maxH="100px">
			<Image w="50" h="50" mt="10px" ml="20px" src="/shopify-logo.png" />
			<SearchBar />
		</HStack>
	);
};

export default Header;
