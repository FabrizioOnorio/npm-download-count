import React, { useEffect, useState } from "react";
import WeekColumns from "./WeekColumns";
import MonthColumns from "./MonthColumns";
import { v4 as uuidv4 } from "uuid";

interface IPackageProps {
	downloadsData: object[];
	downloadsDataWeek: object[];
	infos: {
		description: string;
		homepage: string;
	};
	displayNpmName: string;
	numberDownloadsMonthly: number;
	numberDownloadsWeekly: number;
	setFavourites: React.Dispatch<React.SetStateAction<object[]>>;
}

const Package = ({
	downloadsData,
	downloadsDataWeek,
	infos,
	displayNpmName,
	numberDownloadsMonthly,
	numberDownloadsWeekly,
	setFavourites,
}: IPackageProps) => {
	const [gatheredPackageData, setGatheredPackageData] = useState({
		downloadsData,
		downloadsDataWeek,
		displayNpmName,
		numberDownloadsMonthly,
		numberDownloadsWeekly,
		infos,
		id: "",
	});

	useEffect(() => {
		setGatheredPackageData({
			downloadsData,
			downloadsDataWeek,
			displayNpmName,
			numberDownloadsMonthly,
			numberDownloadsWeekly,
			infos,
			id: uuidv4(),
		});
	}, [
		displayNpmName,
		downloadsData,
		downloadsDataWeek,
		infos,
		numberDownloadsMonthly,
		numberDownloadsWeekly,
	]);

	const handleClick = () => {
		setFavourites((prev) => [...prev, gatheredPackageData]);
	};

  console.log(gatheredPackageData)

	if (infos === undefined) return <p>Package not found</p>;
	return (
		<div>
			<h2 className="packageName">{displayNpmName}</h2>
			<p
				className={
					infos.description.length > 0
						? "descriptionVisible"
						: "descriptionHidden"
				}
			>
				{" " + infos.description}
			</p>
			<p className={infos.homepage.length > 0 ? "linkVisible" : "linkHidden"}>
				<a href={infos.homepage} target="_blank" rel="noreferrer">
					{" " + infos.homepage}
				</a>
			</p>
			<div
				className={
					downloadsData.length === 0 ? "graphsData" : "graphsAreShowing"
				}
			>
				<div className="twoGraphs">
					<div>
						<h3>Downloads last week: {" " + numberDownloadsWeekly}</h3>
						<WeekColumns
							downloadsDataWeek={gatheredPackageData.downloadsDataWeek}
						/>
					</div>
					<div>
						<h3>Downloads last month: {" " + numberDownloadsMonthly}</h3>
						<MonthColumns downloadsData={gatheredPackageData.downloadsData} />
					</div>
				</div>
				<button className="compareButton" onClick={handleClick}>
					Save to compare
				</button>
			</div>
		</div>
	);
};

export default Package;
