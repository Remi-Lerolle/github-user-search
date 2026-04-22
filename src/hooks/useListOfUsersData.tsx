import { useState } from 'react';

import type { UserDataType } from '../Types/userDataType.tsx';
import { defaultUserData } from '../Types/userDataType.tsx';

interface useListOfUsersDataReturn{

	listOfUsersData: UserDataType[];

	setListOfUsersData: ( listOfUsersData: UserDataType[] ) => void;

}

export const useListOfUsersData = (): useListOfUsersDataReturn => {

	const [ listOfUsersData, setListOfUsersData ] = useState< UserDataType[] > ( [ { ...defaultUserData } ] );

	return { listOfUsersData, setListOfUsersData }

}