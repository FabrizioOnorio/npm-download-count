import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';

interface IWeekColumnsProps {
  downloadsDataWeek: [];
}

const WeekColumns = ({ downloadsDataWeek }:IWeekColumnsProps) => {
  return (
          <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          tickValues={[]}
          tickFormat={[]}
        />
      <VictoryAxis
        dependentAxis
        tickFormat={(x) => (`${x / 1000}k`)} />
      <VictoryBar
        data={downloadsDataWeek}
        x={'day'}
        y={'downloads'}
        />
      </VictoryChart>
  )
}

export default WeekColumns;
