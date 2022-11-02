import react from 'react';

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

const FavouritePage = ({favourites}: IFavouritesPageProps) => {
  return (
		<div>
			{favourites.map((element) => (
				<p key={element.displayNpmName}>{element.displayNpmName}</p>
			))}
		</div>
	);
}

export default FavouritePage;
