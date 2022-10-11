import React from 'react';

interface IInputSearchProps {
  handleSubmit: (event: React.FormEvent) => Promise<void>;
  packageName: string;
  setPackageName: React.Dispatch<React.SetStateAction<string>>;
}

const InputSearch = ({handleSubmit, packageName, setPackageName}: IInputSearchProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={packageName} onChange={e => setPackageName(e.target.value)} required />
    </form>
  )
}

export default InputSearch;
