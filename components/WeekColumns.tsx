import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";

interface IWeekColumnsProps {
	downloadsDataWeek: object[];
}

const WeekColumns = ({ downloadsDataWeek }: IWeekColumnsProps) => {
	return (
		<div className="weeklyGraph">
			<VictoryChart
				domainPadding={20}
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
				<VictoryBar data={downloadsDataWeek} x={"day"} y={"downloads"} />
			</VictoryChart>
		</div>
	);
};

export default WeekColumns;
