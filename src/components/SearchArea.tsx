import React from "react";

interface SearchAreaProps {

	handleChange : ( e: React.ChangeEvent<HTMLInputElement> ) => void;
}

const SearchArea: React.FC<SearchAreaProps> = ( { handleChange } ) => {

	return <div
		className="search-area"
		>

		<input
			type="text"
			className="search-area__input"
			placeholder="type something"
			onChange={ handleChange }
		/>

	</div>
}

export default SearchArea;