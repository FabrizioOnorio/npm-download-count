import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputSearch from "./InputSearch";
import Package from "./Package";
import { useQuery } from "react-query";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

interface IPackage {
	downloadsData: object;
	downloadsDataWeek: number;
	displayNpmName: string;
	numberDownloadsMonthly: number;
	numberDownloadsWeekly: number;
	infos: string;
	id: string;
}

interface IHomePage {
	setFavourites: Dispatch<SetStateAction<object[]>>;
	favourites: IPackage[];
}

const HomePage = ({ setFavourites, favourites }: IHomePage) => {
	const [packageName, setPackageName] = useState("");
	const [downloadsData, setDownloadsData] = useState<object[]>([]);
	const [downloadsDataWeek, setDownloadsDataWeek] = useState<object[]>([]);
	const [displayNpmName, setDisplayNpmName] = useState("");
	const [numberDownloadsMonthly, setNumberDownloadsMonthly] = useState(0);
	const [numberDownloadsWeekly, setNumberDownloadsWeekly] = useState(0);
	const [infos, setInfos] = useState<{ description: string; homepage: string }>(
		{ description: "", homepage: "" }
	);
	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		refetch();
		setPackageName("");
	};
	const { user, error, isLoading } = useUser();
	const getDataDownloads = async () => {
		const response = await fetch(`/api/downloads/${packageName}`);
		const responseInfos = await fetch(`/api/informations/${packageName}`);
		const downloads = await response.json();
		const infos = await responseInfos.json();
		return { response: downloads, responseInfos: infos };
	};
	const { data, refetch } = useQuery("numberDownloads", getDataDownloads, {
		refetchOnWindowFocus: false,
		enabled: false,
	});

	useEffect(() => {
		if (data?.response.error === "not found") {
			setDisplayNpmName("");
			setDownloadsData([]);
			setInfos(data.responseInfos);
		}
		if (data?.response.downloads) {
			setDownloadsData(data.response.downloads);
			const totalMonthlyDownloads = data?.response.downloads
				.reduce(
					(acc: number, curr: { downloads: number }) => acc + curr.downloads,
					0
				)
				.toLocaleString("de");
			if (data?.response.downloads) {
				setDisplayNpmName(
					data.response.package[0].toUpperCase() +
						data.response.package.substr(1)
				);
				const lastWeekData = data.response.downloads.slice(
					data.response.downloads.length - 7
				);
				setDownloadsDataWeek(lastWeekData);
				const totalWeeklyDownloads = lastWeekData
					.reduce(
						(acc: number, curr: { downloads: number }) => acc + curr.downloads,
						0
					)
					.toLocaleString("de");
				setNumberDownloadsWeekly(totalWeeklyDownloads);
			}
			setNumberDownloadsMonthly(totalMonthlyDownloads);
			setInfos(data.responseInfos);
		}
	}, [data]);
	if (isLoading) return <div className="loading">Loading...</div>;
	if (error) return <div>{error.message}</div>;
	return (
		<div className="homePage">
			<div className="titleHomePage">
				<h1>Npm Downloads</h1>
			</div>
			<div className="favouritesDiv">
				<Link href={"/api/auth/login"}>
					<a className="login" style={{ display: user ? "none" : "block" }}>
						Login
					</a>
				</Link>
				<Link href="/api/auth/logout">
					<a className="logout" style={{ display: user ? "block" : "none" }}>
						Logout
					</a>
				</Link>
				<Link href={"/favourites"} passHref>
					<p
						className="favouritesDivLink"
						style={{ display: user ? "block" : "none" }}
					>
						Favourites
					</p>
				</Link>
			</div>

			<div style={{ display: user ? "block" : "none" }}>
				<h2>Hi{" " + user?.name?.split(" ")[0]}!</h2>
				<p>Search for a NPM library: </p>
			</div>
			<div>
				<InputSearch
					handleSubmit={handleSubmit}
					packageName={packageName}
					setPackageName={setPackageName}
				/>
			</div>
			<Package
				infos={infos}
				downloadsData={downloadsData}
				downloadsDataWeek={downloadsDataWeek}
				displayNpmName={displayNpmName}
				numberDownloadsMonthly={numberDownloadsMonthly}
				numberDownloadsWeekly={numberDownloadsWeekly}
				setFavourites={setFavourites}
				favourites={favourites}
			/>
		</div>
	);
};

export default HomePage;
