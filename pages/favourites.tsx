import { NextPage } from "next";
import react, { Dispatch, SetStateAction, useEffect } from "react";
import FavouritePage from "../components/FavouritePage";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

export interface IFavouriteObj {
	downloadsData: object[];
	downloadsDataWeek: object[];
	displayNpmName: string;
	numberDownloadsMonthly: number;
	numberDownloadsWeekly: number;
	infos: { description: string; homepage: string };
	id: string;
}

interface IFavouritesProps {
	setFavourites: Dispatch<SetStateAction<object[]>>;
	favourites: IFavouriteObj[];
}

export const Favourites: NextPage<IFavouritesProps> = ({ favourites, setFavourites }) => {
	 const { user, isLoading } = useUser();
		const router = useRouter();

		useEffect(() => {
			if (!(user || isLoading)) {
				router.push("/");
			}
		}, [user, isLoading, router]);

	return (
		<div style={{display: user ? 'block': 'none'}}>
			<FavouritePage favourites={favourites} setFavourites={setFavourites} />
		</div>
	);
};

export default Favourites;
