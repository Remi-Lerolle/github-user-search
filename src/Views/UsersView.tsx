import React, { useEffect } from 'react';

import Header from '../components/Header.tsx';
import SearchArea from '../components/SearchArea.tsx';
import Controls from '../components/Controls.tsx';
import CardContainer from '../components/CardContainer.tsx';

import { fetchUsers } from '../api/fetchUsers.tsx';

import { useRateLimit } from '../hooks/useRateLimit.tsx'
import { useListOfUsersData } from '../hooks/useListOfUsersData.tsx';
import { useListOfSelectedUsers } from '../hooks/useListOfSelectedUsers.tsx';
import { useSearchTerm } from '../hooks/useSearchTerm.tsx';
import type { UserDataType } from '../Types/userDataType.tsx';

function UsersView() {

	const { listOfUsersData, setListOfUsersData } = useListOfUsersData();

	const { listOfSelectedUsers, setListOfSelectedUser, handleSelectUser, handleSelectAllUsers, handleRemoveUsers, handleCopyUser } = useListOfSelectedUsers();

	const { searchTerm, setSearchTerm } = useSearchTerm();

	const { getRateLimitRefReset, handleApiHeaders, limitIsReached } = useRateLimit();


	const fetchUsersCallBack = ( responseHeaders: Headers, resultItems: UserDataType[] ) => {

			handleApiHeaders ( responseHeaders );

			setListOfUsersData( resultItems );

			setListOfSelectedUser( [] );

	}

	/* If the user types faster than 500ms the fetchUser function is not triggered */
	useEffect(

		() => {

			//Set a timer to delay the API call
			const delayBounceId = setTimeout(

				() => {
					if ( typeof searchTerm === "string" ){

						fetchUsers(
							{
								limitIsReached: limitIsReached(),
								inputValue: searchTerm,
								pageNumber: undefined,
								fetchUsersCallBack: fetchUsersCallBack
							}
						);
					}

				},

				500

			);

			// Clean up function to be executed on next searchTerm update
			return () => clearTimeout( delayBounceId );

		},

		[ searchTerm ] // deps array

	)

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