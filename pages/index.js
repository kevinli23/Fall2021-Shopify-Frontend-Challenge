import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import { Box, HStack } from '@chakra-ui/react';
import Nominations from '../components/Nominations';
import OmbdDisplay from '../components/OmbdDisplay';
import MovieModal from '../components/MovieModal';

export default function Home() {
	return (
		<div className={styles.container}>
			<MovieModal />
			<HStack spacing="20px">
				<Box bg="white" maxH="100vh" minH="100vh" minW="60vw">
					<Header />
					<OmbdDisplay />
				</Box>
				<Nominations />
			</HStack>
		</div>
	);
}
