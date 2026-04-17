import React from "react";

interface SearchAreaProps {

	handleKeyUp : ( e: React.KeyboardEvent<HTMLInputElement> ) => void;
}

const SearchArea: React.FC<SearchAreaProps> = ( { handleKeyUp }) => {

	return <input
		type="text"
		placeholder="type something"
		onKeyUp={ handleKeyUp }
	/>

}

export default SearchArea;