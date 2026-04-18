
import React, { useEffect, useState } from 'react';

import Header from '../components/Header.tsx';
import SearchArea from '../components/SearchArea.tsx';
import Controls from '../components/Controls.tsx';
import CardContainer from '../components/CardContainer.tsx';
import type { UserDataType } from '../Types/userDataType.tsx';
import type { fetchUsersProps } from '../Types/fetchUserProps.tsx';

function UsersView() {

	const [ searchTerm, setSearchTerm ] = useState("");

	const [ listOfUsersData, setListOfUsersData ] = useState< UserDataType[] | null > ( null );

	/*
			If the user types faster than 500ms the fetchUser function is not triggered 
	*/
	useEffect( () => {

		//Set a timer to delay the API call
		const delayBounceId = setTimeout( 
			
			() => { if ( typeof searchTerm === "string" ){ fetchUsers( { inputValue : searchTerm, pageNumber: undefined} ); }},

			500 

		);

		// Clean up function to be executed on next searchTerm update
		return () => clearTimeout( delayBounceId );

	},

	[ searchTerm ] // deps array
	
	)

	async function fetchUsers( { inputValue, pageNumber}: fetchUsersProps ){

		if ( !inputValue ){ return; }

		const fetchUrl = new URL( `https://api.github.com/search/users?q=${inputValue}${ pageNumber ? `&page=${pageNumber}` : "" }` );

		try {

			const response = await fetch( fetchUrl );

			if ( !response.ok ){

				throw new Error( `Response.status: ${response.status}` );

			}

			const result = await response.json();

			console.log( result );

			if ( response.headers.get( "link" ) ){

				/*
						TO DO:
						Implement pagination
				*/
				console.log( response.headers.get( "link" ) );

			}

			setListOfUsersData( result.items );

		} catch ( error ){

			console.error( error ); 

		}

	}

	const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
	
		console.info( e.target.value );
		setSearchTerm( e.currentTarget.value );

	}

	return <>

			<Header />

			<SearchArea
				handleChange={ handleChange } 
				/>

			<Controls />

			<CardContainer
				listOfUsersData={ listOfUsersData }				
			/>

		</>

}

export default UsersView
