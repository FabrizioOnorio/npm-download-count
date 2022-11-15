import react, { Dispatch, SetStateAction } from "react";

type Ifavourite = {
	displayNpmName: string;
	numberDownloadsWeekly: number;
	numberDownloadsMonthly: number;
}

interface IFavouriteProps {
	element: Ifavourite;
	setFavourites: Dispatch<SetStateAction<object[]>>;
	favourites: object[];
}

const Favourite = ({
	element,
	setFavourites,
	favourites,
}: IFavouriteProps) => {
	const handleClick = () => {
		setFavourites(
			favourites.filter(
				(favourite: any) => favourite.displayNpmName !== element.displayNpmName
			)
		);
	};

	return (
		<div className="favouriteElement">
			<div className="favouriteFirtLine">
				<p>{element.displayNpmName}:</p>
				<button onClick={handleClick} className="deleteButton">
					Delete
				</button>
			</div>
			<p>Downloads last week:{" " + element.numberDownloadsWeekly}</p>
			<p>Downloads last month:{" " + element.numberDownloadsMonthly}</p>
		</div>
	);
};

export default Favourite;
