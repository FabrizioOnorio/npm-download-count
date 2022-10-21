import React, { useState } from "react";
import InputSearch from "./InputSearch";
import Package from "./Package";

const HomePage = () => {
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
		const response = await fetch(`/api/downloads/${packageName}`);
		const data = await response.json();
		const responseInfos = await fetch(`/api/informations/${packageName}`);
		const dataInfos = await responseInfos.json();
		setInfos(dataInfos);
		if (data.downloads === undefined) alert("package not found");
		if (data.downloads !== undefined) {
			setDownloadsData(data.downloads);
			setDisplayNpmName(data.package[0].toUpperCase() + data.package.substr(1));
			const lastWeekData = data.downloads.slice(data.downloads.length - 7);
			setDownloadsDataWeek(lastWeekData);
			const totalMonthlyDownloads = data.downloads
				.reduce(
					(acc: number, curr: { downloads: number }) => acc + curr.downloads,
					0
				)
				.toLocaleString("de");
			setNumberDownloadsMonthly(totalMonthlyDownloads);
			const totalWeeklyDownloads = lastWeekData
				.reduce(
					(acc: number, curr: { downloads: number }) => acc + curr.downloads,
					0
				)
				.toLocaleString("de");
			setNumberDownloadsWeekly(totalWeeklyDownloads);
		}
		setPackageName("");
	};

	if (downloadsData && downloadsDataWeek && infos)
		return (
			<div className="homePage">
				<h1>Npm Downloads</h1>
				<InputSearch
					handleSubmit={handleSubmit}
					packageName={packageName}
					setPackageName={setPackageName}
				/>
				<Package
					infos={infos}
					downloadsData={downloadsData}
					downloadsDataWeek={downloadsDataWeek}
					displayNpmName={displayNpmName}
					numberDownloadsMonthly={numberDownloadsMonthly}
					numberDownloadsWeekly={numberDownloadsWeekly}
				/>
			</div>
		);
	return <p>loading...</p>;
};

export default HomePage;
