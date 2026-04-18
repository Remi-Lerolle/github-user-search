
import React, { useEffect, useState } from 'react';

import Header from '../components/Header.tsx';
import SearchArea from '../components/SearchArea.tsx';
import Controls from '../components/Controls.tsx';
import CardContainer from '../components/CardContainer.tsx';

function App() {

	const [ searchTerm, setSearchTerm ] = useState("");

	/*
			If the user types faster than 500ms the fetchUser function is not triggered 
	*/
	useEffect( () => {

		//Set a timer to delay the API call
		const delayBounceId = setTimeout( 
			
			() => { if ( searchTerm ){ fetchUsers( searchTerm ); }},

			500 

		);

		// Clean up function executed on next call
		return () => clearTimeout( delayBounceId );

	},

	[ searchTerm ]
	
	)

	const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
	
		console.info( e.target.value );
		setSearchTerm( e.currentTarget.value );

	}

	return (
		<>

			<Header />

			<SearchArea
				handleChange={ handleChange } 
				/>

			<Controls />

			<CardContainer />

		</>
	)
}


async function fetchUsers( inputValue ){

	const fetchUrl = new URL( `https://api.github.com/search/users?q=${inputValue}` );

	try {

		const response = await fetch( fetchUrl );

		if ( !response.ok ){

			throw new Error( `Response.status: ${response.status}` );

		}

		const result = await response.json();

		console.log( result );

	} catch ( error ){

		console.error( error ); 

	}

}

export default App
