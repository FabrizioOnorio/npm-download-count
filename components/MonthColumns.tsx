import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";

interface IMonthColumnsProps {
	downloadsData: object[];
}

const MonthColumns = ({ downloadsData }: IMonthColumnsProps) => {
	return (
		<div className="monthlyGraph">
			<VictoryChart
				theme={VictoryTheme.material}
				animate={{
					duration: 2000,
					onLoad: { duration: 500 },
				}}
				width={400}
				height={200}
				style={{
					background: { fill: "white" },
				}}
			>
				<VictoryAxis tickValues={[]} tickFormat={[]} />
				<VictoryAxis
					dependentAxis
					tickFormat={(x) => `${x / 1000}k`}
					offsetX={46}
				/>
				<VictoryBar data={downloadsData} x={"day"} y={"downloads"} />
			</VictoryChart>
		</div>
	);
};

export default MonthColumns;
