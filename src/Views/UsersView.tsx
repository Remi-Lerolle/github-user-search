
import React, { useEffect, useState, useRef } from 'react';

import Header from '../components/Header.tsx';
import SearchArea from '../components/SearchArea.tsx';
import Controls from '../components/Controls.tsx';
import CardContainer from '../components/CardContainer.tsx';

import type { UserDataType } from '../Types/userDataType.tsx';
import type { fetchUsersProps } from '../Types/fetchUserProps.tsx';

import { RateLimit } from '../classes/RateLimit.tsx'

function UsersView() {

	const [ searchTerm, setSearchTerm ] = useState< String > ( "" );

	/* 
			If a rateLimitReset has been saved in the browser,
			uses it
			otherwise it will be set at API response
 	*/
	const rateLimitRef = useRef< RateLimit | null > (
		 localStorage.getItem( "rateLimitReset" )
			? new RateLimit( 
					0, 
					0, 
					Number( localStorage.getItem( "rateLimitReset" ) ),
					null
				)
			: null
		)

	const [ listOfUsersData, setListOfUsersData ] = useState< UserDataType[] | null > ( null );

	/* If the user types faster than 500ms the fetchUser function is not triggered */
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

			console.log( "result", result );

			handleApiHeaders ( response.headers );

			setListOfUsersData( result.items );

		} catch ( error ){

			console.error( error ); 

		}

	}

	const handleApiHeaders = ( headers: Headers ): void =>{

		/* 
			Save x-rate-limit in local storage.
			Because if the user reach the limit and reloads the page,
			the browser lose it
		*/
		localStorage.setItem( "rateLimitReset",  headers.get( "x-ratelimit-reset" ) );

		/* Updates the rate limit ref */ 
		rateLimitRef.current = new RateLimit(

				Number ( headers.get( "x-rate-limit" ) ),

				Number ( headers.get( "x-ratelimit-remaining" ) ),

				Number ( headers.get( "x-ratelimit-reset" ) ),

				Number ( headers.get( "x-ratelimit-used" ) )

		);

	}

	const limitIsReached = () => {

		/* API has not yet been requested */
		if ( !rateLimitRef.current ){
			
			return false; 

		}

		return rateLimitRef.current.remaining === 0 && ( Date.now() / 1000 ) < rateLimitRef.current.reset;

	}

	const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ):void => {
	
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
				rateLimitReset={ rateLimitRef.current?.reset || null }
				rateLimitReached={ limitIsReached() || false }
			/>

		</>

}

export default UsersView
