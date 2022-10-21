import type { NextPage } from "next";
import Head from "next/head";
import HomePage from "../components/HomePage";
import { QueryClient, QueryClientProvider } from "react-query";

const Home: NextPage = () => {
  const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient} >
			<div className="pb-0 py-10">
				<Head>
					<title>npm downloads</title>
					<meta
						name="find the number of downloads for the npm packages you like and visualise them with Victory"
						content="npm downloads search"
					/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<HomePage />
			</div>
		</QueryClientProvider>
	);
};

export default Home;
