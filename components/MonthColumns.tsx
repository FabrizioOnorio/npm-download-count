import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";

interface IMonthColumnsProps {
	downloadsData: object[];
}

const MonthColumns = ({ downloadsData }: IMonthColumnsProps) => {
	return (
		<VictoryChart
			theme={VictoryTheme.material}
			animate={{
				duration: 2000,
				onLoad: { duration: 1000 },
			}}
			width={400}
			height={200}
			style={{
				background: { fill: "white" },
			}}
		>
			<VictoryAxis tickValues={[]} tickFormat={[]} />
			<VictoryAxis dependentAxis tickFormat={(x) => `${x / 1000}k`} />
			<VictoryBar data={downloadsData} x={"day"} y={"downloads"} />
		</VictoryChart>
	);
};

export default MonthColumns;
