import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
	const [favourites, setFavourites] = useState<object[]>([]);
	return (
		<UserProvider>
			<Component
				{...pageProps}
				setFavourites={setFavourites}
				favourites={favourites}
			/>
		</UserProvider>
	);
}

export default MyApp;
