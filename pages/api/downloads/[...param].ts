import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	name?: string;
	error: string;
};

const fetchHandler = async (params: string) => {
	const downloads = await fetch(
		`https://api.npmjs.org/downloads/range/last-month/${params}`
	)
		.then((response) => response.json())
		.then((data) => data)
		.catch((error) => console.log("error ", error.message));
	return downloads;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const params = req.query;
	if (params.param !== undefined) {
		const downloadsData = await fetchHandler(params.param[0]);
    if (downloadsData.error) return res.status(200).json({error: 'not found'});
    res.status(200).json(downloadsData);
	}
};

export default handler;
