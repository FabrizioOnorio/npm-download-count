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
		refetch();
		setPackageName("");
	};

	const getDataDownloads = async () => {
		const response = await fetch(`/api/downloads/${packageName}`);
		const responseInfos = await fetch(`/api/informations/${packageName}`);
		const downloads = await response.json();
    const infos = await responseInfos.json()
		return { response: downloads, responseInfos: infos };
	};;

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
			console.log("render");
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
      <div></div>
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
