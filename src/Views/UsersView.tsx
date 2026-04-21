
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

	const [ listOfSelectedUsers, setListOfSelectedUser ] = useState< number[] > ([]);

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

			handleApiHeaders ( response.headers );

			setListOfUsersData( result.items );

			setListOfSelectedUser( [] );

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

	const handleSelectUser = ( e: React.ChangeEvent<HTMLInputElement>, userId: number ): void => {

		const newListOfSelectedUser = [ ...listOfSelectedUsers ];

		if ( e.currentTarget.checked && !newListOfSelectedUser.includes( userId ) ){

			newListOfSelectedUser.push( userId );

		} else {

			const userIndex = newListOfSelectedUser.indexOf( userId );

			if ( userIndex > -1 ){

				newListOfSelectedUser.splice( userIndex, 1 );

			}

		}

		setListOfSelectedUser( newListOfSelectedUser ); 

	}

	const handleSelecAlltUsers = (): void => {

		if ( listOfUsersData && !listOfSelectedUsers.length ) {

				const newListOfSelectedUser = listOfUsersData
					.map( user => user.id );

			setListOfSelectedUser( newListOfSelectedUser ); 


		} else {

			setListOfSelectedUser( [] );

		}

	}

	const handleRemoveUsers = () => {
		
		/* No user or no selection => no action */
		if ( !listOfUsersData || !listOfSelectedUsers.length ){ return; }

		/* Remove every users */
		if ( listOfSelectedUsers.length === listOfUsersData.length ){

			setListOfUsersData( [] );

			setListOfSelectedUser( [] );

		}

		/* Remove selected users */
		setListOfUsersData( listOfUsersData
			.reduce(

					( acc, userData ) => { 
					
						if( !listOfSelectedUsers.includes( userData.id ) ){

							return [ ...acc, userData ];

						}

						return acc;

					},

				[]

			)
		
		)

		setListOfSelectedUser( [] );
	
	}

	const handleCopyUser = () => {

		/* No user or no selection => no action */
		if ( !listOfUsersData || !listOfSelectedUsers.length ){ return; }

		/* Copy every users */
		if ( listOfSelectedUsers.length === listOfUsersData.length ){

			setListOfUsersData( [ ...listOfUsersData, ...listOfUsersData ] );

			setListOfSelectedUser( [] );

		}

		/* Copy selected users */
		setListOfUsersData( listOfUsersData
			.reduce(

					( acc, userData, currIndex ) => { 
					
						if( listOfSelectedUsers.includes( userData.id ) ){

							acc
								.splice( currIndex, 0, { ...userData, id: Math.random()  } );

							/* self.crypto.randomUUID() would be a good choice for alpha numeric ids*/

							return acc;

						}

						return acc;

					},

				structuredClone( listOfUsersData )

			)

		);		

		setListOfSelectedUser( [] );

	} 

	return <>
		
			<Header />

			<SearchArea
				handleChange={ handleChange } 
				/>

			<Controls 
				countSelected={ listOfSelectedUsers.length }
				countUsers={ listOfUsersData?.length || 0 }
				handleSelecAlltUsers={ handleSelecAlltUsers }
				handleRemoveUsers={ handleRemoveUsers }
				handleCopyUser={ handleCopyUser }
			/>

			<CardContainer
				listOfUsersData={ listOfUsersData }				
				rateLimitReset={ rateLimitRef.current?.reset || null }
				rateLimitReached={ limitIsReached() || false }
				handleSelectUser={ handleSelectUser }
				listOfSelectedUsers={ listOfSelectedUsers }
			/>

		</>

}

export default UsersView