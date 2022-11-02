import { NextPage } from "next";
import react from "react";
import FavouritePage from "../components/FavouritePage";

interface IFavouritesProps {
	favourites: object[];
}

export const Favourites: NextPage<IFavouritesProps> = ({favourites}) => {
	return <FavouritePage favourites={favourites} />;
};

export default Favourites;
