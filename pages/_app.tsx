import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
	const [favourites, setFavourites] = useState<object[]>(() => {
		if (typeof window !== "undefined" && window.localStorage.favorites) {
			const saved: string = localStorage.getItem("favorites") || "";
			const initialValue = JSON.parse(saved);
			return initialValue;
		}
		return [];
	});
	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("favorites", JSON.stringify(favourites));
		}
	}, []);
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
