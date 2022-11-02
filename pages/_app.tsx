import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [favourites, setFavourites] = useState<object[]>([]);
	return (
		<Component
			{...pageProps}
			setFavourites={setFavourites}
			favourites={favourites}
		/>
	);
}

export default MyApp;
