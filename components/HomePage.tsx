import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputSearch from "./InputSearch";
import Package from "./Package";
import { useQuery } from "react-query";
import Link from "next/link";

interface IHomePage {
	setFavourites: Dispatch<SetStateAction<object[]>>;
}

const HomePage = ({ setFavourites }: IHomePage) => {
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
		const responseInfos = await fetch(`/api/informations/${packageName}`);
		const dataInfos = await responseInfos.json();
		setInfos(dataInfos);
		refetch();
		setPackageName("");
	};

	const getNumberDownloads = async () => {
		const response = await fetch(`/api/downloads/${packageName}`);
		return response.json();
	};

	const { data, refetch } = useQuery("numberDownloads", getNumberDownloads, {
		refetchOnWindowFocus: false,
		enabled: false,
	});
	useEffect(() => {
		if (data?.error === "not found") {
			setDisplayNpmName("");
			setDownloadsData([]);
		}
		if (data?.downloads) {
			console.log("render");
			setDownloadsData(data.downloads);
			const totalMonthlyDownloads = data?.downloads
				.reduce(
					(acc: number, curr: { downloads: number }) => acc + curr.downloads,
					0
				)
				.toLocaleString("de");
			if (data?.downloads) {
				setDisplayNpmName(
					data.package[0].toUpperCase() + data.package.substr(1)
				);
				const lastWeekData = data.downloads.slice(data.downloads.length - 7);
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
		}
	}, [data]);

	return (
		<div className="homePage">
			<div className="titleHomePage">
				<h1>Npm Downloads</h1>
			</div>
			<div className="favouritesDiv">
				<Link href={"/favourites"} passHref>
					<p className="favouritesDivLink">Favourites</p>
				</Link>
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
			/>
		</div>
	);
};

export default HomePage;
