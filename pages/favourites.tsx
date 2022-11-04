import { NextPage } from "next";
import react from "react";
import FavouritePage from "../components/FavouritePage";

export interface IFavouriteObj {
	downloadsData: object[];
	downloadsDataWeek: object[];
	displayNpmName: string;
	numberDownloadsMonthly: number;
	numberDownloadsWeekly: number;
	infos: { description: string; homepage: string };
  id : string;
}

interface IFavouritesProps {
	favourites: IFavouriteObj[];
}

export const Favourites: NextPage<IFavouritesProps> = ({favourites}) => {
	return <FavouritePage favourites={favourites} />;
};

export default Favourites;
