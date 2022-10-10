import React,  { useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const HomePage = () => {
  const [packageName, setPackageName] = useState('');
  const [downloadsData, setDownloadsData] = useState();
  const [displayNpmName, setDisplayNpmName] = useState();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(`/api/downloads/${packageName}`)
    const data = await response.json()
    if (data.downloads === undefined) alert('package not found')
    if (data.downloads!== undefined) setDownloadsData(data.downloads);
    if (data.downloads!== undefined) setDisplayNpmName(data.package[0].toUpperCase() + data.package.substr(1));
    setPackageName('');
  }

  return (
    <>
      <h1>Npm Downloads</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={packageName} onChange={e => setPackageName(e.target.value)} required />
      </form>
      <h2>{displayNpmName}</h2>
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
    </>
  )
}

export default HomePage;
