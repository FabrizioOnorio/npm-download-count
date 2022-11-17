import Link from "next/link";
import react, { Dispatch, SetStateAction } from "react";
import Favourite from "./Favourite";
import { IFavouriteObj } from "../pages/favourites";

interface IFavouritesPageProps {
	favourites: IFavouriteObj[];
	setFavourites: Dispatch<SetStateAction<object[]>>;
}

const FavouritePage = ({ favourites, setFavourites }: IFavouritesPageProps) => {
	return (
		<>
			<div className="titleHomePage">
				<Link href={"/"} passHref>
					<h1>Npm Downloads</h1>
				</Link>
			</div>
			<div className="favouritesTitle">
				<h2>
					{favourites?.length > 0
						? "Your List to compare:"
						: "Nothing saved yet :-)"}
				</h2>
			</div>
			<div className="favouritesList">
				{favourites?.map((element) => (
					<Favourite
						setFavourites={setFavourites}
						key={element.displayNpmName}
						element={element}
            favourites={favourites}
					/>
				))}
			</div>
		</>
	);
};

export default FavouritePage;
