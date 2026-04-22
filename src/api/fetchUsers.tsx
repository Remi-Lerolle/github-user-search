import type { fetchUsersProps } from '../Types/fetchUsersProps.tsx';

export	async function fetchUsers( { limitIsReached, inputValue, pageNumber, fetchUsersCallBack }: fetchUsersProps ) {

		/* Don't search for empty input value */
		if ( !inputValue ){ return; }
		
		/* Don't call API if rate limit is reached */
		if ( limitIsReached ){ return; }

		const fetchUrl = new URL( `https://api.github.com/search/users?q=${inputValue}${ pageNumber ? `&page=${pageNumber}` : "" }` );

		try {

			const response = await fetch( fetchUrl );

			if ( !response.ok ){

				throw new Error( `Response.status: ${response.status}` );
	
			}

			const result = await response.json();

			fetchUsersCallBack ( response.headers,  result.items );

		} catch ( error ){

			console.error( error );

		}

	}