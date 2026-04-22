import { useRef } from 'react';

import { RateLimit } from '../classes/RateLimit';

interface apiHeadersHandlerReturn{
	
	getRateLimitRefReset: () => number;

	handleApiHeaders:  ( headers: Headers ) => void;

	limitIsReached: () => boolean;

}

export const apiHeadersHandler = (): apiHeadersHandlerReturn => {

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

	const getRateLimitRef = () => rateLimitRef.current;

	const getRateLimitRefRemaining = () => rateLimitRef.current?.remaining;
	
	const getRateLimitRefReset = () => rateLimitRef.current?.reset;

	const handleApiHeaders = ( headers: Headers ): void => {

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

		/* API has not yet been requested, means no limit */
		if ( !getRateLimitRef() ){
			
			return false; 

		}

		return getRateLimitRefRemaining() === 0 && ( Date.now() / 1000 ) < getRateLimitRefReset();

	}

	return { getRateLimitRefReset, handleApiHeaders, limitIsReached };

}