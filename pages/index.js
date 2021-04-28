import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import { Box, HStack, useBreakpointValue } from '@chakra-ui/react';
import Nominations from '../components/Nominations';
import OmdbDisplay from '../components/OmdbDisplay';
import MovieModal from '../components/MovieModal';
import NominationsMobile from '../components/NominationsMobile';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
	const leftWidth = useBreakpointValue({ xs: '100vw', sm: '100vw', lg: '60vw' });
	const rightWidth = useBreakpointValue({ xs: '0vw', sm: '0vw', lg: '40vw' });
	const omdbHeight = useBreakpointValue({ sm: '65vh', lg: '90vh' });
	const renderRightNoms = useBreakpointValue({ sm: false, lg: true });
	return (
		<div className={styles.container}>
			<MovieModal />
			<HStack
				spacing="20px"
				minW="100%"
				maxW="100%"
				h="100vh"
				minH="100%"
				maxH="100%"
			>
				<Box bg="white" maxH="100vh" minH="100vh" minW={leftWidth} maxW={leftWidth}>
					{!renderRightNoms && (
						<Box h="25vh" maxH="25vh">
							<NominationsMobile />
						</Box>
					)}
					<Header />
					<Box h={omdbHeight} maxH={omdbHeight} w={leftWidth} minW={leftWidth}>
						<OmdbDisplay />
					</Box>
				</Box>
				{renderRightNoms && (
					<Box minW={rightWidth} w={rightWidth}>
						<Nominations />
					</Box>
				)}
			</HStack>
			<ToastContainer autoClose={2000} />
		</div>
	);
}
