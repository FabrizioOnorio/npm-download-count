import React, { useEffect, useState } from "react";
import WeekColumns from "./WeekColumns";
import MonthColumns from "./MonthColumns";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@auth0/nextjs-auth0";

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
	favourites: IPackage[];
}

interface IPackage {
	downloadsData: object;
	downloadsDataWeek: number;
	displayNpmName: string;
	numberDownloadsMonthly: number;
	numberDownloadsWeekly: number;
	infos: string;
	id: string;
}

const Package = ({
	favourites,
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
	const [added, setAdded] = useState(false);
	const [alreadyAdded, setAlreadyAdded] = useState(false);
	const { user } = useUser();

	useEffect(() => {
		setGatheredPackageData({
			downloadsData,
			downloadsDataWeek,
			displayNpmName,
			numberDownloadsMonthly,
			numberDownloadsWeekly,
			infos,
			id: "",
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
		const newId = uuidv4();
		setGatheredPackageData({
			downloadsData,
			downloadsDataWeek,
			displayNpmName,
			numberDownloadsMonthly,
			numberDownloadsWeekly,
			infos,
			id: newId,
		});

		let packageCount: number = 0;
		favourites.forEach((item: IPackage) => {
			if (item.displayNpmName === gatheredPackageData.displayNpmName) {
				packageCount++;
			}
		});
		if (packageCount > 0) {
			setAlreadyAdded(true);
			setTimeout(() => setAlreadyAdded(false), 2000);
		} else {
			setFavourites((prev) => [...prev, gatheredPackageData]);
			setAdded(true);
			setTimeout(() => setAdded(false), 2000);
		}
		packageCount = 0;
	};

	if (infos === undefined) return <p>Package not found</p>;
	return (
		<div>
			<div className={added ? "addedVisible" : "addedNotVisible"}>
				<p>Informations added to your favorites</p>
			</div>
			<div
				className={
					alreadyAdded ? "alreadyAddedVisible" : "alreadyAddedNotVisible"
				}
			>
				<p>Item alredy added to your favorites</p>
			</div>
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

				<button
					className="compareButton"
					onClick={handleClick}
					style={{ display: user ? "block" : "none" }}
				>
					Save to compare
				</button>
			</div>
		</div>
	);
};

export default Package;
