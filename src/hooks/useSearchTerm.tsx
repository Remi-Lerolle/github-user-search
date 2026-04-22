import { useState } from 'react';

interface useSearchTermReturn {

	searchTerm: String;

	setSearchTerm: ( string: String ) => void

}

export const useSearchTerm = (): useSearchTermReturn => {

	const [ searchTerm, setSearchTerm ] = useState< String > ( "" );

	return { searchTerm, setSearchTerm }

}