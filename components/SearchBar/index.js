import React, { useState } from 'react';

import { Input, InputLeftElement, InputGroup } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useQueryStore } from '../../utils/store';

const zustandSetQuery = (state) => state.setGlobalQuery;

const SearchBar = () => {
	const setGlobalQuery = useQueryStore(zustandSetQuery);
	const [query, setQuery] = useState('');

	return (
		<div
			style={{
				width: '92%',
				minWidth: '92%',
				padding: '10px',
				marginTop: '10px',
			}}
		>
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
					type="text"
					placeholder="Search for a movie to nominate"
				/>
			</InputGroup>
		</div>
	);
};

export default SearchBar;
