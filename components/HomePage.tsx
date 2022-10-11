import React,  { useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import MonthColumns from './MonthColumns';
import WeekColumns from './WeekColumns';

const HomePage = () => {
  const [packageName, setPackageName] = useState('');
  const [downloadsData, setDownloadsData] = useState();
  const [downloadsDataWeek, setDownloadsDataWeek] = useState();
  const [displayNpmName, setDisplayNpmName] = useState();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(`/api/downloads/${packageName}`)
    const data = await response.json()
    if (data.downloads === undefined) alert('package not found')
    if (data.downloads!== undefined) {
      setDownloadsData(data.downloads);
      setDisplayNpmName(data.package[0].toUpperCase() + data.package.substr(1));
      const lastWeekData = data.downloads.slice(data.downloads.length - 7)
      setDownloadsDataWeek(lastWeekData)
    }
    console.log(downloadsData)

    setPackageName('');
  }

  if (downloadsData && downloadsDataWeek) return (
    <>
      <h1>Npm Downloads</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={packageName} onChange={e => setPackageName(e.target.value)} required />
      </form>
      <h2>{displayNpmName}</h2>
      <MonthColumns downloadsData={downloadsData} />
      <WeekColumns downloadsDataWeek={downloadsDataWeek} />
    </>
  )
  return <p>loading...</p>
}

export default HomePage;
