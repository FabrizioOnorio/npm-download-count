import React from "react";
import names from "all-the-package-names";

interface IInputSearchProps {
	handleSubmit: (event: React.FormEvent) => Promise<void>;
	packageName: string;
	setPackageName: React.Dispatch<React.SetStateAction<string>>;
}

const InputSearch = ({
	handleSubmit,
	packageName,
	setPackageName,
}: IInputSearchProps) => {
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={packageName}
				onChange={(e) => setPackageName(e.target.value)}
				className="border-2 border-black-900 rounded-md p-2"
			/>
		</form>
	);
};

export default InputSearch;
