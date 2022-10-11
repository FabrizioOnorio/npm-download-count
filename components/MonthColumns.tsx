import React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from 'victory';

interface IMonthColumnsProps {
  downloadsData: object[];
}

const MonthColumns = ({ downloadsData }:IMonthColumnsProps) => {
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
        data={downloadsData}
        x={'day'}
        y={'downloads'}
        />
      </VictoryChart>
  )
}

export default MonthColumns;
