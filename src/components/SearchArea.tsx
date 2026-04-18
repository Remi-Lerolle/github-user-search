import React from "react";

interface SearchAreaProps {

	handleChange : ( e: React.ChangeEvent<HTMLInputElement> ) => void;
}

const SearchArea: React.FC<SearchAreaProps> = ( { handleChange }) => {

	return <input
		type="text"
		placeholder="type something"
		onChange={ handleChange }
	/>

}

export default SearchArea;