import React,  { useState } from 'react';
import InputSearch from './InputSearch';
import MonthColumns from './MonthColumns';
import WeekColumns from './WeekColumns';

const HomePage = () => {
  const [packageName, setPackageName] = useState('');
  const [downloadsData, setDownloadsData] = useState<object[]>([]);
  const [downloadsDataWeek, setDownloadsDataWeek] = useState<object[]>([]);
  const [displayNpmName, setDisplayNpmName] = useState();
  const [numberDownloadsMonthly, setNumberDownloadsMonthly] = useState();
  const [numberDownloadsWeekly, setNumberDownloadsWeekly] = useState();

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
      const totalMonthlyDownloads = data.downloads.reduce((acc: number, curr: {downloads: number}) => acc + curr.downloads, 0)
      setNumberDownloadsMonthly(totalMonthlyDownloads);
      const totalWeeklyDownloads = lastWeekData.reduce((acc: number, curr: {downloads: number}) => acc + curr.downloads, 0)
      setNumberDownloadsWeekly(totalWeeklyDownloads);
    }
    setPackageName('');
  }


  if (downloadsData && downloadsDataWeek) return (
    <>
      <h1>Npm Downloads</h1>
      <InputSearch
        handleSubmit={handleSubmit}
        packageName={packageName}
        setPackageName={setPackageName}
      />
      <h2>{displayNpmName}</h2>
      <h3>Total number of downloads in the last 30 days:{' ' + numberDownloadsMonthly}</h3>
      <MonthColumns downloadsData={downloadsData} />
      <h3>Total number of downloads in the last 7 days:{' ' + numberDownloadsWeekly}</h3>
      <WeekColumns downloadsDataWeek={downloadsDataWeek} />
    </>
  )
  return <p>loading...</p>
}

export default HomePage;
