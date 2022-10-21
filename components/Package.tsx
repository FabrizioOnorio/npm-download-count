import React from "react";
import WeekColumns from "./WeekColumns";
import MonthColumns from "./MonthColumns";

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
}

const Package = ({
	downloadsData,
	downloadsDataWeek,
	infos,
	displayNpmName,
	numberDownloadsMonthly,
	numberDownloadsWeekly,
}: IPackageProps) => {
	return (
		<div>
			<p
				className={
					infos.description.length > 0
						? ""
						: "descriptionHidden"
				}
			>
				{" " + infos.description}
			</p>
			<p className={infos.homepage.length > 0 ? "linkVisible" : "linkHidden"}>
				<a href={infos.homepage}>{" " + infos.homepage}</a>
			</p>
			<div
				className={
					downloadsData.length === 0 ? "graphsData" : "graphsAreShowing"
				}
			>
				<h2>{displayNpmName}</h2>
				<div className="twoGraphs">
					<div>
						<h3>Downloads last week: {" " + numberDownloadsWeekly}</h3>
						<WeekColumns downloadsDataWeek={downloadsDataWeek} />
					</div>
					<div>
						<h3>Downloads last month: {" " + numberDownloadsMonthly}</h3>
						<MonthColumns downloadsData={downloadsData} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Package;
