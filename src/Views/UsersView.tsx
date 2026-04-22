import React, { useEffect, useState } from 'react';

import Header from '../components/Header.tsx';
import SearchArea from '../components/SearchArea.tsx';
import Controls from '../components/Controls.tsx';
import CardContainer from '../components/CardContainer.tsx';

import type { fetchUsersProps } from '../Types/fetchUserProps.tsx';

import { useRateLimit } from '../hooks/useRateLimit.tsx'
import { useListOfUsersData } from '../hooks/useListOfUsersData.tsx';
import { useListOfSelectedUsers } from '../hooks/useListOfSelectedUsers.tsx';

function UsersView() {

	const { listOfUsersData, setListOfUsersData } = useListOfUsersData();

	const { listOfSelectedUsers, setListOfSelectedUser, handleSelectUser, handleSelectAllUsers, handleRemoveUsers, handleCopyUser } = useListOfSelectedUsers();

	const [ searchTerm, setSearchTerm ] = useState< String > ( "" );

	const { getRateLimitRefReset, handleApiHeaders, limitIsReached } = useRateLimit();

	/* If the user types faster than 500ms the fetchUser function is not triggered */
	useEffect( () => {

		//Set a timer to delay the API call
		const delayBounceId = setTimeout(
			
			() => { if ( typeof searchTerm === "string" ){ fetchUsers( { inputValue : searchTerm, pageNumber: undefined } ); }},

			500

		);

		// Clean up function to be executed on next searchTerm update
		return () => clearTimeout( delayBounceId );

	},

	[ searchTerm ] // deps array

	)

	async function fetchUsers( { inputValue, pageNumber }: fetchUsersProps ){

		/* Don't search for empty input value */
		if ( !inputValue ){ return; }
		
		/* Don't call API if rate limit is reached */
		if ( limitIsReached() ){ return; }

		const fetchUrl = new URL( `https://api.github.com/search/users?q=${inputValue}${ pageNumber ? `&page=${pageNumber}` : "" }` );

		try {

			const response = await fetch( fetchUrl );

			if ( !response.ok ){

				throw new Error( `Response.status: ${response.status}` );
	
			}

			const result = await response.json();

			handleApiHeaders ( response.headers );

			setListOfUsersData( result.items );

			setListOfSelectedUser( [] );

		} catch ( error ){

			console.error( error );

		}

	}

	const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ):void => {
	
		setSearchTerm( e.currentTarget.value );

	}

	return <>
		
			<Header />

			<SearchArea
				handleChange={ handleChange }
				/>

			<Controls 
				countSelected={ listOfSelectedUsers.length }
				countUsers={ listOfUsersData?.length || 0 }
				handleSelectAllUsers={ () => handleSelectAllUsers( listOfUsersData ) }
				handleRemoveUsers={ () => handleRemoveUsers( listOfUsersData, listOfSelectedUsers, setListOfUsersData ) }
				handleCopyUser={ () => handleCopyUser( listOfUsersData, listOfSelectedUsers, setListOfUsersData ) }
			/>

			<CardContainer
				listOfUsersData={ listOfUsersData }				
				rateLimitReset={ getRateLimitRefReset() || null }
				rateLimitReached={ limitIsReached() || false }
				handleSelectUser={ handleSelectUser }
				listOfSelectedUsers={ listOfSelectedUsers }
			/>

			{ /* TO DO: PAGER */}

		</>

}

export default UsersView