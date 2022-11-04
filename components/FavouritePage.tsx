import Link from "next/link";
import react from "react";
import {IFavouriteObj} from '../pages/favourites';

interface IFavouritesPageProps {
	favourites: IFavouriteObj[];
}

const FavouritePage = ({ favourites }: IFavouritesPageProps) => {
	return (
		<>
			<div className="titleHomePage">
				<Link href={"/"} passHref>
					<h1>Npm Downloads</h1>
				</Link>
			</div>
			<div className="favouritesTitle">
				<h2>
					{favourites.length > 0
						? "Your List to compare:"
						: "Nothing saved yet :-)"}
				</h2>
			</div>
			<div className="favouritesList">
				{favourites.map((element) => (
					<div key={element.displayNpmName} className="favouriteElement">
						<p>{element.id}:</p>
						<p>Downloads last week:{" " + element.numberDownloadsWeekly}</p>
						<p>Downloads last month:{" " + element.numberDownloadsWeekly}</p>
					</div>
				))}
			</div>
		</>
	);
};

export default FavouritePage;
