import React, { useState } from 'react';

import { Input, InputLeftElement, InputGroup } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useQueryStore } from '../../utils/store';

const zustandSetQuery = (state) => state.setGlobalQuery;

const SearchBar = () => {
	const setGlobalQuery = useQueryStore(zustandSetQuery);
	const [query, setQuery] = useState('');

	return (
		<div style={{ width: '100%', padding: '20px', marginTop: '10px' }}>
			<InputGroup
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						setGlobalQuery(query);
					}
				}}
			>
				<InputLeftElement
					pointerEvents="none"
					children={<SearchIcon color="gray.300" />}
				/>
				<Input
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					type="tel"
					placeholder="Search for a movie to nominate"
				/>
			</InputGroup>
		</div>
	);
};

export default SearchBar;
