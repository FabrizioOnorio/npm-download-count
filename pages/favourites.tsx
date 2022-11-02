import { NextPage } from "next";
import react from "react";
import FavouritePage from "../components/FavouritePage";

interface IFavouriteObj {
	downloadsData: object[];
	downloadsDataWeek: object[];
	displayNpmName: string;
	numberDownloadsMonthly: number;
	numberDownloadsWeekly: number;
	infos: { description: string; homepage: string };
}

interface IFavouritesProps {
	favourites: IFavouriteObj[];
}

export const Favourites: NextPage<IFavouritesProps> = ({favourites}) => {
	return <FavouritePage favourites={favourites} />;
};

export default Favourites;
