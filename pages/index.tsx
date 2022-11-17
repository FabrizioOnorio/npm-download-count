import type { NextPage } from "next";
import Head from "next/head";
import HomePage from "../components/HomePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Dispatch, SetStateAction, useState } from "react";

interface IPackage {
	downloadsData: object;
	downloadsDataWeek: number;
	displayNpmName: string;
	numberDownloadsMonthly: number;
	numberDownloadsWeekly: number;
	infos: string;
	id: string;
}

interface IHomeProps {
	setFavourites: Dispatch<SetStateAction<object[]>>;
	favourites: IPackage[];
}

const Home: NextPage<IHomeProps> = ({ setFavourites, favourites } ) => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<div>
				<Head>
					<title>npm downloads</title>
					<meta
						name="find the number of downloads for the npm packages you like and visualise them with Victory"
						content="npm downloads search"
					/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<HomePage setFavourites={setFavourites} favourites={favourites} />
			</div>
		</QueryClientProvider>
	);
};

export default Home;
