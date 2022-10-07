import React,  { useState } from 'react';

const HomePage = () => {
  const [packageName, setPackageName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(packageName);
    setPackageName('');
  }

  return (
    <>
      <h1>Npm Downloads</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={packageName} onChange={e => setPackageName(e.target.value)} />
      </form>
    </>
  )
}

export default HomePage;
