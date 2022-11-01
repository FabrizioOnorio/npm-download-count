import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	description: string;
	homepage: string;
};

const fetchHandlerInfos = async (params: string) => {
	const downloads = await fetch(`https://registry.npmjs.org/${params}`)
		.then((response) => response.json())
		.then((data) => data)
		.catch((error) => console.log("error ", error.message));
	return downloads;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const params = req.query;
	if (params.param !== undefined) {
		const dataInformations = await fetchHandlerInfos(params.param[0]);
    if (dataInformations.error === "Not found") return res
			.status(200)
			.json({ description: "Package", homepage: "not found" });
    const description: string = dataInformations.description;
    const homepage: string = dataInformations.homepage;
		res.status(200).json({ description, homepage });
	}
};

export default handler;
