import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import { Box, HStack } from '@chakra-ui/react';
import Nominations from '../components/Nominations';
import OmbdDisplay from '../components/OmbdDisplay';
import MovieModal from '../components/MovieModal';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<MovieModal />
			<HStack overflowY="hidden" overflowX="hidden" spacing="20px">
				<Box overflowY="hidden" bg="white" maxH="100vh" minH="100vh" minW="60vw">
					<Header />
					<OmbdDisplay />
				</Box>
				<Nominations />
			</HStack>
			<ToastContainer autoClose={3000} />
		</div>
	);
}
