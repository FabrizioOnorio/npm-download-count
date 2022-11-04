import Link from "next/link";
import react from "react";

interface IFavouriteObj {
	downloadsData: object[];
	downloadsDataWeek: object[];
	displayNpmName: string;
	numberDownloadsMonthly: number;
	numberDownloadsWeekly: number;
	infos: { description: string; homepage: string };
}

interface IFavouritesPageProps {
	favourites: IFavouriteObj[];
}

const FavouritePage = ({ favourites }: IFavouritesPageProps) => {
	return (
		<>
			<div className="titleHomePage">
				<Link href={"/"}>
					<h1>Npm Downloads</h1>
				</Link>
			</div>
			<div className="favouritesTitle">
				<h2>Your List to compare:</h2>
			</div>
			<div className="favouritesList">
				{favourites.map((element) => (
					<div key={element.displayNpmName} className="favouriteElement">
						<p>{element.displayNpmName}:</p>
						<p>Downloads last week:{" " + element.numberDownloadsWeekly}</p>
						<p>Downloads last month:{" " + element.numberDownloadsWeekly}</p>
					</div>
				))}
			</div>
		</>
	);
};

export default FavouritePage;
