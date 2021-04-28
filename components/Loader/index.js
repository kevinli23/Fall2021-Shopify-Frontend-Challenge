import { Spinner, Text, VStack } from '@chakra-ui/react';

const Loader = (props) => {
	const { text } = props;
	return (
		<VStack>
			<Spinner {...props} />
			{text && <Text>{text}</Text>}
		</VStack>
	);
};

export default Loader;
