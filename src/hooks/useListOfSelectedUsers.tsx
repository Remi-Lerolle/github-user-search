import { useState } from 'react';
import type { UserDataType } from '../Types/userDataType';
import { defaultUserData } from '../Types/userDataType';

interface useListOfSelectedUsersReturn {

	listOfSelectedUsers: number[];

	setListOfSelectedUser: ( listOfSelectedUsers: number[] ) => void;

	handleSelectUser: ( e: React.ChangeEvent<HTMLInputElement>, userId: number ) => void;

	handleSelectAllUsers: ( listOfUsersData: UserDataType[] ) => void;

	handleRemoveUsers: ( listOfUsersData: UserDataType[], listOfSelectedUsers: number[], setListOfUsersData: ( listOfUsersData: UserDataType[] ) => void ) => void;

	handleCopyUser: ( listOfUsersData: UserDataType[], listOfSelectedUsers: number[], setListOfUsersData: ( listOfUsersData: UserDataType[] ) => void ) => void;

}

export const useListOfSelectedUsers = (): useListOfSelectedUsersReturn => {

	const [ listOfSelectedUsers, setListOfSelectedUser ] = useState< number[] > ([]);


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

	const handleSelectAllUsers = ( listOfUsersData: UserDataType[] ): void => {

		if ( listOfUsersData && !listOfSelectedUsers.length ) {

				const newListOfSelectedUser = listOfUsersData
					.map( user => user.id );

			setListOfSelectedUser( newListOfSelectedUser );


		} else {

			setListOfSelectedUser( [] );

		}

	}

	const handleRemoveUsers = ( listOfUsersData: UserDataType[], listOfSelectedUsers: number[], setListOfUsersData: ( listOfUsersData: UserDataType[] ) => void ) => {
		
		/* No user or no selection => no action */
		if ( !listOfUsersData || !listOfSelectedUsers.length ){ return; }

		/* Remove every users */
		if ( listOfSelectedUsers.length === listOfUsersData.length ){

			setListOfUsersData( [] );

			setListOfSelectedUser( [] );

		}

		const newListOfUserData = listOfUsersData.reduce<UserDataType[]>(

					( acc: UserDataType[], userData: UserDataType ) => {
					
						if( !listOfSelectedUsers.includes( userData.id ) ){

							return [ ...acc, userData ];

						}

						return acc;

					},

				[]

		);

		/* Remove selected users */
		setListOfUsersData( newListOfUserData || [ {...defaultUserData} ]	);

		setListOfSelectedUser( [] );
	
	}

	const handleCopyUser = ( listOfUsersData: UserDataType[], listOfSelectedUsers: number[], setListOfUsersData: ( listOfUsersData: UserDataType[] ) => void ) => {

		/* No user or no selection => no action */
		if ( !listOfUsersData || !listOfSelectedUsers.length ){ return; }

		/* Copy every users */
		if ( listOfSelectedUsers.length === listOfUsersData.length ){

			setListOfUsersData( [ ...listOfUsersData, ...listOfUsersData ] );

			setListOfSelectedUser( [] );

		}

		/* Copy selected users */
		setListOfUsersData( listOfUsersData
			.reduce<UserDataType[]>(

					( acc: UserDataType[], userData: UserDataType ) => {
					
						if( listOfSelectedUsers.includes( userData.id ) ){

							const currentInAcc = acc.find( userInAcc => userInAcc.id === userData.id );

							/* indexOfCurrentInAcc allows to have the the clone aside of genuine */
							const indexOfCurrentInAcc: number = currentInAcc ? acc.indexOf( currentInAcc ) : 0 ;

														/* Define a new id for the cloned user to avoid conflict on latter selection */
							/* TO DO: check the new id is not alreay assigned  */
							/* self.crypto.randomUUID() would be a better choice for alpha numeric ids */
							acc
								.splice( 
									indexOfCurrentInAcc + 1,
									0, 
									{ ...userData, id: Math.floor(Math.random() * 100000)  }
								);


							return acc;

						}

						return acc;

					},

				structuredClone( listOfUsersData )

			) || [ {...defaultUserData} ]

		);

		setListOfSelectedUser( [] );

	}

	return { listOfSelectedUsers, setListOfSelectedUser, handleSelectUser, handleSelectAllUsers, handleRemoveUsers, handleCopyUser }
}